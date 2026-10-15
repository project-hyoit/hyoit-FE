const baseConfig = require("./app.json");

module.exports = () => {
  const kakaoAppKey = process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY;
  const plugins = [
    ...baseConfig.expo.plugins,
    [
      "expo-build-properties",
      {
        android: {
          extraMavenRepos: [
            "https://devrepo.kakao.com/nexus/content/groups/public/",
          ],
        },
      },
    ],
  ];

  if (kakaoAppKey) {
    plugins.push([
      "@react-native-seoul/kakao-login",
      { kakaoAppKey },
    ]);
  }

  return {
    ...baseConfig.expo,
    plugins,
  };
};
