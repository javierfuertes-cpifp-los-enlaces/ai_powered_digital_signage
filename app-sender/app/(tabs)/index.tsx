import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Image,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { io } from "socket.io-client";

const SERVER_URL = "http://100.54.20.182:3000";

export default function App() {
  const socketRef = useRef(null);

  const [texto, setTexto] = useState("");
  const [imagen, setImagen] = useState(null);
  const [conectado, setConectado] = useState(false);

  useEffect(() => {
    socketRef.current = io(SERVER_URL, {
      transports: ["polling", "websocket"], // 🔥 IMPORTANTE
    });

    socketRef.current.on("connect", () => {
      console.log("✅ Conectado");
      setConectado(true);
    });

    socketRef.current.on("disconnect", () => {
      console.log("❌ Desconectado");
      setConectado(false);
    });

    return () => socketRef.current.disconnect();
  }, []);

  const seleccionarImagen = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permiso denegado");
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], // ✅ SOLUCIÓN ERROR
      base64: true,
      quality: 0.5,
    });

    if (result.canceled) return;

    const asset = result.assets[0];

    if (!asset.base64) {
      Alert.alert("Error", "No hay base64");
      return;
    }

    console.log("📷 Imagen seleccionada");
    console.log("Base64 length:", asset.base64.length);

    setImagen({
      uri: asset.uri,
      base64: asset.base64,
      mimeType: asset.mimeType || "image/jpeg",
    });
  };

  const enviarTexto = () => {
    if (!texto.trim()) return;

    socketRef.current.emit("mensaje", texto);
    setTexto("");
  };

  const enviarImagen = () => {
    if (!imagen) {
      Alert.alert("Selecciona imagen");
      return;
    }

    console.log("📤 Enviando imagen...");

    socketRef.current.emit("imagen", {
      base64: imagen.base64,
      mimeType: imagen.mimeType,
    });

    setImagen(null);
  };

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 60 }}>
      <Text>Estado: {conectado ? "✅ Conectado" : "❌"}</Text>

      <Text style={{ marginTop: 20 }}>Texto:</Text>
      <TextInput
        value={texto}
        onChangeText={setTexto}
        style={{ borderWidth: 1, padding: 8 }}
      />
      <Button title="Enviar texto" onPress={enviarTexto} />

      <Text style={{ marginTop: 30 }}>Imagen:</Text>
      <Button title="Seleccionar imagen" onPress={seleccionarImagen} />

      {imagen && (
        <>
          <Image
            source={{ uri: imagen.uri }}
            style={{ width: "100%", height: 200, marginTop: 10 }}
          />
          <Button title="Enviar imagen" onPress={enviarImagen} />
        </>
      )}
    </View>
  );
}