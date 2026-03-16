// metro.config.js — configuración del bundler de React Native
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Conectamos NativeWind con el bundler y le decimos dónde está nuestro CSS
module.exports = withNativeWind(config, { input: "./global.css" });
