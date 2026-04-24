import React from "react";
import { View, StyleSheet, Alert } from "react-native";
// ======================
// MÓDULO DE EXPORTACIÓN PDF
// ======================
// Importamos expo-print para generar archivos PDF a partir de HTML
// Importamos expo-sharing para abrir el menú nativo de compartir del dispositivo (email, redes sociales, etc.)
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useCVContext } from "../context/CVContext";
import { CVPreview } from "../components/CVPreview";
import { NavigationButton } from "../components/NavigationButton";
import { EPNColors } from "../constants/theme";
import { generatePDFHtml } from "../utils/pdfGenerator";

export default function PreviewScreen() {
    const { cvData } = useCVContext();

    // =============================================
// FUNCIÓN: Exportar y Compartir PDF
// =============================================
// Esta función coordina todo el proceso de exportación:
// 1. Genera el HTML con los datos del CV (personal, experiencia, educación, habilidades)
// 2. Convierte ese HTML a un archivo PDF usando expo-print
// 3. Comparte el PDF generado usando el menú nativo del sistema operativo
// =============================================
    const exportAndSharePDF = async () => {
        try {
            const html = generatePDFHtml(cvData);
            const { uri } = await Print.printToFileAsync({ html });
            
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri);
            } else {
                Alert.alert("Éxito", `PDF generado en: ${uri}`);
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo generar el PDF. Intenta de nuevo.");
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <CVPreview cvData={cvData} />
            <View style={styles.buttonContainer}>
                <NavigationButton
                    title="Exportar y Compartir PDF"
                    onPress={exportAndSharePDF}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: EPNColors.white,
    },
    buttonContainer: {
        padding: 20,
        backgroundColor: EPNColors.white,
        borderTopWidth: 1,
        borderTopColor: EPNColors.border,
    }
});