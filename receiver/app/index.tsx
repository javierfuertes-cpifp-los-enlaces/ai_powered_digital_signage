import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

// ─── Servidor AWS Elastic Beanstalk ──────────────────────────────────────────
const SERVER_URL = "ws://ws-server-app-env.eba-9mkxvap7.us-east-1.elasticbeanstalk.com";

// ─── Tipos de evento recibido ─────────────────────────────────────────────────
type Evento =
  | { tipo: "texto";  contenido: string }
  | { tipo: "imagen"; contenido: string };   // data URI base64

export default function App() {
  const wsRef    = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [eventos,   setEventos]   = useState<Evento[]>([]);
  const [conectado, setConectado] = useState(false);

  // ── Gestión de conexión ────────────────────────────────────────────────────
  const connect = () => {
    // Evitar conexiones duplicadas
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(SERVER_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ Conectado a", SERVER_URL);
      setConectado(true);
      // Cancelar cualquier reintento pendiente
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
        reconnectTimer.current = null;
      }
    };

    ws.onmessage = (event: MessageEvent) => {
      const raw = event.data;

      // ── Intentar parsear como JSON (payload de imagen) ────────────────────
      try {
        const parsed = JSON.parse(raw);

        if (parsed?.tipo === "imagen" && parsed?.base64) {
          const mime = parsed.mimeType || "image/jpeg";
          const uri  = `data:${mime};base64,${parsed.base64}`;
          setEventos((prev) => [...prev, { tipo: "imagen", contenido: uri }]);
          return;
        }
      } catch {
        // No es JSON: tratar como texto plano
      }

      // ── Mensaje de texto plano ────────────────────────────────────────────
      setEventos((prev) => [...prev, { tipo: "texto", contenido: String(raw) }]);
    };

    ws.onerror = (err) => {
      console.error("❌ Error WebSocket:", err);
    };

    ws.onclose = () => {
      console.log("🔌 Desconectado — reintentando en 3 s…");
      setConectado(false);
      wsRef.current = null;
      // Reconexión automática
      reconnectTimer.current = setTimeout(connect, 3000);
    };
  };

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      wsRef.current?.close();
    };
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      {/* Cabecera de estado */}
      <View style={[styles.statusBar, conectado ? styles.statusOk : styles.statusErr]}>
        <Text style={styles.statusText}>
          {conectado ? "✅ Conectado" : "❌ Sin conexión — reintentando…"}
        </Text>
      </View>

      {/* Lista de eventos recibidos */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {eventos.length === 0 && (
          <Text style={styles.empty}>
            Esperando mensajes del servidor…
          </Text>
        )}

        {eventos.map((evento, i) => {
          if (evento.tipo === "texto") {
            return (
              <View key={i} style={styles.card}>
                <Text style={styles.cardLabel}>💬 Mensaje</Text>
                <Text style={styles.cardText}>{evento.contenido}</Text>
              </View>
            );
          }

          if (evento.tipo === "imagen") {
            return (
              <View key={i} style={styles.card}>
                <Text style={styles.cardLabel}>🖼️ Imagen</Text>
                <Image
                  source={{ uri: evento.contenido }}
                  style={styles.image}
                  resizeMode="contain"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },

  // ── Barra de estado ────────────────────────────────────────────────────────
  statusBar: {
    paddingTop: 60,
    paddingBottom: 14,
    paddingHorizontal: 20,
  },
  statusOk:  { backgroundColor: "#EAF7F2" },
  statusErr: { backgroundColor: "#FDF0F0" },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#16151F",
  },

  // ── Lista ──────────────────────────────────────────────────────────────────
  scroll: { flex: 1 },
  scrollContent: {
    padding: 16,
    gap: 12,
  },

  empty: {
    textAlign: "center",
    color: "#AEACC2",
    fontSize: 14,
    marginTop: 40,
  },

  // ── Tarjeta de evento ──────────────────────────────────────────────────────
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E4E4EF",
    gap: 8,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: "#6B6880",
  },
  cardText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#16151F",
    fontFamily: "monospace",
  },

  // ── Imagen ─────────────────────────────────────────────────────────────────
  image: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    backgroundColor: "#EFEFF6",
  },
});