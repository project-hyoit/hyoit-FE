# Common HTTP API Layer Design

## 목적

백엔드 API를 실제로 연결하기 전에 모바일 프론트엔드에서 사용할 공통 HTTP 통신 기반을 만든다. 이번 작업은 `hyoit-rn`만 수정하며, 백엔드 저장소는 참고용으로만 읽는다.

## 범위

포함하는 작업:

- `@hyoit/api` 워크스페이스 패키지 추가
- Axios 인스턴스 생성과 환경변수 기반 base URL 설정
- 저장된 access token의 공통 Authorization 헤더 주입
- HTTP, timeout, 네트워크, 기타 오류의 공통 `ApiError` 변환
- 공통 계층의 단위 테스트와 모바일 프로젝트 연결 설정
- 기존 mock API 유지

포함하지 않는 작업:

- 백엔드 저장소의 파일, API 계약, 예외 처리 수정
- 현재 `packages/auth/api/*` mock endpoint의 실제 endpoint 교체
- access token refresh, 401 자동 로그아웃, 네비게이션 처리
- React Query 기본 설정 변경

## 구조

`packages/api`를 공통 패키지로 두어 `packages/auth`와 향후 다른 도메인 API가 동일한 HTTP 계층을 사용할 수 있게 한다. 앱 전용 코드에 공통 클라이언트를 두면 workspace 패키지가 앱을 역참조해야 하므로 현재 의존 방향과 맞지 않는다.

예상 구성:

- `packages/api/package.json`: `@hyoit/api` 패키지와 Axios 의존성
- `packages/api/http/apiError.ts`: 공통 오류 타입과 Axios 오류 변환
- `packages/api/http/createHttpClient.ts`: 테스트 가능한 Axios 클라이언트 factory
- `packages/api/apiClient.ts`: storage를 연결한 앱용 singleton
- `packages/api/index.ts`: public export

`apps/mobile`과 루트 TypeScript path 설정에는 `@hyoit/api` alias를 추가한다. 현재 Axios가 `apps/mobile`에 직접 선언되어 있으므로 공통 패키지가 소유하도록 이동하며, 실제 사용처가 생길 때 domain package가 `@hyoit/api`를 의존하도록 확장한다.

## 요청 흐름

1. domain API가 `apiClient.get/post/...`를 호출한다.
2. request interceptor가 `@hyoit/storage`에서 access token을 읽는다.
3. token이 있으면 기존 Authorization 헤더를 덮어쓰지 않고 `Bearer <token>`을 설정한다.
4. 성공 응답은 Axios 응답 그대로 전달한다. 응답 envelope의 `data` 자동 unwrap은 domain API가 백엔드 계약을 확인한 뒤 결정한다.
5. 실패 응답은 response interceptor에서 `ApiError`로 변환해 호출부에 전달한다.

## 환경 설정

base URL은 `EXPO_PUBLIC_API_BASE_URL`에서 읽는다. production URL을 소스에 하드코딩하지 않으며, 값이 없는 경우 Axios가 상대 URL을 임의로 보정하지 않도록 설정값을 그대로 사용한다. timeout은 공통 기본값을 두되 factory option으로 테스트와 향후 앱 환경별 조정이 가능하게 한다.

## 오류 정책

`ApiError`는 다음 정보를 제공한다.

- `kind`: `HTTP`, `TIMEOUT`, `NETWORK`, `UNKNOWN`
- `status`: HTTP status가 있으면 보존
- `code`: 백엔드 payload의 numeric code 또는 Axios error code
- `message`: 백엔드 `message` 우선, 없으면 Axios/기본 메시지
- `data`: 백엔드 오류 payload의 data 또는 원본 response data
- `cause`: 원본 오류

HTTP 오류 payload가 기존 `ApiResponse<T>` 형태를 따르지 않아도 오류를 잃지 않고 변환한다. response가 없는 Axios 오류는 timeout과 network를 구분하고, Axios 오류가 아닌 값은 `UNKNOWN`으로 보존한다. 401은 특별한 side effect 없이 `HTTP` 오류로 전달한다.

## 테스트 기준

실제 public interface 기준으로 다음 동작을 검증한다.

- token provider가 반환한 token이 Authorization header에 주입된다.
- token이 없거나 기존 Authorization header가 있으면 의도하지 않은 덮어쓰기가 없다.
- HTTP 오류에서 status, backend code, message, data가 보존된다.
- timeout과 응답 없는 network 오류가 서로 다른 kind로 변환된다.
- Axios 오류가 아닌 오류는 `UNKNOWN`으로 변환된다.
- 기존 mock API와 기존 테스트는 공통 계층 추가로 영향을 받지 않는다.

## 작업 및 커밋 경계

작업 브랜치는 최신 `origin/develop`에서 생성한 `feat/common-http-api`다. 커밋은 서로 독립적으로 검토할 수 있도록 다음 순서로 나눈다.

1. 설계 문서 추가
2. `@hyoit/api` 패키지 및 workspace/path 설정
3. `ApiError` 변환 로직
4. Axios client와 token interceptor
5. 공통 HTTP 테스트
6. 전체 검증 및 필요한 설정 정리

각 구현 커밋은 해당 커밋의 테스트와 함께 검증하며, mock API 변경은 포함하지 않는다.
