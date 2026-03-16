import { View, Text, TouchableOpacity, Image } from "react-native";

export function SuccessMessage({ imageUrl, onReiniciar }) {
  return (
    <View className="flex-1 justify-center items-center px-6 sm:px-12">

      {imageUrl && (
        <View className="w-28 h-28 sm:w-40 sm:h-40 rounded-2xl overflow-hidden
                         mb-6 border-4 border-emerald-200">
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      )}

      <View className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100
                       justify-center items-center mb-6">
        <Text className="text-3xl sm:text-4xl">✅</Text>
      </View>

      <Text className="text-2xl sm:text-3xl font-bold text-slate-800
                       text-center mb-3">
        ¡Imagen enviada!
      </Text>

      <Text className="text-sm sm:text-base text-slate-500 text-center
                       mb-10 leading-6 max-w-xs sm:max-w-sm">
        Tu imagen ya se está mostrando{"\n"}
        en la pantalla del hall del centro.
      </Text>

      <TouchableOpacity
        className="bg-sky-500 rounded-2xl py-4 sm:py-5 px-10 sm:px-14 items-center"
        onPress={onReiniciar}
        activeOpacity={0.8}
      >
        <Text className="text-white font-bold text-base sm:text-lg">
          ✨ Crear otra imagen
        </Text>
      </TouchableOpacity>
    </View>
  );
}