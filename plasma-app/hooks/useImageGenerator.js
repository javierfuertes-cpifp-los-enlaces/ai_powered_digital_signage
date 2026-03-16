// hooks/useImageGenerator.js
// ─────────────────────────────────────────────────────────────────────────────
// Este hook contiene TODA la lógica de la aplicación.
// Los componentes solo se encargan de mostrar la interfaz.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";

// ── Cambia esta IP por la de tu ordenador en la red local ─────────────────────
// Ejecuta `ipconfig` (Windows) o `ifconfig` (Mac/Linux) para encontrarla
const API_URL = "http://192.168.1.100:3001";
// ─────────────────────────────────────────────────────────────────────────────

// Los estados posibles de la pantalla
// 'idle'    → formulario vacío esperando al usuario
// 'loading' → esperando respuesta de la API
// 'result'  → imagen generada lista para ver
// 'success' → imagen enviada a la TV correctamente
// 'error'   → algo salió mal
const ESTADOS = {
    IDLE: "idle",
    LOADING: "loading",
    RESULT: "result",
    SUCCESS: "success",
    ERROR: "error",
};

export function useImageGenerator() {
    // ── Estado ────────────────────────────────────────────────────────────────
    const [prompt, setPrompt] = useState("");       // texto que escribe el usuario
    const [estado, setEstado] = useState(ESTADOS.IDLE);
    const [imageUrl, setImageUrl] = useState(null);   // URL de la imagen generada
    const [error, setError] = useState(null);     // mensaje de error si hay

    // ── Función: enviar prompt a la API y recibir la imagen ───────────────────
    const generarImagen = async () => {
        if (!prompt.trim()) return; // no hacer nada si el campo está vacío

        setEstado(ESTADOS.LOADING);
        setError(null);

        try {
            // TODO: cuando la API esté lista, descomentar esto y borrar el mock de abajo
            //
            // const respuesta = await fetch(`${API_URL}/api/generate`, {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify({ prompt: prompt.trim() }),
            // });
            // const datos = await respuesta.json();
            // setImageUrl(datos.results[0].url);

            // ── RESPUESTA DE EJEMPLO (mock) ───────────────────────────────────────
            // Simulamos 2 segundos de espera como si la IA estuviera trabajando
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Usamos una imagen de ejemplo de internet
            // Cuando conectes la API real, esta línea desaparece
            setImageUrl("https://picsum.photos/seed/ia-cpifp/1024/1024");
            // ──────────────────────────────────────────────────────────────────────

            setEstado(ESTADOS.RESULT);
        } catch (e) {
            setError("No se pudo conectar con la API. Comprueba tu conexión.");
            setEstado(ESTADOS.ERROR);
        }
    };

    // ── Función: el usuario aprueba la imagen → se envía a la TV ─────────────
    const enviarATV = async () => {
        try {
            // TODO: cuando la API esté lista, descomentar esto y borrar el mock de abajo
            //
            // await fetch(`${API_URL}/api/select`, {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify({ images: [{ url: imageUrl }] }),
            // });

            // ── RESPUESTA DE EJEMPLO (mock) ───────────────────────────────────────
            await new Promise((resolve) => setTimeout(resolve, 800));
            setEstado(ESTADOS.SUCCESS);
        } catch (e) {
            setError("No se pudo enviar la imagen a la pantalla.");
            setEstado(ESTADOS.ERROR);
        }
    };

    const reiniciar = () => {
        setPrompt("");
        setImageUrl(null);
        setError(null);
        setEstado(ESTADOS.IDLE);
    };

    return {
        prompt,
        imageUrl,
        error,
        estaIdle: estado === ESTADOS.IDLE,
        estaCargando: estado === ESTADOS.LOADING,
        tieneResultado: estado === ESTADOS.RESULT,
        enviado: estado === ESTADOS.SUCCESS,
        tieneError: estado === ESTADOS.ERROR,
        setPrompt,
        generarImagen,
        enviarATV,
        reiniciar,
    };
}