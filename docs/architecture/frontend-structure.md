# Mobile Frontend Structure

효잇 모바일은 기존 role별 FSD 경계를 유지한다. 폴더를 기능 단위로 무작정
합치지 않고, 화면이 어느 사용자 영역에 속하는지와 해당 코드의 책임을 함께
기준으로 삼는다.

## Top-level map

```text
apps/mobile/app/       Expo Router route wiring only
apps/mobile/src/entry/ 로그인·역할 선택 영역
apps/mobile/src/parent 부모 전용 화면·기능·도메인
apps/mobile/src/child/ 자녀 전용 화면·기능·도메인
apps/mobile/src/shared 양쪽 role이 함께 쓰는 도메인·기능·UI·유틸
packages/api/          공통 HTTP transport와 오류 정규화
packages/auth/         인증 도메인 API와 auth 상태
```

각 role 영역은 필요한 경우 다음 FSD 계층을 사용한다.

```text
pages → widgets → features → entities → shared
```

하위 계층은 상위 계층을 import하지 않는다. 예를 들어 feature는 page를
참조하지 않고, entity는 feature나 page를 참조하지 않는다. role 간에 공유되는
코드는 해당 role 폴더가 아니라 `src/shared`에 둔다.

## Public entry rules

- Expo Router 파일은 `@/src/<role>/pages/<page>` public entry만 import한다.
- page 내부 화면을 이동하거나 쪼개더라도 route 파일은 page barrel 뒤에 남는다.
- entity 외부 소비자는 `@/src/<role>/entities/<domain>`만 import한다.
- `entities/<domain>/lib/*`, `model/*` 같은 내부 경로는 entity 내부에서만 사용한다.
- feature가 사용하는 화면 UI는 해당 feature의 `ui` 아래에 둔다. page UI가
  feature를 역으로 구성하지 않도록 한다.

예를 들어 memory game의 보드·트레이·플레이 헤더·결과 오버레이는
`features/game/memory/play-session/ui`에 있고, `memory-game` entity는
카드 모델·과일 리소스·게임 상태 hook을 public entry로 제공한다.

## API 확장 위치

현재 `packages/api`는 Axios client, token 주입, HTTP 오류 정규화만 담당한다.
실제 도메인 API를 연결할 때는 해당 entity에 다음 경계를 추가한다.

```text
entities/<domain>/api/<operation>.ts   HTTP client 호출·응답 변환
entities/<domain>/api/use<Operation>.ts TanStack Query hook
entities/<domain>/model/queryKeys.ts   domain query key
```

페이지나 feature에서 HTTP client를 직접 호출하지 않는다. URL, 응답 타입 변환,
query key, stale time, mutation invalidation은 도메인 경계에서 관리하고,
transport 설정은 `packages/api`에 남긴다. 실제 query 흐름은 endpoint가 확정된
기능 작업에서 도입한다.

## Guard

구조 규칙은 다음 명령으로 검사한다.

```bash
corepack pnpm --filter hyoit-rn test:architecture
```

이 검사는 route의 page public entry 사용, feature의 page 역참조 금지,
memory-game entity 외부 deep import 금지를 확인한다.
