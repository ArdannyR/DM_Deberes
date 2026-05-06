import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import type { ProyectoTesis } from '@entities/proyecto-tesis/model/types';
import { proyectoApi } from '@entities/proyecto-tesis/api/proyectoApi';
import { EmojiExplosion } from '@shared/ui/EmojiExplosion';
import { GlitchView } from '@shared/ui/GlitchView';

const EMOJIS_ELIMINAR = ['🗑️', '💨', '💥', '👋', '🧹', '🔥'];
const C = {
  primary: '#0C2340',
  card: '#FFFFFF',
  text: '#1A1A1A',
  textMuted: '#666666',
  textSecondary: '#444444',
  secondary: '#E74C3C',
} as const;

const BADGE_COLOR: Record<string, string> = {
  'En Progreso': '#3498DB',
  'Completado': '#27AE60',
  'Suspendido': '#E74C3C',
};

interface Props {
  proyecto: ProyectoTesis;
  index?: number;
  onDeleteSuccess?: () => void;
}

export function ProyectoCard({ proyecto, index = 0, onDeleteSuccess }: Props) {
  const router = useRouter();
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);


  const abrirRepo = () => {
    if (proyecto.repositorio_github)
      Linking.openURL(proyecto.repositorio_github);
  };

  const handleDelete = async () => {
    Alert.alert(
      'Eliminar Proyecto',
      '¿Estás seguro de que deseas eliminar este proyecto? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
           onPress: () => {
            
            setMostrarEliminar(true);
            
            setIsGlitching(true);
            
            setTimeout(async () => {
              try {
                await proyectoApi.delete(proyecto.id);
                onDeleteSuccess?.();
              } catch (error) {
                setIsGlitching(false);
                Alert.alert('Error', 'No se pudo eliminar el proyecto.');
              }
            }, 250);
          },
        },
      ]
    );
  };

  return (
    
    <Animated.View entering={FadeInDown.duration(500).delay(index * 500)}>
      
      <GlitchView trigger={isGlitching} style={{ marginBottom: 8 }} borderRadius={12}>
        <TouchableOpacity
          style={[styles.tarjeta, { backgroundColor: C.card, shadowColor: C.text }]}
          onPress={() => router.push(`/proyecto/${proyecto.id}`)}
          activeOpacity={0.7}
        >
          <View style={styles.encabezado}>
            <Text style={[styles.titulo, { color: C.primary }]} numberOfLines={2}>{proyecto.titulo}</Text>
            <View style={[styles.badge, { backgroundColor: BADGE_COLOR[proyecto.estado] }]}>
              <Text style={styles.badgeTexto}>{proyecto.estado}</Text>
            </View>
          </View>

          <Text style={[styles.etiqueta, { color: C.textMuted }]}>Autores</Text>
          <Text style={[styles.valor, { color: C.textSecondary }]}>{proyecto.autores}</Text>

          <Text style={[styles.etiqueta, { color: C.textMuted }]}>Tutor Docente</Text>
          <Text style={[styles.valor, { color: C.textSecondary }]}>{proyecto.tutor_docente}</Text>

          <Text style={[styles.etiqueta, { color: C.textMuted }]}>Tecnologías</Text>
          <Text style={[styles.valor, { color: C.textSecondary }]}>{proyecto.tecnologias_utilizadas}</Text>

          <View style={styles.filaFechas}>
            <View style={styles.fecha}>
              <Text style={[styles.etiqueta, { color: C.textMuted }]}>Inicio</Text>
              <Text style={[styles.valor, { color: C.textSecondary }]}>{proyecto.fecha_inicio}</Text>
            </View>
            {proyecto.fecha_fin && (
              <View style={styles.fecha}>
                <Text style={[styles.etiqueta, { color: C.textMuted }]}>Fin</Text>
                <Text style={[styles.valor, { color: C.textSecondary }]}>{proyecto.fecha_fin}</Text>
              </View>
            )}
          </View>

          <View style={styles.filaBotones}>
            {proyecto.repositorio_github && (
              <TouchableOpacity style={[styles.repoBoton, { backgroundColor: '#EBF5FB' }]} onPress={abrirRepo}>
                <Text style={[styles.repoTexto, { color: C.primary }]}>Ver en GitHub →</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.eliminarBoton, { backgroundColor: '#FDEEEE' }]} onPress={handleDelete}>
              <Text style={[styles.eliminarTexto, { color: C.secondary }]}>Eliminar Proyecto</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        
        <EmojiExplosion trigger={mostrarEliminar} emojis={EMOJIS_ELIMINAR} />
      </GlitchView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    borderRadius: 12,
    padding: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  encabezado: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 8
  },
  titulo: { fontSize: 14, fontWeight: '700', flex: 1, marginRight: 8 },
  badge: { paddingHorizontal: 6, paddingVertical: 3, borderRadius: 12 },
  badgeTexto: { color: '#fff', fontSize: 10, fontWeight: '700' },
  etiqueta: { fontSize: 10, fontWeight: '600', marginTop: 6 },
  valor: { fontSize: 12, marginTop: 1 },
  filaFechas: { flexDirection: 'row', gap: 16 },
  fecha: { flex: 1 },
  filaBotones: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  repoBoton: {
    paddingVertical: 6, paddingHorizontal: 10,
    borderRadius: 8,
  },
  repoTexto: { fontSize: 12, fontWeight: '600' },
  eliminarBoton: {
    paddingVertical: 8, paddingHorizontal: 10,
    borderRadius: 8,
  },
  eliminarTexto: { fontSize: 12, fontWeight: '600' },
});