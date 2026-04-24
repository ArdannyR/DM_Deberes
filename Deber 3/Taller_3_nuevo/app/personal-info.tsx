import React from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Field } from "@tanstack/react-form";
import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { PersonalInfo } from "../types/cv.types";
import { EPNColors } from "../constants/theme";

export default function PersonalInfoScreen() {
    const router = useRouter();
    const { cvData, updatePersonalInfo } = useCVContext();

    const form = useForm<PersonalInfo>({
        defaultValues: cvData.personalInfo,
        onSubmit: async ({ value }) => {
            updatePersonalInfo(value);
            Alert.alert("Éxito", "Información guardada correctamente.", [
                { text: "Ok", onPress: () => router.back() },
            ]);
        },
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Field
                    form={form}
                    name="fullName"
                    validators={{
                        onChange: ({ value }) => {
                            if (!value || value.trim() === "") {
                                return "El nombre es obligatorio";
                            }
                            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
                                return "Este campo solo debe contener letras";
                            }
                            return undefined;
                        },
                    }}
                >
                    {(field) => (
                        <InputField
                            label="Nombre Completo"
                            placeholder="Juan Perez"
                            value={field.state.value}
                            onChangeText={field.handleChange}
                            onBlur={field.handleBlur}
                            error={field.state.meta.errors?.[0]}
                        />
                    )}
                </Field>
                <Field
                    form={form}
                    name="email"
                    validators={{
                        onChange: ({ value }) => {
                            if (!value || value.trim() === "") {
                                return "El email es obligatorio";
                            }
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Ingresa un email válido";
                            }
                            return undefined;
                        },
                    }}
                >
                    {(field) => (
                        <InputField
                            label="Email"
                            placeholder="juan.perez@example.com"
                            value={field.state.value}
                            onChangeText={field.handleChange}
                            onBlur={field.handleBlur}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            error={field.state.meta.errors?.[0]}
                        />
                    )}
                </Field>
                <Field
                    form={form}
                    name="phone"
                    validators={{
                        onChange: ({ value }) => {
                            if (value && !/^[\d\s+]+$/.test(value)) {
                                return "Formato de teléfono no válido";
                            }
                            return undefined;
                        },
                    }}
                >
                    {(field) => (
                        <InputField
                            label="Teléfono"
                            placeholder="+593 99 999 9999"
                            value={field.state.value}
                            onChangeText={field.handleChange}
                            onBlur={field.handleBlur}
                            keyboardType="phone-pad"
                            error={field.state.meta.errors?.[0]}
                        />
                    )}
                </Field>
                <Field
                    form={form}
                    name="location"
                >
                    {(field) => (
                        <InputField
                            label="Ubicación"
                            placeholder="Quito, Ecuador"
                            value={field.state.value}
                            onChangeText={field.handleChange}
                            onBlur={field.handleBlur}
                            error={field.state.meta.errors?.[0]}
                        />
                    )}
                </Field>
                <Field
                    form={form}
                    name="summary"
                >
                    {(field) => (
                        <InputField
                            label="Resumen Profesional"
                            placeholder="Describe brevemente tu perfil laboral..."
                            value={field.state.value}
                            onChangeText={field.handleChange}
                            onBlur={field.handleBlur}
                            multiline
                            numberOfLines={4}
                            style={{ height: 100, textAlignVertical: "top" }}
                            error={field.state.meta.errors?.[0]}
                        />
                    )}
                </Field>
                <NavigationButton
                    title="Guardar Información"
                    onPress={() => form.handleSubmit()}
                />
                <NavigationButton
                    title="Cancelar"
                    onPress={() => router.back()}
                    variant="secondary"
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
    }
});