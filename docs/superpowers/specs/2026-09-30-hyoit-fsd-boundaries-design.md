# 효잇 FSD 경계 정렬 설계

## 목적

효잇의 기존 role별 FSD 구조(`entry`, `parent`, `child`, `shared`)를 유지하면서,
Washer-Client-v2에서 확인한 공개 진입점과 의존 방향을 적용한다. 목표는 폴더를
전면 재구성하는 것이 아니라, 라우트·페이지·기능·도메인 사이의 책임과 참조
경계를 명확하게 만들어 이후 API 기능을 추가해도 구조가 다시 뒤섞이지 않도록
하는 것이다.

## 범위와 비범위

### 포함

- Expo Router route 파일은 각 page의 public entry(`index.ts`/`index.tsx`)만 참조한다.
- entity는 `index.ts`를 public API로 제공하고, 외부 계층은 entity 내부 파일을 직접 참조하지 않는다.
- feature가 page UI를 참조하는 역방향 의존을 제거한다.
- 현재 실제 위반이 확인된 memory game 영역을 feature와 page composition의 책임에 맞게 정렬한다.
- 같은 규칙의 재발을 잡는 구조 검증 테스트와 모바일 FSD 경계 문서를 추가한다.

### 제외

- `entry`, `parent`, `child`, `shared` 최상위 구조의 전면 교체
- 기존 화면의 UI·동작 변경
- 실제 백엔드 endpoint 연결
- TanStack Query Provider, query key, staleTime, mutation invalidation 도입
- `packages/api`의 transport 책임 변경
- mock auth API를 실제 API로 교체

## 목표 구조와 의존 방향

```text
Expo Router app route
        ↓
role/page public entry
        ↓
widgets / page composition
        ↓
features (사용자 시나리오·행동)
        ↓
entities (도메인 모델·상태·공개 API)
        ↓
shared (공통 UI·유틸·테마·인프라)
```

- `app/`는 route wiring과 navigation 설정만 담당한다.
- `pages/`는 한 화면의 조합과 화면 진입 public entry를 담당한다.
- `widgets/`는 여러 entity/feature를 조합하는 재사용 가능한 화면 단위다.
- `features/`는 사용자의 목적이 있는 행동과 그 상태를 담당한다.
- `entities/`는 특정 도메인의 모델·상태·UI와 이후 domain API/query hook이 들어갈 경계다.
- `shared/`는 특정 role이나 도메인에 종속되지 않는 공통 코드만 둔다.
- 하위 계층이 상위 계층(`feature → page`, `entity → feature/page`)을 참조하지 않는다.

현재 role별 namespace는 유지한다. 따라서 parent 전용 코드는 `src/parent`에,
child 전용 코드는 `src/child`에, 양쪽이 공유하는 check-in/onboarding은
`src/shared`에 둔다.

## 변경 설계

### 1. Route와 page public boundary

라우트는 `@/src/<role>/pages/<page>`까지만 import한다. page 내부 `ui` 파일을
라우트에서 직접 import하지 않도록 page barrel export를 보완한다. 이로써 화면
구현을 page 내부에서 이동하거나 분리해도 Expo Router route는 영향받지 않는다.

### 2. Entity public boundary

memory game entity에 public `index.ts`를 추가하고, feature/page에서
`lib/*`, `model/*`를 직접 참조하는 대신 entity root를 사용한다. public export에는
화면과 feature가 실제로 사용하는 타입·상수·순수 함수·hook만 포함하며, 내부
구현 파일 경로는 소비자에게 노출하지 않는다.

### 3. Memory session 계층 정렬

memory session feature가 사용하는 `MemoryBoard`, `BottomTray`, `PlayHeader`,
`ResultOverlay`는 session 상태와 직접 결합된 feature UI이므로
`features/game/memory/play-session/ui`로 이동한다. `IntroScreen`, `PlayScreen`,
`DifficultyCard`, `GameEntryCard`처럼 page 진입과 화면 조합을 담당하는 코드는
page 쪽에 남긴다. 결과적으로 `PlayContainer`는 같은 feature 내부 UI와 entity만
사용하고 page를 역참조하지 않는다.

### 4. 구조 검증

모바일 소스에 대해 다음 경계를 자동 검증한다.

- memory session feature가 `pages`를 import하지 않는다.
- 외부 소비자가 memory-game entity 내부 경로를 직접 import하지 않는다.
- Expo Router route가 page 내부 `ui` 파일을 직접 import하지 않는다.

검증은 기존 앱 동작 테스트와 별도의 Node 테스트로 실행 가능해야 하며,
구조 위반이 생기면 실패 메시지에 위반 파일과 규칙을 표시한다.

## 데이터 흐름과 향후 API 확장

이번 변경에서는 데이터 흐름을 구현하지 않는다. 이후 실제 도메인 API를 추가할 때
각 entity 안에 `api/<operation>.ts`와 query/mutation hook을 두고, 페이지나 feature가
HTTP client를 직접 호출하지 않도록 한다. 공통 HTTP transport는 `@hyoit/api`에
남기고, domain URL·응답 변환·query key·invalidation은 해당 entity 경계에서
관리한다. 이 설계는 Washer의 패턴을 참고하되, Washer에서 확인된 shared query key의
entity 타입 역참조와 UI 내부 직접 query 호출은 복사하지 않는다.

## 검증 기준

- 기존 check-in, D-day 테스트가 통과한다.
- 새 FSD boundary 테스트가 통과한다.
- 모바일 TypeScript 검사와 변경 영역 lint가 통과한다.
- `git diff --check`가 통과한다.
- 화면 동작과 기존 package API에는 변경이 없다.

