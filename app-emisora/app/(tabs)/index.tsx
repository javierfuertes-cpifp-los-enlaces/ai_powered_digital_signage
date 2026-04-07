import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Image, Platform, Text, TextInput, View } from 'react-native';

const WS_URL = "ws://ws-server-app-env.eba-9mkxvap7.us-east-1.elasticbeanstalk.com";

// ─── Conversión URI → Base64 multiplataforma ───────────────────────────────
const uriToBase64 = async (uri) => {
  if (Platform.OS === 'web') {
    const response = await fetch(uri);
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader(); 

      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } else {
    return await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
  }
};

// ─── Pedir permisos multiplataforma ───────────────────────────────────────
const pedirPermiso = async () => {
  if (Platform.OS === 'web') return true; // La web no necesita permisos explícitos
  const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return permiso.granted;
};

export default function App() {
  const [texto, setTexto] = useState('');
  const [imagenUri, setImagenUri] = useState(null);
  const [estado, setEstado] = useState('Conectando...');
  const [enviando, setEnviando] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);
    ws.current.onopen = () => setEstado('Conectado ✅');
    ws.current.onerror = () => setEstado('Error de conexión ❌');
    ws.current.onclose = () => setEstado('Desconectado');
    return () => ws.current.close();
  }, []);

  const elegirImagen = async () => {
    const tienePermiso = await pedirPermiso();
    if (!tienePermiso) {
      Alert.alert('Permiso denegado', 'Necesitas dar acceso a la galería.');
      return;
    }
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
    if (!resultado.canceled) {
      setImagenUri(resultado.assets[0].uri);
    }
  };

  const enviar = async () => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;
    if (!texto.trim() && !imagenUri) {
      Alert.alert('Vacío', 'Escribe un texto o selecciona una imagen.');
      return;
    }

    setEnviando(true);
    try {
      let base64 = null;
      if (imagenUri) {
        base64 = await uriToBase64(imagenUri);
      }

      const paquete = JSON.stringify({
        tipo: 'mensaje',
        texto: texto.trim(),
        imagen: base64 ?? null,
      });

      ws.current.send(paquete);
      setTexto('');
      setImagenUri(null);
    } catch (e) {
      Alert.alert('Error', 'No se pudo enviar el mensaje: ' + e.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text>Estado: {estado}</Text>
      <TextInput
        value={texto}
        onChangeText={setTexto}
        placeholder="Escribe un mensaje"
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
      />
      <Button title="Elegir imagen" onPress={elegirImagen} />
      {imagenUri && (
        <Image
          source={{ uri: imagenUri }}
          style={{ width: 200, height: 200, marginVertical: 10 }}
          resizeMode="contain"
        />
      )}
      <Button title={enviando ? 'Enviando...' : 'Enviar'} onPress={enviar} disabled={enviando} />
    </View>
  );
}