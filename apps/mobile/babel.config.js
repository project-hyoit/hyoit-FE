module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": ".",
            "@hyoit/auth": "../../packages/auth",
            "@hyoit/storage": "../../packages/storage",
            "@hyoit/types": "../../packages/types",
            "@hyoit/ui": "../../packages/ui",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
