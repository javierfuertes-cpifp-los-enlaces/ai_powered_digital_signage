# 🖼️ Generador de imágenes con Gemini Imagen API

Proyecto mínimo en JavaScript para generar imágenes usando el modelo
`imagen-4.0-generate-001` de Google Gemini.

---

## ⚙️ Requisitos

- **Node.js** versión 18 o superior → https://nodejs.org

---

## 🚀 Instrucciones paso a paso

### 1. Obtén tu API Key de Gemini
Ve a https://aistudio.google.com/apikey y genera una clave gratuita.

### 2. Abre el archivo `index.js` y edita estas dos variables al inicio:

```js
const API_KEY = "TU_API_KEY_AQUI";   // ← Pega tu API Key aquí
const PROMPT  = "...";               // ← Escribe lo que quieres generar
```

### 3. Instala las dependencias (solo la primera vez)

```bash
npm install
```

### 4. Ejecuta el script

```bash
npm start
```

### 5. ¡Listo!
La imagen se guardará en la carpeta `output/imagen-1.png`.

---

## 📝 Ejemplos de prompts

```
"A futuristic city at sunset, cyberpunk style, neon lights, 4K"
"A cute cat wearing a wizard hat, watercolor painting style"
"A majestic mountain landscape with a lake reflection, golden hour"
```

---

## ⚠️ Notas

- Los prompts deben estar en **inglés** (requisito de la API de Imagen).
- El modelo genera **1 imagen** por ejecución (puedes cambiar `numberOfImages` a 1-4 en `index.js`).
- Todas las imágenes incluyen una marca de agua invisible de SynthID (política de Google).
