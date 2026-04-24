import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, Field } from "@tanstack/react-form";
import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { Skill, SkillLevel } from "../types/cv.types";
import { EPNColors } from "../constants/theme";

interface SkillFormData {
  name: string;
  level: SkillLevel;
}

const SKILL_LEVELS: SkillLevel[] = ["Básico", "Intermedio", "Avanzado", "Experto"];

export default function SkillsScreen() {
  const router = useRouter();
  const { cvData, addSkill, deleteSkill } = useCVContext();

  // =============================================
// useForm DE @TANSTACK/REACT-FORM
// =============================================
// useForm es el hook principal de TanStack Form que gestiona:
// - Estado del formulario (valores actuales de cada campo)
// - Validaciones (reglas definidas en cada Field)
// - Manejo del envío (onSubmit)
// - Reset del formulario después de enviar
// =============================================
  const form = useForm<SkillFormData>({
    defaultValues: {
      name: "",
      level: "Básico",
    },
    // =============================================
// CALLBACK onSubmit - ENVÍO DE DATOS AL CONTEXTO
// =============================================
// Cuando el usuario presiona "Agregar Habilidad":
// 1. Se validan todos los campos automáticamente
// 2. Si todo está OK, se ejecuta este callback
// 3. Creamos un objeto Skill con id único, nombre y nivel
// 4. Llamamos addSkill() para guardar en el contexto global (CVContext)
// 5. Reseteamos el formulario para limpiar los campos
// 6. Mostramos una alerta de éxito al usuario
// =============================================
    onSubmit: async ({ value }) => {
      const newSkill: Skill = {
        id: Date.now().toString(),
        name: value.name,
        level: value.level,
      };
      addSkill(newSkill);
      form.reset();
      Alert.alert("Éxito", "Habilidad agregada correctamente");
    },
  });

  const handleDelete = (id: string) => {
    Alert.alert("Confirmar", "¿Estás seguro de eliminar esta habilidad?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteSkill(id),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Agregar Nueva Habilidad</Text>

        // =============================================
// BLOQUE <Field> - CAMPO DE NOMBRE DE HABILIDAD
// =============================================
// Cada Field representa un campo individual del formulario:
// - "form={form}": Vincula este campo al formulario principal
// - "name": Identificador único del campo
// - "validate": Función que se ejecuta al cambiar el valor para validar
// - children: Renderiza el InputField pasandole:
//   - field.state.value: Valor actual del campo
//   - field.handleChange: Función para actualizar el valor
//   - field.handleBlur: Función para marcar el campo como "tocado"
//   - field.state.meta.errors: Array de errores de validación
// =============================================
        <Field
          form={form}
          name="name"
          validate={(value) => {
            const trimmed = typeof value === "string" ? value.trim() : "";
            return trimmed === "" ? "El nombre de la habilidad es requerido" : undefined;
          }}
        >
          {(field) => (
            <InputField
              label="Habilidad Técnica *"
              placeholder="Ej: JavaScript, React Native"
              value={field.state.value}
              onChangeText={field.handleChange}
              onBlur={field.handleBlur}
              error={field.state.meta.errors?.[0]}
            />
          )}
        </Field>

        <Text style={styles.levelLabel}>Nivel de Habilidad *</Text>
        <Field form={form} name="level">
          {(field) => (
            <View style={styles.levelContainer}>
              {SKILL_LEVELS.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.levelButton,
                    field.state.value === level && styles.levelButtonActive,
                  ]}
                  onPress={() => field.handleChange(level)}
                >
                  <Text
                    style={[
                      styles.levelButtonText,
                      field.state.value === level && styles.levelButtonTextActive,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Field>

        <NavigationButton
          title="Agregar Habilidad"
          onPress={() => form.handleSubmit()}
        />

        {cvData.skills.length > 0 && (
          <>
            <Text style={styles.listTitle}>Habilidades Agregadas</Text>
            {cvData.skills.map((skill) => (
              <View key={skill.id} style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{skill.name}</Text>
                  <Text style={styles.cardSubtitle}>{skill.level}</Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(skill.id)}
                >
                  <Text style={styles.deleteButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        <NavigationButton
          title="Volver"
          onPress={() => router.back()}
          variant="secondary"
          style={{ marginTop: 16 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: EPNColors.background,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: EPNColors.secondary,
    marginBottom: 16,
  },
  levelLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: EPNColors.secondary,
    marginBottom: 8,
  },
  levelContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    gap: 10,
  },
  levelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: EPNColors.secondary,
    backgroundColor: EPNColors.white,
  },
  levelButtonActive: {
    backgroundColor: EPNColors.secondary,
  },
  levelButtonText: {
    fontSize: 14,
    color: EPNColors.secondary,
    fontWeight: "500",
  },
  levelButtonTextActive: {
    color: EPNColors.white,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: EPNColors.secondary,
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    backgroundColor: EPNColors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    shadowColor: EPNColors.secondary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: EPNColors.secondary,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: EPNColors.textSecondary,
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: EPNColors.error,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: EPNColors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});