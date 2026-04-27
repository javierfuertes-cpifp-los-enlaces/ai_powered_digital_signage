import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  ActivityIndicator,
} from "react-native";

import { useSendMessage } from "./useSendMessage";

// ─── Paleta (tema claro) ─────────────────────────────────────────────────────
const C = {
  bg:          "#FFFFFF",
  surface:     "#F7F7FB",
  surfaceAlt:  "#EFEFF6",
  border:      "#E4E4EF",
  borderFocus: "#5B52F0",
  accent:      "#5B52F0",
  accentSoft:  "#EEEDFB",
  accentText:  "#4039C8",
  text:        "#16151F",
  textMuted:   "#6B6880",
  textSub:     "#AEACC2",
  success:     "#1A9E6B",
  successBg:   "#EAF7F2",
  warning:     "#B45309",
  warningBg:   "#FFFBEB",
  error:       "#D63B3B",
  errorBg:     "#FDF0F0",
  white:       "#FFFFFF",
  tag:         "#F0F0F8",
};

// ─── Datos estáticos de presentación ────────────────────────────────────────
const FORMATOS = [
  { id: "horizontal", label: "Horizontal", icon: "⬛", desc: "Pantalla de tienda" },
  { id: "vertical",   label: "Vertical",   icon: "▬",  desc: "Escaparate"        },
  { id: "cuadrado",   label: "Cuadrado",   icon: "◼",  desc: "Redes sociales"    },
];

const USOS = [
  "Campaña de temporada",
  "Lanzamiento de producto",
  "Promoción especial",
  "Escaparate exterior",
  "Publicación en redes",
  "Cartelería interior",
];

// ─── Mapa de estados de conexión → visual ─────────────────────────────────
const CONEXION_CONFIG = {
  connecting:   { dot: "#F59E0B", label: "Conectando…",        bg: C.warningBg, border: "#F59E0B40" },
  connected:    { dot: C.success, label: "Conectado",           bg: C.successBg, border: C.success + "40" },
  reconnecting: { dot: "#F59E0B", label: "Reconectando…",       bg: C.warningBg, border: "#F59E0B40" },
  error:        { dot: C.error,   label: "Error de conexión",   bg: C.errorBg,   border: C.error + "40"   },
};

// ════════════════════════════════════════════════════════════════════════════
// Subcomponentes de UI
// ════════════════════════════════════════════════════════════════════════════

/** Píldora de estado de la conexión WebSocket */
const ConexionPill = ({ status }) => {
  const cfg = CONEXION_CONFIG[status] ?? CONEXION_CONFIG.connecting;
  const pulsing = status === "connecting" || status === "reconnecting";

  return (
    <View style={[s.pill, { backgroundColor: cfg.bg, borderColor: cfg.border }]}>
      <View style={[s.pillDot, { backgroundColor: cfg.dot }]}>
        {pulsing && <View style={[s.pillDotRing, { borderColor: cfg.dot }]} />}
      </View>
      <Text style={[s.pillLabel, { color: cfg.dot }]}>{cfg.label}</Text>
    </View>
  );
};

const SectionHeader = ({ step, title, subtitle }) => (
  <View style={s.sectionHeader}>
    <View style={s.stepBadge}>
      <Text style={s.stepNum}>{step}</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={s.sectionTitle}>{title}</Text>
      {subtitle ? <Text style={s.sectionSub}>{subtitle}</Text> : null}
    </View>
  </View>
);

const FormatoSelector = ({ value, onChange }) => (
  <View style={s.formatoRow}>
    {FORMATOS.map((f) => {
      const sel = value === f.id;
      return (
        <TouchableOpacity
          key={f.id}
          style={[s.formatoCard, sel && s.formatoCardActive]}
          onPress={() => onChange(f.id)}
          activeOpacity={0.75}
        >
          <Text style={[s.formatoIcon,  sel && s.formatoIconActive]}>{f.icon}</Text>
          <Text style={[s.formatoLabel, sel && s.formatoLabelActive]}>{f.label}</Text>
          <Text style={[s.formatoDesc,  sel && s.formatoDescActive]}>{f.desc}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const LabeledInput = ({ label, placeholder, value, onChangeText, multiline = false, hint }) => {
  const [focused, setFocused] = useState(false);
  return (
    <View style={s.inputGroup}>
      <Text style={s.inputLabel}>{label}</Text>
      {hint ? <Text style={s.inputHint}>{hint}</Text> : null}
      <TextInput
        style={[s.input, multiline && s.inputMulti, focused && s.inputFocused]}
        placeholder={placeholder}
        placeholderTextColor={C.textSub}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        textAlignVertical={multiline ? "top" : "center"}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        selectionColor={C.accent}
      />
    </View>
  );
};

const UsoSelector = ({ selected, onToggle }) => (
  <View style={s.tagsWrap}>
    {USOS.map((uso) => {
      const active = selected.includes(uso);
      return (
        <TouchableOpacity
          key={uso}
          style={[s.tag, active && s.tagActive]}
          onPress={() => onToggle(uso)}
          activeOpacity={0.75}
        >
          <Text style={[s.tagText, active && s.tagTextActive]}>{uso}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const StatusBanner = ({ status }) => {
  if (!status || status.status === "idle") return null;
  const isOk  = status.status === "success";
  const isErr = status.status === "error";
  return (
    <View style={[s.banner, isOk && s.bannerOk, isErr && s.bannerErr]}>
      <Text style={[s.bannerText, isOk && s.bannerTextOk, isErr && s.bannerTextErr]}>
        {status.message}
      </Text>
      {isOk && status.response ? (
        <Text style={s.bannerResponse}>
          Respuesta del servidor:{"\n"}{status.response}
        </Text>
      ) : null}
    </View>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// Pantalla principal
// ════════════════════════════════════════════════════════════════════════════
export default function PlantillaFormScreen() {
  const {
    fields,
    setNombre,
    setFormato,
    setJerarquia,
    setColoresDestacados,
    setTamanoMinimo,
    setUsoPersonalizado,
    toggleUso,
    isValid,
    isConnected,
    sending,
    conexionStatus,
    wsResult,
    sendMessage,
  } = useSendMessage();

  const {
    nombre, formato, jerarquia,
    coloresDestacados, tamanoMinimo,
    usos, usoPersonalizado,
  } = fields;

  // El botón se deshabilita si el form no es válido, se está enviando o no hay conexión
  const btnDisabled = !isValid || sending || !isConnected;

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      {/* ── Cabecera con estado de conexión ── */}
      <View style={s.header}>
        <View>
          <Text style={s.headerLabel}>CENTRAL / PLANTILLAS</Text>
          <Text style={s.headerTitle}>Nueva plantilla</Text>
        </View>
        <ConexionPill status={conexionStatus} />
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* 01 · Identificación */}
        <View style={s.card}>
          <SectionHeader step="01" title="Identificación" subtitle="Nombre único de la plantilla" />
          <LabeledInput
            label="Nombre de la plantilla"
            placeholder="Ej. Promo_Verano_Horizontal_2024"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        {/* 02 · Formato */}
        <View style={s.card}>
          <SectionHeader step="02" title="Formato" subtitle="Orientación y contexto de uso" />
          <FormatoSelector value={formato} onChange={setFormato} />
        </View>

        {/* 03 · Estilo y reglas */}
        <View style={s.card}>
          <SectionHeader
            step="03"
            title="Estilo y reglas"
            subtitle="Directrices de composición visual"
          />
          <LabeledInput
            label="Jerarquía visual"
            placeholder="Ej. Título > Precio > Imagen > Etiqueta"
            value={jerarquia}
            onChangeText={setJerarquia}
            hint="Define el orden de importancia de los elementos"
          />
          <LabeledInput
            label="Colores destacados"
            placeholder="Ej. Fondo: #FF3B30 · Texto: #FFFFFF"
            value={coloresDestacados}
            onChangeText={setColoresDestacados}
          />
          <LabeledInput
            label="Tamaño mínimo de elementos"
            placeholder="Ej. Logo: 80px · Precio: 48px · Texto: 14px"
            value={tamanoMinimo}
            onChangeText={setTamanoMinimo}
          />
        </View>

        {/* 04 · Uso recomendado */}
        <View style={s.card}>
          <SectionHeader
            step="04"
            title="Uso recomendado"
            subtitle="Situaciones o campañas para las que está diseñada"
          />
          <Text style={s.inputLabel}>Selecciona uno o varios</Text>
          <UsoSelector selected={usos} onToggle={toggleUso} />
          <LabeledInput
            label="Otro uso personalizado"
            placeholder="Describe un caso de uso específico…"
            value={usoPersonalizado}
            onChangeText={setUsoPersonalizado}
            multiline
          />
        </View>

        {/* Banner resultado del último envío */}
        <StatusBanner status={wsResult} />

        {/* Botón guardar */}
        <TouchableOpacity
          style={[s.submitBtn, btnDisabled && s.submitBtnDisabled]}
          onPress={sendMessage}
          disabled={btnDisabled}
          activeOpacity={0.85}
        >
          {sending ? (
            <ActivityIndicator color={C.white} size="small" />
          ) : (
            <>
              <Text style={[s.submitText, btnDisabled && s.submitTextDisabled]}>
                {!isConnected ? "Sin conexión con el servidor" : "Guardar y enviar plantilla"}
              </Text>
              {!btnDisabled && <Text style={s.submitArrow}>→</Text>}
            </>
          )}
        </TouchableOpacity>

        {/* Hint de validación del formulario */}
        {isConnected && !isValid && (
          <Text style={s.validationHint}>
            Completa el nombre y selecciona un formato para continuar.
          </Text>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Estilos
// ════════════════════════════════════════════════════════════════════════════
const s = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: C.bg },

  // ── Cabecera ───────────────────────────────────────────────────────────────
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 16 : 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    backgroundColor: C.bg,
  },
  headerLabel: {
    color: C.textSub,
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: "600",
    marginBottom: 2,
  },
  headerTitle: { color: C.text, fontSize: 22, fontWeight: "700", letterSpacing: -0.3 },

  // ── Píldora de conexión ────────────────────────────────────────────────────
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  pillDotRing: {
    position: "absolute",
    top: -3,
    left: -3,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    opacity: 0.4,
  },
  pillLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // ── Scroll ────────────────────────────────────────────────────────────────
  scroll:        { flex: 1, backgroundColor: C.bg },
  scrollContent: { padding: 16, gap: 12 },

  // ── Tarjeta ───────────────────────────────────────────────────────────────
  card: {
    backgroundColor: C.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: C.border,
    gap: 16,
  },

  // ── Section header ────────────────────────────────────────────────────────
  sectionHeader: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: C.accentSoft,
    borderWidth: 1,
    borderColor: C.accent + "50",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNum:      { color: C.accentText, fontSize: 11, fontWeight: "800", letterSpacing: 0.5 },
  sectionTitle: { color: C.text,       fontSize: 16, fontWeight: "700", letterSpacing: -0.2 },
  sectionSub:   { color: C.textMuted,  fontSize: 12, marginTop: 2,      lineHeight: 16 },

  // ── Input ─────────────────────────────────────────────────────────────────
  inputGroup: { gap: 6 },
  inputLabel: {
    color: C.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  inputHint:    { color: C.textSub, fontSize: 11, lineHeight: 15, marginTop: -2 },
  input: {
    backgroundColor: C.bg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: C.text,
    fontSize: 14,
    lineHeight: 20,
  },
  inputMulti:   { height: 100, paddingTop: 12 },
  inputFocused: { borderColor: C.borderFocus, backgroundColor: C.accentSoft },

  // ── Selector de formato ───────────────────────────────────────────────────
  formatoRow: { flexDirection: "row", gap: 10 },
  formatoCard: {
    flex: 1,
    backgroundColor: C.bg,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: C.border,
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 6,
    gap: 4,
  },
  formatoCardActive:  { backgroundColor: C.accentSoft, borderColor: C.accent },
  formatoIcon:        { fontSize: 20, color: C.textSub },
  formatoIconActive:  { color: C.accent },
  formatoLabel:       { color: C.textMuted,  fontSize: 12, fontWeight: "700", letterSpacing: 0.2 },
  formatoLabelActive: { color: C.accentText },
  formatoDesc:        { color: C.textSub,    fontSize: 10, textAlign: "center", lineHeight: 13 },
  formatoDescActive:  { color: C.textMuted },

  // ── Tags de uso ───────────────────────────────────────────────────────────
  tagsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: {
    backgroundColor: C.tag,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: C.border,
  },
  tagActive:     { backgroundColor: C.accentSoft, borderColor: C.accent },
  tagText:       { color: C.textMuted,  fontSize: 13, fontWeight: "500" },
  tagTextActive: { color: C.accentText, fontSize: 13, fontWeight: "600" },

  // ── Banner de resultado ───────────────────────────────────────────────────
  banner: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.surfaceAlt,
    marginTop: 4,
  },
  bannerOk:       { backgroundColor: C.successBg, borderColor: C.success + "60" },
  bannerErr:      { backgroundColor: C.errorBg,   borderColor: C.error   + "60" },
  bannerText:     { color: C.textMuted, fontSize: 13, lineHeight: 18, textAlign: "center" },
  bannerTextOk:   { color: C.success },
  bannerTextErr:  { color: C.error   },
  bannerResponse: {
    color: C.textMuted,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 8,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    backgroundColor: C.surfaceAlt,
    borderRadius: 6,
    padding: 8,
  },

  // ── Botón principal ───────────────────────────────────────────────────────
  submitBtn: {
    marginTop: 8,
    backgroundColor: C.accent,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: C.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 4,
  },
  submitBtnDisabled: {
    backgroundColor: C.surfaceAlt,
    borderWidth: 1,
    borderColor: C.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  submitText:         { color: C.white,   fontSize: 16, fontWeight: "700", letterSpacing: 0.1 },
  submitTextDisabled: { color: C.textSub, fontSize: 14 },
  submitArrow:        { color: C.white,   fontSize: 18, fontWeight: "300" },
  validationHint: {
    color: C.textSub,
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 17,
    paddingHorizontal: 20,
  },
});
