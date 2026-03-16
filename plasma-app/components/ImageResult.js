import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

export function ImageResult({ imageUrl, prompt, onEnviar, onReiniciar }) {
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 px-6 pt-8 pb-10 sm:px-10 sm:pt-10">
        <Text className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">
          Imagen generada
        </Text>
        <Text className="text-sm sm:text-base text-slate-500 mb-6 sm:mb-8">
          ¿Te gusta el resultado?
        </Text>
        <View className="flex-col md:flex-row md:gap-8 lg:gap-12">
          <View className="w-full md:flex-1">
            <View className="rounded-3xl overflow-hidden border border-slate-100">
              <Image
                source={{ uri: imageUrl }}
                className="w-full"
                style={{ aspectRatio: 1 }}
                resizeMode="cover"
              />
            </View>
          </View>

          <View className="w-full md:flex-1 mt-6 md:mt-0 md:justify-center">
            <View className="bg-slate-50 rounded-2xl p-4 sm:p-5 mb-6
                             border border-slate-100">
              <Text className="text-xs sm:text-sm font-semibold text-slate-400
                               uppercase tracking-wider mb-2">
                Prompt utilizado
              </Text>
              <Text className="text-sm sm:text-base text-slate-600 leading-6">
                {prompt}
              </Text>
            </View>

            <TouchableOpacity
              className="bg-emerald-500 rounded-2xl py-4 sm:py-5 items-center mb-3"
              onPress={onEnviar}
              activeOpacity={0.8}
            >
              <Text className="text-white font-bold text-base sm:text-lg">
                📺 Enviar a la pantalla del hall
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-slate-100 rounded-2xl py-4 sm:py-5 items-center"
              onPress={onReiniciar}
              activeOpacity={0.8}
            >
              <Text className="text-slate-600 font-semibold text-base sm:text-lg">
                🔄 Volver a intentar
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </ScrollView>
  );
}