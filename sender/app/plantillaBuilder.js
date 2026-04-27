// ════════════════════════════════════════════════════════════════════════════
// plantillaBuilder.js
//
// Responsabilidad única: transformar los campos del formulario en un
// mensaje de texto estructurado listo para ser enviado.
//
// No conoce nada de WebSockets, React ni estado de la UI.
// ════════════════════════════════════════════════════════════════════════════

// ─── Helpers privados ────────────────────────────────────────────────────────

/** Devuelve el valor o un guión si está vacío. */
const valueOrDash = (str) => (str && str.trim() ? str.trim() : "—");

/** Capitaliza la primera letra de una cadena. */
const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "—";

/** Construye el bloque de sección con separador y líneas de contenido. */
const section = (title, lines) =>
  [`── ${title} ${"─".repeat(Math.max(0, 35 - title.length))}`, ...lines, ""];

// ─── Tipos ───────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} PlantillaFields
 * @property {string}   nombre            - Identificador de la plantilla.
 * @property {string|null} formato        - "horizontal" | "vertical" | "cuadrado".
 * @property {string}   jerarquia         - Jerarquía visual de los elementos.
 * @property {string}   coloresDestacados - Colores de acento o fondo.
 * @property {string}   tamanoMinimo      - Tamaño mínimo de cada elemento.
 * @property {string[]} usos              - Lista de usos recomendados seleccionados.
 * @property {string}   usoPersonalizado  - Uso libre escrito por el usuario.
 */

/**
 * @typedef {Object} PlantillaMessage
 * @property {string} text      - Texto plano listo para enviar al servidor.
 * @property {Object} metadata  - Resumen estructurado de los datos (para logs o auditoría).
 */

// ─── API pública ─────────────────────────────────────────────────────────────

/**
 * Valida y construye el mensaje de texto de una plantilla a partir de los
 * campos del formulario.
 *
 * @param   {PlantillaFields}  fields  Valores del formulario.
 * @returns {PlantillaMessage}         Texto estructurado + metadatos.
 * @throws  {Error}                    Si los campos obligatorios están ausentes.
 */
export function buildPlantillaMessage(fields) {
  const {
    nombre,
    formato,
    jerarquia         = "",
    coloresDestacados = "",
    tamanoMinimo      = "",
    usos              = [],
    usoPersonalizado  = "",
  } = fields;

  // ── Validación de campos obligatorios ────────────────────────────────────
  if (!nombre || !nombre.trim()) {
    throw new Error("El campo «nombre» es obligatorio.");
  }
  if (!formato) {
    throw new Error("El campo «formato» es obligatorio.");
  }

  // ── Combinar usos ─────────────────────────────────────────────────────────
  const todosUsos = [
    ...usos,
    ...(usoPersonalizado.trim() ? [usoPersonalizado.trim()] : []),
  ];

  // ── Construir bloques de texto ────────────────────────────────────────────
  const header = [
    "═══════════════════════════════════════",
    "  PLANTILLA DE CAMPAÑA",
    "═══════════════════════════════════════",
    `Nombre:   ${nombre.trim()}`,
    `Formato:  ${capitalize(formato)}`,
    "",
  ];

  const estiloLines = section("Estilo y reglas", [
    `Jerarquía visual:    ${valueOrDash(jerarquia)}`,
    `Colores destacados:  ${valueOrDash(coloresDestacados)}`,
    `Tamaño mínimo:       ${valueOrDash(tamanoMinimo)}`,
  ]);

  const usoLines = section(
    "Uso recomendado",
    todosUsos.length ? todosUsos.map((u) => `  · ${u}`) : ["  —"]
  );

  const footer = ["═══════════════════════════════════════"];

  const text = [...header, ...estiloLines, ...usoLines, ...footer].join("\n");

  // ── Metadatos (para auditoría / logs) ────────────────────────────────────
  const metadata = {
    nombre:            nombre.trim(),
    formato,
    estiloYReglas: {
      jerarquiaVisual:    valueOrDash(jerarquia),
      coloresDestacados:  valueOrDash(coloresDestacados),
      tamanoMinimo:       valueOrDash(tamanoMinimo),
    },
    usoRecomendado: todosUsos,
    generadoEn: new Date().toISOString(),
  };

  return { text, metadata };
}
