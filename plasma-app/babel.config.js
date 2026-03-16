module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // Le decimos a Babel que use NativeWind para procesar las clases de Tailwind
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
