import React from "react";
import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";
import { EPNColors } from "../constants/theme";

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export const InputField = ({ label, error, ...props }: InputFieldProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholderTextColor={EPNColors.placeholder}
                {...props}
            />            
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    }, label: {
        fontSize: 16,
        fontWeight: "600",
        color: EPNColors.secondary,
        marginBottom: 8,
    }, input: {
        borderWidth: 1,
        borderColor: EPNColors.border,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: EPNColors.white,
        color: EPNColors.textPrimary,
    }, inputError: {
        borderColor: EPNColors.error,
    }, errorText: {
        color: EPNColors.error,
        fontSize: 12,
        marginTop: 4,
    }
});