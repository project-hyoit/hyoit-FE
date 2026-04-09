# Hyoit

효잇은 부모님과 자녀가 함께 사용할 수 있도록 개발된 맞춤형 케어 지원 애플리케이션입니다. Expo SDK 54와 React 19를 기반으로 구축되었으며, 현대적인 앱 개발 기술 스택을 사용합니다.

## 기술 스택

### 프레임워크 & 라이브러리

- **Expo SDK 54** - 최신 기능이 포함된 React Native 프레임워크
- **React 19** - 최신 렌더링 엔진을 탑재한 UI 라이브러리
- **TypeScript** - 코드 안정성을 위한 정적 타입 시스템

### 상태 관리 & 데이터 페칭

- **TanStack Query v5** - 서버 상태 관리, 캐싱 및 비동기 데이터 동기화
- **Zustand** - 직관적이고 가벼운 클라이언트 측 전역 상태 관리
- **Axios** - REST API 통신을 위한 프로미스 기반 HTTP 클라이언트
- **Async Storage** - 모바일 환경을 위한 로컬 데이터 영속성 저장소
	
### UI 컴포넌트

- **Expo Vector Icons** - 다양한 아이콘 세트를 제공하는 통합 아이콘 라이브러리
- **Expo Image** - 고성능 이미지 캐싱 및 렌더링 컴포넌트
- **React Native Reanimated** - 복잡하고 부드러운 인터랙션을 위한 고성능 애니메이션 엔진
- **React Native Gesture Handler** - 네이티브 성능의 터치 및 제스처 인식 라이브러리

### 개발 도구

- **ESLint & Expo Lint** - 코드 품질 유지 및 Expo 권장 규칙 준수를 위한 린팅 도구
- **TypeScript** - 안정적인 개발을 위한 정적 타입 시스템 및 가이드
- **Axios** - REST API 통신을 위한 프로미스 기반 HTTP 클라이언트
- **React Native WebView** - 앱 내 웹 콘텐츠 렌더링을 위한 네이티브 뷰 컴포넌트

## 프로젝트 구조

```
hyoit-rn/
├── app/                    # Next.js App Router
│   ├── _layout.tsx         # 루트 레이아웃
├── assets/  		 # 이미지 설정
├── docs/  		# 게임 문서
├── entities/              # 경로를 통해 들어가는 페이지
├── features/  		# 로그인 및 게임
├── hooks/  		# 다크모드 및 화이트 모드
├── pages/		# 페이지 설정
├── scripts/  		# 최신 설정
├── shared/                # 공유 모듈
└── widgets/               # 복합 UI 위젯
```

## 시작하기

### 필수 요구사항

- Node.js 18.17 이상
- npm

### 설치 및 실행

1. **의존성 설치**

   ```bash
   npx istall
   ```

2. **개발 서버 실행**

   ```bash
   npx expo start
   ```

3. **브라우저에서 확인**
   [http://localhost:8081](http://localhost:8081)에서 애플리케이션을 확인할 수 있습니다.

## 📜 사용 가능한 스크립트

```bash
# 프로덕션 서버 실행
npm start

# 코드 린팅
npm run lint
```

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.