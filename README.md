# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Folder Structure

This is the folder structure of Hyoit.

```
hyoit
├─ .vscode			# 자동으로 수정, 설정해주는 코드
├─ app			# 홈 화면 및 앱 기능 설명
├─ assets			# 이미지
├─ components		# 웹 -> 앱
├─ constants		# 라이트 모드 다크 모드
├─ hooks			# 라이트 모드 다크 모드
├─ node_modules	# API
├─ scripts			# 프로젝트 초기화 및 삭제
hyoit-rn
├─ .expo			# 자동으로 타입으로 생성해 라우팅할 때 타입 오류를 방지하도록 하는 TypeScript 라우트 타입 정의 파일
├─ .vscode			# 파일 저장시 자동으로 코드 정리 해줌 
├─ app			# 메인 탭으로 이동, 로그인, 인증번호
├─ assets			# 글씨체 및 사진
├─ docs			# 수정 사항 및 기능 설명
├─ entities			# 로그인 여부 확인 및 그 와 관련된 데이터 관리 + 게임 + 사용자 + 날씨
├─ features		# 채팅 기능
├─ hooks			# 라이트 모드 다크 모드
├─ node_modules	# API
├─ pages			# 채팅 + 게임 + 메인 + 로그인 + 프로필
├─ scripts			# 프로젝트 초기화 및 삭제
├─ shared			# 게임, 쿼리클라이언트 설정
├─ widgets		# 아래 바 + 채팅 + 게임 + 홈화면
```
