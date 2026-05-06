import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, Alert, ActivityIndicator, Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import { useForm, Controller } from 'react-hook-form';
import type { CreateProyectoDto, EstadoProyecto }
  from '@entities/proyecto-tesis/model/types';
import { createProyecto, uploadDocument } from '../api/createProyecto';
import { AnimatedTextInput } from '@shared/ui/AnimatedTextInput';
import { EmojiExplosion } from '@shared/ui/EmojiExplosion';
import { GlitchView } from '@shared/ui/GlitchView';

const EMOJIS_EXITO = ['🎉', '🚀', '✨', '💻', '👏', '🔥'];
const EMOJIS_ERROR = ['⚠️', '❌', '😅', '📝', '🤔', '🛑'];

const C = {
  primary: '#0C2340',
  background: '#F5F7FA',
  card: '#FFFFFF',
  text: '#1A1A1A',
  textMuted: '#666666',
  textSecondary: '#444444',
  border: '#E0E0E0',
  error: '#E74C3C',
  success: '#27AE60',
  white: '#FFFFFF',
} as const;

const ESTADOS: EstadoProyecto[] = ['En Progreso', 'Completado', 'Suspendido'];

interface Props {
  onSuccess?: () => void;
}

interface FormValues {
  titulo: string;
  descripcion: string;
  autores: string;
  tutor_docente: string;
  tecnologias_utilizadas: string;
  fecha_inicio: string;
  fecha_fin: string;
  repositorio_github: string;
  estado: EstadoProyecto;
}

export function RegistroProyectoForm({ onSuccess }: Props) {
  const [cargando, setCargando] = useState(false);
  const [mostrarExito, setMostrarExito] = useState(false);
  const [mostrarError, setMostrarError] = useState(false);
  const [errorGlitch, setErrorGlitch] = useState(false);

  
  const triggerErrorGlitch = () => {
    setMostrarError(true);
    setErrorGlitch(true);
    setTimeout(() => setMostrarError(false), 1500);
    setTimeout(() => setErrorGlitch(false), 250);
  };

  // [RETO 5]: Validaciones estrictas (Regex, fechas y campos obligatorios).
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      titulo: '',
      descripcion: '',
      autores: '',
      tutor_docente: '',
      tecnologias_utilizadas: '',
      fecha_inicio: '',
      fecha_fin: '',
      repositorio_github: '',
      estado: 'En Progreso',
    },
  });

  const validarFechaEstricta = (value: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'El formato debe ser AAAA-MM-DD';
    const [y, m, d] = value.split('-');
    const date = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    if (date.getFullYear() !== parseInt(y) || date.getMonth() + 1 !== parseInt(m) || date.getDate() !== parseInt(d)) {
      return 'La fecha es inválida o no existe en el calendario';
    }
    if (parseInt(y) < 1900) return 'El año debe ser 1900 o superior';
    if (date > new Date()) return 'La fecha no puede ser en el futuro';
    return true;
  };

  
  const onSubmit = async (data: FormValues) => {
    try {
      setCargando(true);

      let documento_url = undefined;
      if (documento) {
        const url = await uploadDocument(documento.uri, documento.name);
        if (url) {
          documento_url = url;
        } else {
          Alert.alert('Error', 'No se pudo subir el documento. El proyecto se registrará sin él.');
        }
      }

      await createProyecto({ ...data, documento_url });
      
      
      setMostrarExito(true);
      setTimeout(() => {
        setMostrarExito(false);
        Alert.alert('¡Éxito!', 'Proyecto de tesis registrado correctamente.', [
          { text: 'OK', onPress: () => {
            setDocumento(null);
            onSuccess?.();
          }}
        ]);
      }, 2000);
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el proyecto. Verifica tu conexión.');
    } finally {
      setCargando(false);
    }
  };

  const [showPicker, setShowPicker] = useState({ fecha_inicio: false, fecha_fin: false });

  const handleChangeDate = (event: any, selectedDate: Date | undefined, onChange: (value: string) => void) => {
    setShowPicker({ fecha_inicio: false, fecha_fin: false });
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      onChange(formattedDate);
    }
  };

  const openDatePicker = (field: 'fecha_inicio' | 'fecha_fin') => {
    setShowPicker(prev => ({ ...prev, [field]: true }));
  };

  const [documento, setDocumento] = useState<{ uri: string; name: string } | null>(null);

  
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        setDocumento({
          uri: result.assets[0].uri,
          name: result.assets[0].name,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar el documento');
    }
  };

  return (
    <ScrollView
      style={[styles.contenedor, { backgroundColor: C.background }]}
      contentContainerStyle={[styles.scroll, { backgroundColor: C.background }]}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.titulo, { color: C.primary }]}>Nuevo Proyecto de Tesis</Text>
      <Text style={[styles.subtitulo, { color: C.textMuted }]}>ESFOT — Tecnología Superior en Desarrollo de Software</Text>

      <View style={styles.campoContenedor}>
        <Text style={[styles.etiqueta, { color: C.textSecondary }]}>Título del Proyecto *</Text>
        <Controller
          name="titulo"
          control={control}
          rules={{
            required: { value: true, message: 'El título es obligatorio' },
            minLength: { value: 5, message: 'El título debe tener al menos 5 caracteres' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AnimatedTextInput
              style={[styles.input, { backgroundColor: C.card, borderColor: C.border, color: C.text }]}
              placeholder="Ej: Sistema de gestión de inventarios para PYMES"
              placeholderTextColor={C.textMuted}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.titulo}
            />
          )}
        />
        {errors.titulo && <Text style={[styles.textoError, { color: C.error }]}>{errors.titulo.message}</Text>}
      </View>

      <View style={styles.campoContenedor}>
        <Text style={[styles.etiqueta, { color: C.textSecondary }]}>Descripción</Text>
        <Controller
          name="descripcion"
          control={control}
          rules={{
            required: { value: true, message: 'La descripción es obligatoria' },
            minLength: { value: 20, message: 'La descripción debe tener al menos 20 caracteres' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AnimatedTextInput
              style={[styles.input, styles.inputMultiline, { backgroundColor: C.card, borderColor: C.border, color: C.text }]}
              placeholder="Describe brevemente el objetivo del proyecto..."
              placeholderTextColor={C.textMuted}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
              numberOfLines={3}
              error={!!errors.descripcion}
            />
          )}
        />
        {errors.descripcion && <Text style={[styles.textoError, { color: C.error }]}>{errors.descripcion.message}</Text>}
      </View>

      <View style={styles.campoContenedor}>
        <Text style={[styles.etiqueta, { color: C.textSecondary }]}>Autores * (separa con comas)</Text>
        <Controller
          name="autores"
          control={control}
          rules={{
            required: { value: true, message: 'Los autores son obligatorios' },
            pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s,]+$/, message: 'Solo se permiten letras, espacios y comas' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AnimatedTextInput
              style={[styles.input, { backgroundColor: C.card, borderColor: C.border, color: C.text }]}
              placeholder="Ej: Ana Torres, Luis Pérez"
              placeholderTextColor={C.textMuted}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.autores}
            />
          )}
        />
        {errors.autores && <Text style={[styles.textoError, { color: C.error }]}>{errors.autores.message}</Text>}
      </View>

      <View style={styles.campoContenedor}>
        <Text style={[styles.etiqueta, { color: C.textSecondary }]}>Tutor Docente *</Text>
        <Controller
          name="tutor_docente"
          control={control}
          rules={{
            required: { value: true, message: 'El tutor docente es obligatorio' },
            pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]+$/, message: 'Solo letras, espacios y puntos' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AnimatedTextInput
              style={[styles.input, { backgroundColor: C.card, borderColor: C.border, color: C.text }]}
              placeholder="Ej: Ing. Juan Carlos Gonzalez Msc."
              placeholderTextColor={C.textMuted}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.tutor_docente}
            />
          )}
        />
        {errors.tutor_docente && <Text style={[styles.textoError, { color: C.error }]}>{errors.tutor_docente.message}</Text>}
      </View>

      <View style={styles.campoContenedor}>
        <Text style={[styles.etiqueta, { color: C.textSecondary }]}>Tecnologías Utilizadas * (separa con comas)</Text>
        <Controller
          name="tecnologias_utilizadas"
          control={control}
          rules={{ required: { value: true, message: 'Las tecnologías son obligatorias' } }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AnimatedTextInput
              style={[styles.input, { backgroundColor: C.card, borderColor: C.border, color: C.text }]}
              placeholder="Ej: React Native, Node.js, PostgreSQL, AWS"
              placeholderTextColor={C.textMuted}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.tecnologias_utilizadas}
            />
          )}
        />
        {errors.tecnologias_utilizadas && <Text style={[styles.textoError, { color: C.error }]}>{errors.tecnologias_utilizadas.message}</Text>}
      </View>

      <View style={styles.campoContenedor}>
        <Text style={[styles.etiqueta, { color: C.textSecondary }]}>Fecha de Inicio *</Text>
        <Controller
          name="fecha_inicio"
          control={control}
          rules={{ required: 'Obligatorio', validate: validarFechaEstricta }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TouchableOpacity
                style={[styles.input, { backgroundColor: C.card, borderColor: errors.fecha_inicio ? C.error : C.border }]}
                onPress={() => openDatePicker('fecha_inicio')}
              >
                <Text style={value ? [styles.inputText, { color: C.text }] : [styles.placeholderText, { color: C.textMuted }]}>
                  {value || 'Selecciona una fecha'}
                </Text>
              </TouchableOpacity>
              {showPicker.fecha_inicio && (
                <DateTimePicker
                  value={value ? new Date(value) : new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, date) => handleChangeDate(event, date, onChange)}
                />
              )}
            </>
          )}
        />
        {errors.fecha_inicio && <Text style={[styles.textoError, { color: C.error }]}>{errors.fecha_inicio.message}</Text>}
      </View>

      <View style={styles.campoContenedor}>
        <Text style={[styles.etiqueta, { color: C.textSecondary }]}>Fecha de Fin</Text>
        <Controller
          name="fecha_fin"
          control={control}
          rules={{
            required: 'Obligatorio',
            validate: {
              fechaValida: validarFechaEstricta,
              rango: (value, formValues) => !value || !formValues.fecha_inicio || value >= formValues.fecha_inicio || 'No puede ser anterior a la de inicio',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TouchableOpacity
                style={[styles.input, { backgroundColor: C.card, borderColor: errors.fecha_fin ? C.error : C.border }]}
                onPress={() => openDatePicker('fecha_fin')}
              >
                <Text style={value ? [styles.inputText, { color: C.text }] : [styles.placeholderText, { color: C.textMuted }]}>
                  {value || 'Selecciona una fecha (o deja vacío)'}
                </Text>
              </TouchableOpacity>
              {showPicker.fecha_fin && (
                <DateTimePicker
                  value={value ? new Date(value) : new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, date) => handleChangeDate(event, date, onChange)}
                />
              )}
            </>
          )}
        />
        {errors.fecha_fin && <Text style={[styles.textoError, { color: C.error }]}>{errors.fecha_fin.message}</Text>}
      </View>

      <View style={styles.campoContenedor}>
        <Text style={[styles.etiqueta, { color: C.textSecondary }]}>Repositorio GitHub</Text>
        <Controller
          name="repositorio_github"
          control={control}
          rules={{ required: { value: true, message: 'El repositorio es obligatorio' } }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AnimatedTextInput
              style={[styles.input, { backgroundColor: C.card, borderColor: C.border, color: C.text }]}
              placeholder="https://github.com/usuario/repositorio"
              placeholderTextColor={C.textMuted}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="url"
              autoCapitalize="none"
              error={!!errors.repositorio_github}
            />
          )}
        />
        {errors.repositorio_github && <Text style={[styles.textoError, { color: C.error }]}>{errors.repositorio_github.message}</Text>}
      </View>

      <View style={styles.campoContenedor}>
        <Text style={[styles.etiqueta, { color: C.textSecondary }]}>Estado del Proyecto</Text>
        <Controller
          name="estado"
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.estadoContenedor}>
              {ESTADOS.map(est => (
                <TouchableOpacity
                  key={est}
                  style={[
                    styles.estadoBoton,
                    { borderColor: C.border, backgroundColor: C.card },
                    value === est && { backgroundColor: C.primary, borderColor: C.primary },
                  ]}
                  onPress={() => onChange(est)}
                >
                  <Text style={[
                    styles.estadoTexto,
                    { color: C.textSecondary },
                    value === est && { color: C.white, fontWeight: '700' },
                  ]}>{est}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
      </View>

      <View style={styles.campoContenedor}>
        <Text style={[styles.etiqueta, { color: C.textSecondary }]}>Documento PDF (Opcional)</Text>
        <TouchableOpacity style={[styles.documentButton, { backgroundColor: C.card, borderColor: C.border }]} onPress={pickDocument}>
          <Text style={[styles.documentButtonText, { color: C.primary }]}>
            {documento ? documento.name : 'Seleccionar archivo PDF'}
          </Text>
        </TouchableOpacity>
        {documento && (
          <Text style={[styles.documentSelected, { color: C.success }]}>Archivo seleccionado</Text>
        )}
      </View>

      <GlitchView trigger={errorGlitch} style={{ marginTop: 10 }} borderRadius={10}>
        <TouchableOpacity
          style={[styles.botonGuardar, { backgroundColor: C.primary }, cargando && styles.botonDeshabilitado]}
          
          onPress={handleSubmit(onSubmit, triggerErrorGlitch)}
          disabled={cargando}
        >
          {cargando
            ? <ActivityIndicator color={C.white} />
            : <Text style={[styles.botonTexto, { color: C.white }]}>Registrar Proyecto</Text>
          }
        </TouchableOpacity>
      </GlitchView>

      
      <EmojiExplosion trigger={mostrarExito} emojis={EMOJIS_EXITO} />
      
      <EmojiExplosion trigger={mostrarError} emojis={EMOJIS_ERROR} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 40 },
  titulo: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  subtitulo: { fontSize: 13, marginBottom: 24 },
  campoContenedor: { marginBottom: 16 },
  etiqueta: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    fontSize: 15,
  },
  inputMultiline: { height: 80, textAlignVertical: 'top', paddingTop: 10 },
  textoError: { fontSize: 12, marginTop: 4 },
  inputText: { fontSize: 15 },
  placeholderText: { fontSize: 15 },
  estadoContenedor: { flexDirection: 'row', gap: 10 },
  estadoBoton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  estadoTexto: { fontSize: 13 },
  botonGuardar: {
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  botonDeshabilitado: { opacity: 0.6 },
  botonTexto: { fontSize: 16, fontWeight: '700' },
  documentButton: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  documentButtonText: { fontSize: 14, fontWeight: '600' },
  documentSelected: { fontSize: 12, marginTop: 4 },
});