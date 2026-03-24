import * as fs from "node:fs";
import * as path from "node:path";

// ─────────────────────────────────────────────
//  ✏️  CONFIGURA AQUÍ TUS VALORES
// ─────────────────────────────────────────────
const API_KEY = "sk_Y30zHQKX96WTjC5ITGN9a4ocqNuzm1OU";

const PROMPT = "Robot holding a red skateboard";
// ─────────────────────────────────────────────

async function generateImage() {
  console.log(`🎨 Generando imagen con el prompt:\n   "${PROMPT}"\n`);

  const encodedPrompt = encodeURIComponent(PROMPT);
  const url = `https://gen.pollinations.ai/image/${encodedPrompt}?model=flux&nologo=true&key=${API_KEY}`;

  console.log("⏳ Contactando con Pollinations.ai (puede tardar unos segundos)...");

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("image")) {
    throw new Error(`La respuesta no es una imagen. Content-Type recibido: ${contentType}`);
  }

  // Guardar la imagen
  const outputDir = "./output";
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  const filePath = path.join(outputDir, "imagen-1.png");
  const arrayBuffer = await response.arrayBuffer();
  fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

  console.log(`✅ Imagen guardada en: ${filePath}`);
  console.log("\n🎉 ¡Listo! Abre la carpeta 'output' para ver tu imagen.");
}

generateImage().catch((err) => {
  console.error("❌ Error al generar la imagen:");
  console.error(err.message || err);
  process.exit(1);
});
