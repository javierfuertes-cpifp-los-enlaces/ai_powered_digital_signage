// ════════════════════════════════════════════════════════════════════════════
// useSendMessage.js
//
// Responsabilidad: gestionar el estado del formulario, validar los campos,
// mantener la conexión WebSocket viva (con reconexión automática) y enviar
// el mensaje construido por el builder.
// ════════════════════════════════════════════════════════════════════════════

import { useCallback, useEffect, useRef, useState } from "react";
import { buildPlantillaMessage } from "./plantillaBuilder";

// ─── Configuración ───────────────────────────────────────────────────────────
const WS_URL          = "ws://ws-server-app-env.eba-9mkxvap7.us-east-1.elasticbeanstalk.com";
const RECONNECT_DELAY = 3000; // ms entre reintentos

// ─── Tipos ───────────────────────────────────────────────────────────────────

/**
 * @typedef {"connecting" | "connected" | "reconnecting" | "error"} ConexionStatus
 */

/**
 * @typedef {"idle" | "sending" | "success" | "error"} SendStatus
 */

/**
 * @typedef {Object} WsResult
 * @property {SendStatus}   status
 * @property {string|null}  message
 * @property {string|null}  response
 */

// ════════════════════════════════════════════════════════════════════════════
// Hook
// ════════════════════════════════════════════════════════════════════════════

export function useSendMessage() {

  // ── Refs de infraestructura ───────────────────────────────────────────────
  const wsRef             = useRef(null);
  const reconnectTimerRef = useRef(null);
  const unmountedRef      = useRef(false); // evita setState tras desmontaje

  // ── Estado de conexión ────────────────────────────────────────────────────
  /** @type {[ConexionStatus, Function]} */
  const [conexionStatus, setConexionStatus] = useState("connecting");

  // ── Estado del formulario ─────────────────────────────────────────────────
  const [nombre,            setNombre]            = useState("");
  const [formato,           setFormato]           = useState(null);
  const [jerarquia,         setJerarquia]         = useState("");
  const [coloresDestacados, setColoresDestacados] = useState("");
  const [tamanoMinimo,      setTamanoMinimo]      = useState("");
  const [usos,              setUsos]              = useState([]);
  const [usoPersonalizado,  setUsoPersonalizado]  = useState("");

  // ── Estado del proceso de envío ───────────────────────────────────────────
  /** @type {[WsResult, Function]} */
  const [wsResult, setWsResult] = useState({
    status: "idle", message: null, response: null,
  });

  // ── Gestión del ciclo de vida del WebSocket ───────────────────────────────

  const connect = useCallback(() => {
    // Limpiar conexión previa si sigue activa
    if (wsRef.current) {
      wsRef.current.onopen    = null;
      wsRef.current.onmessage = null;
      wsRef.current.onerror   = null;
      wsRef.current.onclose   = null;
      if (
        wsRef.current.readyState === WebSocket.OPEN ||
        wsRef.current.readyState === WebSocket.CONNECTING
      ) {
        wsRef.current.close();
      }
    }

    if (!unmountedRef.current) setConexionStatus("connecting");

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      if (unmountedRef.current) return;
      setConexionStatus("connected");
    };

    ws.onmessage = (event) => {
      if (unmountedRef.current) return;
      // Capturamos cualquier respuesta del servidor para mostrarla en la UI
      setWsResult((prev) => ({ ...prev, response: String(event.data) }));
    };

    ws.onerror = () => {
      // onerror siempre va seguido de onclose; onclose gestiona el reintento.
      if (unmountedRef.current) return;
      setConexionStatus("error");
    };

    ws.onclose = () => {
      if (unmountedRef.current) return;
      setConexionStatus("reconnecting");

      // Programar reconexión automática tras RECONNECT_DELAY ms
      reconnectTimerRef.current = setTimeout(() => {
        if (!unmountedRef.current) connect();
      }, RECONNECT_DELAY);
    };
  }, []); // estable durante toda la vida del hook

  useEffect(() => {
    unmountedRef.current = false;
    connect();

    return () => {
      unmountedRef.current = true;
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, [connect]);

  // ── Derivados ─────────────────────────────────────────────────────────────
  const isConnected = conexionStatus === "connected";
  const isValid     = nombre.trim().length > 0 && formato !== null;
  const sending     = wsResult.status === "sending";

  // ── Helpers de campo ─────────────────────────────────────────────────────

  const toggleUso = useCallback((uso) => {
    setUsos((prev) =>
      prev.includes(uso) ? prev.filter((u) => u !== uso) : [...prev, uso]
    );
  }, []);

  const resetForm = useCallback(() => {
    setNombre("");
    setFormato(null);
    setJerarquia("");
    setColoresDestacados("");
    setTamanoMinimo("");
    setUsos([]);
    setUsoPersonalizado("");
    setWsResult({ status: "idle", message: null, response: null });
  }, []);

  // ── Acción principal ──────────────────────────────────────────────────────

  const sendMessage = useCallback(async () => {
    if (!isValid || sending) return;

    // Verificar que la conexión sigue viva antes de intentar enviar
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      setWsResult({
        status:   "error",
        message:  "❌ Sin conexión con el servidor. Reintentando automáticamente…",
        response: null,
      });
      return;
    }

    setWsResult({ status: "sending", message: null, response: null });

    // ── Paso 1: construir el texto de la plantilla ────────────────────────
    let built;
    try {
      built = buildPlantillaMessage({
        nombre, formato, jerarquia,
        coloresDestacados, tamanoMinimo,
        usos, usoPersonalizado,
      });
    } catch (buildError) {
      setWsResult({
        status:   "error",
        message:  `Error al construir el mensaje: ${buildError.message}`,
        response: null,
      });
      return;
    }

    // ── Paso 2: enviar texto plano por el socket ───────────────────────────
    // IMPORTANTE: se envía built.text directamente (texto plano).
    // El receiver espera texto plano, no un wrapper JSON.
    try {
      wsRef.current.send(built.text);
      setWsResult({
        status:   "success",
        message:  "✅ Plantilla enviada correctamente al servidor.",
        response: null,
      });
    } catch (sendError) {
      setWsResult({
        status:   "error",
        message:  `❌ No se pudo enviar el mensaje: ${sendError.message}`,
        response: null,
      });
    }
  }, [
    isValid, sending,
    nombre, formato, jerarquia,
    coloresDestacados, tamanoMinimo,
    usos, usoPersonalizado,
  ]);

  // ── API pública ───────────────────────────────────────────────────────────
  return {
    fields: {
      nombre, formato, jerarquia,
      coloresDestacados, tamanoMinimo,
      usos, usoPersonalizado,
    },
    setNombre,
    setFormato,
    setJerarquia,
    setColoresDestacados,
    setTamanoMinimo,
    setUsoPersonalizado,
    toggleUso,
    resetForm,
    isValid,
    isConnected,
    sending,
    conexionStatus,   // "connecting" | "connected" | "reconnecting" | "error"
    wsResult,
    sendMessage,
  };
}
