import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { ListaProyectos } from '@features/lista-proyectos/ui/ListaProyectos';
import { useProyectos } from '@entities/proyecto-tesis/model/useProyectos';
import { useTheme } from '@shared/context/ThemeContext';

export function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { proyectos, loading } = useProyectos();
  const { colors } = useTheme();

  return (
    <View style={[styles.contenedor, { backgroundColor: colors.background }]}>
      <View style={[styles.headerContainer, { backgroundColor: colors.card, shadowColor: colors.text }]}>
        <Image source={require('../../../../assets/images/esfot-shield-removebg-preview.png')} style={styles.logo} resizeMode="contain" />
        <View>
          <Text style={[styles.headerTitle, { color: colors.primary }]}>Proyectos de Tesis</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textMuted }]}>ESFOT - EPN</Text>
        </View>
      </View>
      <TextInput
        style={[styles.searchInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
        placeholder="Buscar proyectos..."
        placeholderTextColor={colors.textMuted}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      ) : proyectos.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.textMuted }]}>No hay proyectos registrados</Text>
      ) : (
        <ListaProyectos searchQuery={searchQuery} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1 },
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginBottom: 12,
  },
  logo: { width: 160, height: 72, marginBottom: 10 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 3 },
  headerSubtitle: { fontSize: 14, fontWeight: '600', textAlign: 'center' },
  searchInput: {
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
  loader: { marginTop: 50 },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16 },
});