// hooks/useImageGenerator.js
// ─────────────────────────────────────────────────────────────────────────────
// Este hook contiene TODA la lógica de la aplicación.
// Los componentes solo se encargan de mostrar la interfaz.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";

// ── Configuración de la API de Pollinations.ai ────────────────────────────────
// Déjalo vacío si no tienes clave, la API funciona también sin ella
const POLLINATIONS_API_KEY = "sk_Y30zHQKX96WTjC5ITGN9a4ocqNuzm1OU";
// ─────────────────────────────────────────────────────────────────────────────

// ── Dirección de tu servidor local (TV de plasma) ────────────────────────────
// Cambia esta IP por la de tu ordenador en la red local.
// Ejecuta `ipconfig` (Windows) o `ifconfig` (Mac/Linux) para encontrarla.
const API_URL = "http://192.168.1.100:3001";
// ─────────────────────────────────────────────────────────────────────────────

// Los estados posibles de la pantalla
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
    const [imageUrl, setImageUrl] = useState(null); // URL pública de la imagen
    const [error, setError] = useState(null);       // mensaje de error si hay

    // ── Función: generar URL de Pollinations.ai con semilla aleatoria ─────────
    const generarImagen = async () => {
        if (!prompt.trim()) return; // no hacer nada si el campo está vacío

        setEstado(ESTADOS.LOADING);
        setError(null);

        try {
            // 1. Construir la URL de la API de Pollinations
            const encodedPrompt = encodeURIComponent(prompt.trim());
            
            // 2. Generamos una semilla aleatoria para fijar la imagen.
            // Esto asegura que la TV y tu app muestren exactamente la misma imagen
            // al cargar esta URL, en lugar de generar una nueva cada vez que se abre.
            const randomSeed = Math.floor(Math.random() * 1000000);

            const pollinationsUrl =
                `https://gen.pollinations.ai/image/${encodedPrompt}` +
                `?model=flux&nologo=true&seed=${randomSeed}` +
                (POLLINATIONS_API_KEY ? `&key=${POLLINATIONS_API_KEY}` : "");

            // 3. Guardamos directamente la URL pública lista para usar
            setImageUrl(pollinationsUrl);
            setEstado(ESTADOS.RESULT);

        } catch (e) {
            setError(`Error al generar la imagen: ${e.message}`);
            setEstado(ESTADOS.ERROR);
        }
    };

    // ── Función: el usuario aprueba la imagen → se envía a la TV ─────────────
    const enviarATV = async () => {
        try {
            await fetch(`${API_URL}/api/select`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // Enviamos la URL pública de Pollinations a la TV
                body: JSON.stringify({ images: [{ url: imageUrl }] }),
            });

            setEstado(ESTADOS.SUCCESS);
        } catch (e) {
            setError("No se pudo enviar la imagen a la pantalla. Verifica la conexión con la TV.");
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