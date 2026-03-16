// components/LoadingSpinner.js
// ─────────────────────────────────────────────────────────────────────────────
// Pantalla de espera que se muestra mientras la IA genera la imagen.
//
// Responsive:
//   móvil → icono y textos compactos
//   sm+   → icono más grande, textos más grandes
// ─────────────────────────────────────────────────────────────────────────────

import { View, Text, ActivityIndicator } from "react-native";

export function LoadingSpinner() {
  return (
    <View className="flex-1 justify-center items-center px-6 sm:px-10">
      <ActivityIndicator size="large" color="#0ea5e9" />
      <Text className="text-xl sm:text-2xl font-bold text-slate-700 mt-8 text-center">
        Generando tu imagen...
      </Text>

      <Text className="text-sm sm:text-base text-slate-400 mt-3 text-center
                       max-w-xs sm:max-w-sm leading-6">
        La Inteligencia Artificial está trabajando.{"\n"}
        Esto puede tardar unos segundos.
      </Text>
    </View>
  );
}