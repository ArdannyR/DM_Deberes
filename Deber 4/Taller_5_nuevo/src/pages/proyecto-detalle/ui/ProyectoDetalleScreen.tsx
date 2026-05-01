import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { proyectoApi } from '@entities/proyecto-tesis/api/proyectoApi';
import type { ProyectoTesis } from '@entities/proyecto-tesis/model/types';
import { useTheme } from '@shared/context/ThemeContext';

export function ProyectoDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [proyecto, setProyecto] = useState<ProyectoTesis | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      if (!id) {
        setError('ID de proyecto no proporcionado');
        setCargando(false);
        return;
      }

      setCargando(true);
      setError(null);

      try {
        const data = await proyectoApi.getById(id);
        setProyecto(data);
      } catch (e) {
        const mensaje = e instanceof Error ? e.message : 'Error desconocido';
        setError(mensaje);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, [id]);

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#1A3A5C" />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.error}>Error: {error}</Text>;
  }

  if (!proyecto) {
    return <Text style={styles.error}>Proyecto no encontrado</Text>;
  }

  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.contenedor, { backgroundColor: colors.background }]}>
      <View style={[styles.seccion, { backgroundColor: colors.card }]}>
        <Text style={[styles.titulo, { color: colors.primary }]}>{proyecto.titulo}</Text>
      </View>

      <View style={[styles.seccion, { backgroundColor: colors.card }]}>
        <Text style={[styles.etiqueta, { color: colors.textMuted }]}>Autores</Text>
        <Text style={[styles.valor, { color: colors.textSecondary }]}>{proyecto.autores}</Text>
      </View>

      <View style={[styles.seccion, { backgroundColor: colors.card }]}>
        <Text style={[styles.etiqueta, { color: colors.textMuted }]}>Tutor Docente</Text>
        <Text style={[styles.valor, { color: colors.textSecondary }]}>{proyecto.tutor_docente}</Text>
      </View>

      <View style={[styles.seccion, { backgroundColor: colors.card }]}>
        <Text style={[styles.etiqueta, { color: colors.textMuted }]}>Descripción</Text>
        <Text style={[styles.resumen, { color: colors.textSecondary }]}>{proyecto.descripcion}</Text>
      </View>

      <View style={[styles.fila, { backgroundColor: colors.card }]}>
        <View style={styles.columna}>
          <Text style={[styles.etiqueta, { color: colors.textMuted }]}>Fecha de Inicio</Text>
          <Text style={[styles.valor, { color: colors.textSecondary }]}>{proyecto.fecha_inicio}</Text>
        </View>

        {proyecto.fecha_fin && (
          <View style={styles.columna}>
            <Text style={[styles.etiqueta, { color: colors.textMuted }]}>Fecha de Fin</Text>
            <Text style={[styles.valor, { color: colors.textSecondary }]}>{proyecto.fecha_fin}</Text>
          </View>
        )}
      </View>

      <View style={[styles.seccion, { backgroundColor: colors.card }]}>
        <Text style={[styles.etiqueta, { color: colors.textMuted }]}>Estado</Text>
        <Text style={[styles.valor, { color: colors.textSecondary }]}>{proyecto.estado}</Text>
      </View>

      {proyecto.repositorio_github && (
        <View style={[styles.seccion, { backgroundColor: colors.card }]}>
          <Text style={[styles.etiqueta, { color: colors.textMuted }]}>Repositorio GitHub</Text>
          <Text style={[styles.link, { color: colors.primary }]}>{proyecto.repositorio_github}</Text>
        </View>
      )}

      {proyecto.documento_url && (
        <View style={[styles.seccion, { backgroundColor: colors.card }]}>
          <Text style={[styles.etiqueta, { color: colors.textMuted }]}>Documento PDF</Text>
          <TouchableOpacity
            style={[styles.botonPDF, { backgroundColor: colors.primary }]}
            onPress={() => {
              const googleViewerUrl = 'https://docs.google.com/viewer?url=' + encodeURIComponent(proyecto.documento_url!);
              Linking.openURL(googleViewerUrl);
            }}
          >
            <Text style={styles.botonPDFTexto}>Ver Documento PDF</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={[styles.seccion, { backgroundColor: colors.card }]}>
        <Text style={[styles.etiqueta, { color: colors.textMuted }]}>Tecnologías</Text>
        <Text style={[styles.valor, { color: colors.textSecondary }]}>{proyecto.tecnologias_utilizadas}</Text>
      </View>

      <TouchableOpacity
        style={[styles.botonEditar, { backgroundColor: colors.primary }]}
        onPress={() => router.push(`/proyecto/editar/${proyecto.id}`)}
      >
        <Text style={styles.botonEditarTexto}>Editar Proyecto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
  },
  seccion: {
    padding: 16,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
  },
  etiqueta: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  valor: {
    fontSize: 16,
  },
  resumen: {
    fontSize: 15,
    lineHeight: 22,
  },
  fila: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 8,
  },
  columna: {
    flex: 1,
  },
  link: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  botonEditar: {
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  botonEditarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  botonPDF: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  botonPDFTexto: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});