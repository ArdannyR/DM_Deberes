import React, { useState } from 'react';
// [RETO 3]: Feature de edición con formulario pre-llenado.
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, Alert, ActivityIndicator, Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';
import type { EstadoProyecto, ProyectoTesis }
  from '@entities/proyecto-tesis/model/types';
import { proyectoApi } from '@entities/proyecto-tesis/api/proyectoApi';
import { uploadDocument } from '@features/registro-proyecto/api/createProyecto';
import { AnimatedTextInput } from '@shared/ui/AnimatedTextInput';
import { EmojiExplosion } from '@shared/ui/EmojiExplosion';
import { GlitchView } from '@shared/ui/GlitchView';

const EMOJIS_EXITO = ['🎉', '🚀', '✨', '💻', '👏', '🔥'];
const EMOJIS_ERROR = ['⚠️', '❌', '😅', '📝', '🤔', '🛑'];

interface Props {
  proyectoInicial: ProyectoTesis;
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
  documento_url: string | null;
  estado: EstadoProyecto;
}

const ESTADOS: EstadoProyecto[] = ['En Progreso', 'Completado', 'Suspendido'];

export function EditarProyectoForm({ proyectoInicial, onSuccess }: Props) {
  const router = useRouter();
  const [cargando, setCargando] = useState(false);
  const [nuevoDocumento, setNuevoDocumento] = useState<{ uri: string; name: string } | null>(null);
  const [eliminarDocumento, setEliminarDocumento] = useState(false);
  const [mostrarExito, setMostrarExito] = useState(false);
  const [mostrarError, setMostrarError] = useState(false);
  const [errorGlitch, setErrorGlitch] = useState(false);

  
  const triggerErrorGlitch = () => {
    setMostrarError(true);
    setErrorGlitch(true);
    setTimeout(() => setMostrarError(false), 1500);
    setTimeout(() => setErrorGlitch(false), 250);
  };
  // [RETO 5]: Validaciones del formulario usando React Hook Form.
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      titulo: proyectoInicial.titulo,
      descripcion: proyectoInicial.descripcion,
      autores: proyectoInicial.autores,
      tutor_docente: proyectoInicial.tutor_docente,
      tecnologias_utilizadas: proyectoInicial.tecnologias_utilizadas,
      fecha_inicio: proyectoInicial.fecha_inicio,
      fecha_fin: proyectoInicial.fecha_fin || '',
      repositorio_github: proyectoInicial.repositorio_github || '',
      documento_url: proyectoInicial.documento_url || null,
      estado: proyectoInicial.estado,
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

      let documento_url = data.documento_url;

      if (nuevoDocumento) {
        const url = await uploadDocument(nuevoDocumento.uri, nuevoDocumento.name);
        if (url) {
          documento_url = url;
        } else {
          Alert.alert('Error', 'No se pudo subir el documento. Se mantendrá el anterior.');
          documento_url = proyectoInicial.documento_url || null;
        }
      }

      await proyectoApi.update(proyectoInicial.id, { ...data, documento_url });
      
      
      setMostrarExito(true);
      setTimeout(() => {
        setMostrarExito(false);
        Alert.alert('¡Éxito!', 'Proyecto actualizado correctamente.', [
          { text: 'OK', onPress: () => router.replace('/') }
        ]);
      }, 2000);
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el proyecto. Verifica tu conexión.');
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

  
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        setNuevoDocumento({
          uri: result.assets[0].uri,
          name: result.assets[0].name,
        });
        setEliminarDocumento(false);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar el documento');
    }
  };

  const handleEliminarDocumento = () => {
    setNuevoDocumento(null);
    setEliminarDocumento(true);
    setValue('documento_url', null, { shouldDirty: true });
  };

  return (
    <ScrollView
      style={styles.contenedor}
      contentContainerStyle={styles.scroll}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.titulo}>Editar Proyecto de Tesis</Text>
      <Text style={styles.subtitulo}>ESFOT — Tecnología Superior en Desarrollo de Software</Text>

      <View style={styles.campoContenedor}>
        <Text style={styles.etiqueta}>Título del Proyecto *</Text>
        <Controller
          name="titulo"
          control={control}
          rules={{
            required: { value: true, message: 'El título es obligatorio' },
            minLength: { value: 5, message: 'El título debe tener al menos 5 caracteres' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AnimatedTextInput
              style={styles.input}
              placeholder="Ej: Sistema de gestión de inventarios para PYMES"
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.titulo}
            />
          )}
        />
        {errors.titulo && <Text style={styles.textoError}>{errors.titulo.message}</Text>}
      </View>

      <View style={styles.campoContenedor}>
        <Text style={styles.etiqueta}>Descripción</Text>
        <Controller
          name="descripcion"
          control={control}
          rules={{
            required: { value: true, message: 'La descripción es obligatoria' },
            minLength: { value: 20, message: 'La descripción debe tener al menos 20 caracteres' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AnimatedTextInput
              style={[styles.input, styles.inputMultiline]}
              placeholder="Describe brevemente el objetivo del proyecto..."
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
              numberOfLines={3}
              error={!!errors.descripcion}
            />
          )}
        />
        {errors.descripcion && <Text style={styles.textoError}>{errors.descripcion.message}</Text>}
      </View>

      <View style={styles.campoContenedor}>
        <Text style={styles.etiqueta}>Autores * (separa con comas)</Text>
        <Controller
          name="autores"
          control={control}
          rules={{
            required: { value: true, message: 'Los autores son obligatorios' },
            pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s,]+$/, message: 'Solo se permiten letras, espacios y comas' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AnimatedTextInput
              style={styles.input}
              placeholder="Ej: Ana Torres, Luis Pérez"
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.autores}
            />
          )}
        />
        {errors.autores && <Text style={styles.textoError}>{errors.autores.message}</Text>}
      </View>

      <View style={styles.campoContenedor}>
        <Text style={styles.etiqueta}>Tutor Docente *</Text>
        <Controller
          name="tutor_docente"
          control={control}
          rules={{
            required: { value: true, message: 'El tutor docente es obligatorio' },
            pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]+$/, message: 'Solo letras, espacios y puntos' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AnimatedTextInput
              style={styles.input}
              placeholder="Ej: Ing. Juan Carlos Gonzalez Msc."
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.tutor_docente}
            />
          )}
        />
        {errors.tutor_docente && <Text style={styles.textoError}>{errors.tutor_docente.message}</Text>}
      </View>

      <View style={styles.campoContenedor}>
        <Text style={styles.etiqueta}>Tecnologías Utilizadas * (separa con comas)</Text>
        <Controller
          name="tecnologias_utilizadas"
          control={control}
          rules={{ required: { value: true, message: 'Las tecnologías son obligatorias' } }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AnimatedTextInput
              style={styles.input}
              placeholder="Ej: React Native, Node.js, PostgreSQL, AWS"
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.tecnologias_utilizadas}
            />
          )}
        />
        {errors.tecnologias_utilizadas && <Text style={styles.textoError}>{errors.tecnologias_utilizadas.message}</Text>}
      </View>

      <View style={styles.campoContenedor}>
        <Text style={styles.etiqueta}>Fecha de Inicio *</Text>
        <Controller
          name="fecha_inicio"
          control={control}
          rules={{ required: 'Obligatorio', validate: validarFechaEstricta }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TouchableOpacity
                style={[styles.input, errors.fecha_inicio && styles.inputError]}
                onPress={() => openDatePicker('fecha_inicio')}
              >
                <Text style={value ? styles.inputText : styles.placeholderText}>
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
        {errors.fecha_inicio && <Text style={styles.textoError}>{errors.fecha_inicio.message}</Text>}
      </View>

      <View style={styles.campoContenedor}>
        <Text style={styles.etiqueta}>Fecha de Fin</Text>
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
                style={[styles.input, errors.fecha_fin && styles.inputError]}
                onPress={() => openDatePicker('fecha_fin')}
              >
                <Text style={value ? styles.inputText : styles.placeholderText}>
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
        {errors.fecha_fin && <Text style={styles.textoError}>{errors.fecha_fin.message}</Text>}
      </View>

      <View style={styles.campoContenedor}>
        <Text style={styles.etiqueta}>Repositorio GitHub</Text>
        <Controller
          name="repositorio_github"
          control={control}
          rules={{ required: { value: true, message: 'El repositorio es obligatorio' } }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AnimatedTextInput
              style={styles.input}
              placeholder="https://github.com/usuario/repositorio"
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="url"
              autoCapitalize="none"
              error={!!errors.repositorio_github}
            />
          )}
        />
        {errors.repositorio_github && <Text style={styles.textoError}>{errors.repositorio_github.message}</Text>}
      </View>

      <View style={styles.campoContenedor}>
        <Text style={styles.etiqueta}>Documento PDF</Text>
        {proyectoInicial.documento_url && !eliminarDocumento && !nuevoDocumento && (
          <View style={styles.documentoContainer}>
            <Text style={styles.documentoTexto}>Documento actual disponible</Text>
            <TouchableOpacity style={styles.botonEliminar} onPress={handleEliminarDocumento}>
              <Text style={styles.botonEliminarTexto}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        {nuevoDocumento && (
          <View style={styles.documentoContainer}>
            <Text style={styles.documentoTexto}>Nuevo: {nuevoDocumento.name}</Text>
            <TouchableOpacity style={styles.botonEliminar} onPress={() => setNuevoDocumento(null)}>
              <Text style={styles.botonEliminarTexto}>Quitar</Text>
            </TouchableOpacity>
          </View>
        )}
        {eliminarDocumento && (
          <Text style={styles.documentoEliminado}>Documento será eliminado al guardar</Text>
        )}
        {!nuevoDocumento && (eliminarDocumento || !proyectoInicial.documento_url) && (
          <TouchableOpacity style={styles.botonSubir} onPress={pickDocument}>
            <Text style={styles.botonSubirTexto}>Subir PDF</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.campoContenedor}>
        <Text style={styles.etiqueta}>Estado del Proyecto</Text>
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
                    value === est && styles.estadoBotonActivo,
                  ]}
                  onPress={() => onChange(est)}
                >
                  <Text style={[
                    styles.estadoTexto,
                    value === est && styles.estadoTextoActivo,
                  ]}>{est}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
      </View>

      <GlitchView trigger={errorGlitch} style={{ marginTop: 10 }} borderRadius={10}>
        <TouchableOpacity
          style={[styles.botonGuardar, cargando && styles.botonDeshabilitado]}
          
          onPress={handleSubmit(onSubmit, triggerErrorGlitch)}
          disabled={cargando}
        >
          {cargando
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.botonTexto}>Guardar Cambios</Text>
          }
        </TouchableOpacity>
      </GlitchView>

      
      <EmojiExplosion trigger={mostrarExito} emojis={EMOJIS_EXITO} />
      
      <EmojiExplosion trigger={mostrarError} emojis={EMOJIS_ERROR} />
    </ScrollView>
  );
}

const AZUL = '#1A3A5C';
const AZUL_CLARO = '#2E6DA4';

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#F5F7FA' },
  scroll: { padding: 20, paddingBottom: 40 },
  titulo: { fontSize: 22, fontWeight: '700', color: AZUL, marginBottom: 4 },
  subtitulo: { fontSize: 13, color: '#666', marginBottom: 24 },
  campoContenedor: { marginBottom: 16 },
  etiqueta: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 6 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDE2E8',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    fontSize: 15,
    color: '#1A1A1A',
  },
  inputMultiline: { height: 80, textAlignVertical: 'top', paddingTop: 10 },
  inputError: { borderColor: '#E74C3C', borderWidth: 1.5 },
  textoError: { color: '#E74C3C', fontSize: 12, marginTop: 4 },
  inputText: { fontSize: 15, color: '#1A1A1A' },
  placeholderText: { fontSize: 15, color: '#999' },
  estadoContenedor: { flexDirection: 'row', gap: 10 },
  estadoBoton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDE2E8',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  estadoBotonActivo: { backgroundColor: AZUL_CLARO, borderColor: AZUL_CLARO },
  estadoTexto: { fontSize: 13, color: '#555' },
  estadoTextoActivo: { color: '#fff', fontWeight: '700' },
  botonGuardar: {
    backgroundColor: AZUL,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  botonDeshabilitado: { opacity: 0.6 },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: '700' },
  documentoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDE2E8',
    marginBottom: 8,
  },
  documentoTexto: { fontSize: 14, color: '#333' },
  documentoEliminado: { color: '#E74C3C', fontSize: 14, fontStyle: 'italic' },
  botonEliminar: {
    backgroundColor: '#E74C3C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  botonEliminarTexto: { color: '#fff', fontSize: 13, fontWeight: '600' },
  botonSubir: {
    backgroundColor: '#1A3A5C',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonSubirTexto: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
