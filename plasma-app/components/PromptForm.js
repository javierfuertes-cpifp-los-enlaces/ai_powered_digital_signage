import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";

export function PromptForm({ prompt, setPrompt, onGenerar }) {

  const botonDesactivado = prompt.trim().length === 0;

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 justify-center px-6 py-10 sm:px-10 md:py-16">

        <View className="mb-8 md:mb-10">
          <Text className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
            Generador IA
          </Text>
          <Text className="text-base sm:text-lg text-slate-500">
            Describe la imagen que quieres crear
          </Text>
        </View>

        <View className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100
                         shadow-sm">
          <Text className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">
            Tu descripción
          </Text>

          <TextInput
            className="bg-slate-50 rounded-2xl p-4 text-slate-800 text-base
                       sm:text-lg border border-slate-200
                       min-h-28 sm:min-h-36 md:min-h-44"
            placeholder="Ej: Un cartel moderno para anunciar el curso de Inteligencia Artificial del CPIFP Los Enlaces, con colores azules y tecnología"
            placeholderTextColor="#94a3b8"
            value={prompt}
            onChangeText={setPrompt}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            maxLength={400}
          />

          <Text className="text-xs sm:text-sm text-slate-400 text-right mt-2">
            {prompt.length} / 400
          </Text>

          <TouchableOpacity
            className={`mt-5 rounded-2xl py-4 sm:py-5 items-center ${
              botonDesactivado ? "bg-slate-200" : "bg-sky-500"
            }`}
            onPress={onGenerar}
            disabled={botonDesactivado}
            activeOpacity={0.8}
          >
            <Text
              className={`text-base sm:text-lg font-bold ${
                botonDesactivado ? "text-slate-400" : "text-white"
              }`}
            >
              ✨ Generar imagen
            </Text>
          </TouchableOpacity>

        </View>

        <Text className="text-center text-slate-400 text-xs sm:text-sm mt-6 px-4 leading-5">
          La imagen se genera con Inteligencia Artificial.{"\n"}
          Puede tardar entre 10 y 30 segundos.
        </Text>

      </View>
    </ScrollView>
  );
}