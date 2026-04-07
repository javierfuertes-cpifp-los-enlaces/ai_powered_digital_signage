import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { io } from "socket.io-client";

const SERVER_URL = "http://100.54.20.182:3000";

export default function App() {
  const socketRef = useRef(null);

  const [eventos, setEventos] = useState([]);
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
      setConectado(false);
    });

    socketRef.current.onAny((event) => {
      console.log("📡 Evento:", event);
    });

    socketRef.current.on("mensaje", (texto) => {
      setEventos((prev) => [
        ...prev,
        { tipo: "texto", contenido: texto },
      ]);
    });

    socketRef.current.on("imagen", (data) => {
      if (!data?.base64) return;

      const uri = `data:${data.mimeType || "image/jpeg"};base64,${data.base64}`;

      setEventos((prev) => [
        ...prev,
        { tipo: "imagen", contenido: uri },
      ]);
    });

    return () => socketRef.current.disconnect();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 60 }}>
      <Text>Estado: {conectado ? "✅ Conectado" : "❌"}</Text>

      <ScrollView style={{ marginTop: 20 }}>
        {eventos.map((evento, i) => {
          if (evento.tipo === "texto") {
            return (
              <Text key={i} style={{ marginTop: 10 }}>
                💬 {evento.contenido}
              </Text>
            );
          }

          if (evento.tipo === "imagen") {
            return (
              <View key={i} style={{ marginTop: 20 }}>
                <Text>🖼️ Imagen:</Text>
                <Image
                  source={{ uri: evento.contenido }}
                  style={{
                    width: "100%",
                    height: 250,
                    marginTop: 10,
                  }}
                />
              </View>
            );
          }

          return null;
        })}
      </ScrollView>
    </View>
  );
}