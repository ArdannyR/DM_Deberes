import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { EPNColors } from "../constants/theme";

interface NavigationButtonProps {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "danger";
    style?: ViewStyle;
}

export const NavigationButton = ({ 
    title, 
    onPress, 
    variant = "primary",
    style 
}: NavigationButtonProps) => {
    return (
        <TouchableOpacity
            style={[styles.button, styles[variant], style]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text 
                style={[styles.text, variant === "secondary" && styles.textSecondary]} 
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 8,
    }, primary: {
        backgroundColor: EPNColors.primary,
    }, secondary: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: EPNColors.secondary,
    }, danger: {
        backgroundColor: EPNColors.error,
    }, text: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    }, textSecondary: {
        color: EPNColors.secondary,
    },
});