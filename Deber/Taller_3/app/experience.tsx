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
import { DatePickerField } from "../components/DatePickerField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { Experience } from "../types/cv.types";
import { EPNColors } from "../constants/theme";

interface ExperienceFormData {
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | null;
  description: string;
}

const formatDate = (date: Date): string => {
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
};

export default function ExperienceScreen() {
  const router = useRouter();
  const { cvData, addExperience, deleteExperience } = useCVContext();

  const form = useForm<ExperienceFormData>({
    defaultValues: {
      company: "",
      position: "",
      startDate: new Date(),
      endDate: null,
      description: "",
    },
    onSubmit: async ({ value }) => {
      const newExperience: Experience = {
        id: Date.now().toString(),
        company: value.company,
        position: value.position,
        startDate: formatDate(value.startDate),
        endDate: value.endDate ? formatDate(value.endDate) : "Actual",
        description: value.description,
      };
      addExperience(newExperience);
      form.reset();
      Alert.alert("Éxito", "Experiencia agregada correctamente");
    },
  });

  const handleDelete = (id: string) => {
    Alert.alert("Confirmar", "¿Estás seguro de eliminar esta experiencia?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteExperience(id),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Agregar Nueva Experiencia</Text>

        <Field
          form={form}
          name="company"
          validate={(value) => {
            const trimmed = typeof value === "string" ? value.trim() : "";
            return trimmed === "" ? "La empresa es requerida" : undefined;
          }}
        >
          {(field) => (
            <InputField
              label="Empresa *"
              placeholder="Nombre de la empresa"
              value={field.state.value}
              onChangeText={field.handleChange}
              onBlur={field.handleBlur}
              error={field.state.meta.errors?.[0]}
            />
          )}
        </Field>

        <Field
          form={form}
          name="position"
          validate={(value) => {
            const trimmed = typeof value === "string" ? value.trim() : "";
            if (trimmed === "") return "El cargo es requerido";
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(trimmed)) {
              return "Este campo solo debe contener letras";
            }
            return undefined;
          }}
        >
          {(field) => (
            <InputField
              label="Cargo *"
              placeholder="Tu posición"
              value={field.state.value}
              onChangeText={field.handleChange}
              onBlur={field.handleBlur}
              error={field.state.meta.errors?.[0]}
            />
          )}
        </Field>

        <Field
          form={form}
          name="startDate"
          validate={(value) => {
            return !value ? "La fecha de inicio es requerida" : undefined;
          }}
        >
          {(field) => (
            <DatePickerField
              label="Fecha de Inicio *"
              value={field.state.value}
              onChange={field.handleChange}
              error={field.state.meta.errors?.[0]}
            />
          )}
        </Field>

        <Field
          form={form}
          name="endDate"
          validate={(value, formApi) => {
            if (!value) return undefined;
            const startDate = formApi.getFieldValue("startDate");
            if (!startDate) return undefined;
            if (value < startDate) {
              return "La fecha de fin no puede ser anterior a la de inicio";
            }
            return undefined;
          }}
        >
          {(field) => (
            <DatePickerField
              label="Fecha de Fin"
              value={field.state.value || undefined}
              onChange={field.handleChange}
              placeholder="Seleccionar (opcional)"
              error={field.state.meta.errors?.[0]}
            />
          )}
        </Field>

        <Field form={form} name="description">
          {(field) => (
            <InputField
              label="Descripción"
              placeholder="Describe tus responsabilidades y logros..."
              value={field.state.value}
              onChangeText={field.handleChange}
              onBlur={field.handleBlur}
              multiline
              numberOfLines={4}
              style={{ height: 100, textAlignVertical: "top" }}
            />
          )}
        </Field>

        <NavigationButton
          title="Agregar Experiencia"
          onPress={() => form.handleSubmit()}
        />

        {cvData.experiences.length > 0 && (
          <>
            <Text style={styles.listTitle}>Experiencias Agregadas</Text>
            {cvData.experiences.map((exp) => (
              <View key={exp.id} style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{exp.position}</Text>
                  <Text style={styles.cardSubtitle}>{exp.company}</Text>
                  <Text style={styles.cardDate}>
                    {exp.startDate} - {exp.endDate || "Actual"}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(exp.id)}
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
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
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