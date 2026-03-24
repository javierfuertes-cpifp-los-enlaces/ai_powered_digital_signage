import { View, Text, Pressable } from "react-native";

export function ErrorMessage({ mensaje, onReiniciar }) {
  return (
    <View className="flex-1 items-center justify-center px-8 gap-6">
      <Text className="text-4xl">⚠️</Text>
      <Text className="text-red-600 text-center text-base">{mensaje}</Text>
      <Pressable
        onPress={onReiniciar}
        className="bg-slate-800 px-6 py-3 rounded-xl"
      >
        <Text className="text-white font-semibold">Volver a intentarlo</Text>
      </Pressable>
    </View>
  );
}