import "./global.css";

import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useImageGenerator } from "./hooks/useImageGenerator";

import { PromptForm } from "./components/PromptForm";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ImageResult } from "./components/ImageResult";
import { SuccessMessage } from "./components/SuccessMessage";
import { ErrorMessage } from "./components/ErrorMessage";

export default function App() {
  const {
    prompt,
    imageUrl,
    error,          // 👈 añadir
    estaIdle,
    estaCargando,
    tieneResultado,
    enviado,
    tieneError,     // 👈 añadir
    setPrompt,
    generarImagen,
    enviarATV,
    reiniciar,
  } = useImageGenerator();

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <SafeAreaView
        edges={["top", "bottom"]}
        className="flex-1 bg-slate-50"
      >
        <View className="flex-1 w-full mx-auto md:max-w-2xl lg:max-w-4xl">
          {estaIdle && (
            <PromptForm
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerar={generarImagen}
            />
          )}
          {estaCargando && <LoadingSpinner />}
          {tieneResultado && (
            <ImageResult
              imageUrl={imageUrl}
              prompt={prompt}
              onEnviar={enviarATV}
              onReiniciar={reiniciar}
            />
          )}
          {enviado && (
            <SuccessMessage
              imageUrl={imageUrl}
              onReiniciar={reiniciar}
            />
          )}
          {tieneError && (
            <ErrorMessage
              mensaje={error}
              onReiniciar={reiniciar}
            />
          )}

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}