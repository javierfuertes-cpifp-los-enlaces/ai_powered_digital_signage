import { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const WS_URL = "ws://ws-server-app-env.eba-9mkxvap7.us-east-1.elasticbeanstalk.com";

// ─── Construir URI de imagen multiplataforma ───────────────────────────────
const base64ToUri = (base64) => {
  // Tanto en web como en móvil, el tag data URI funciona correctamente
  return `data:image/jpeg;base64,${base64}`;
};

export default function App() {
  const [mensajes, setMensajes] = useState([]);
  const [estado, setEstado] = useState('Conectando...');
  const ws = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);
    ws.current.onopen = () => setEstado('Conectado ✅');
    ws.current.onerror = () => setEstado('Error de conexión ❌');
    ws.current.onclose = () => setEstado('Desconectado');

    ws.current.onmessage = (event) => {
      try {
        const paquete = JSON.parse(event.data);
        if (paquete.tipo === 'mensaje') {
          setMensajes((prev) => [
            ...prev,
            { id: Date.now(), texto: paquete.texto, imagen: paquete.imagen },
          ]);
          // Scroll al fondo al recibir nuevo mensaje
          setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
        }
      } catch (e) {
        console.error('Error al parsear mensaje:', e);
      }
    };

    return () => ws.current.close();
  }, []);

  return (
    <ScrollView
      ref={scrollRef}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text>Estado: {estado}</Text>
      <Text style={{ fontSize: 18, marginVertical: 10 }}>Mensajes recibidos:</Text>

      {mensajes.length === 0 && (
        <Text style={{ color: 'gray' }}>Aún no hay mensajes...</Text>
      )}

      {mensajes.map((msg) => (
        <View key={msg.id} style={{ marginBottom: 20, borderWidth: 1, padding: 10 }}>
          {msg.texto ? <Text style={{ fontSize: 16 }}>{msg.texto}</Text> : null}
          {msg.imagen ? (
            <Image
              source={{ uri: base64ToUri(msg.imagen) }}
              style={{ width: 250, height: 250, marginTop: 8 }}
              resizeMode="contain"
            />
          ) : null}
        </View>
      ))}
    </ScrollView>
  );
}