import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { CVData } from "../types/cv.types";
import { EPNColors } from "../constants/theme";

interface CVPreviewProps {
  cvData: CVData;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ cvData }) => {
  const { personalInfo, experiences, education } = cvData;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={require("../assets/images/epn-shield.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.name}>
            {personalInfo.fullName || "Tu Nombre"}
          </Text>
          <View style={styles.contactInfo}>
            {personalInfo.email && (
              <Text style={styles.contactText}>📧 {personalInfo.email}</Text>
            )}
            {personalInfo.phone && (
              <Text style={styles.contactText}>📱 {personalInfo.phone}</Text>
            )}
            {personalInfo.location && (
              <Text style={styles.contactText}>📍 {personalInfo.location}</Text>
            )}
          </View>
        </View>

        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>RESUMEN PROFESIONAL</Text>
            <Text style={styles.summaryText}>{personalInfo.summary}</Text>
          </View>
        )}

        {experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EXPERIENCIA LABORAL</Text>
            {experiences.map((exp) => (
              <View key={exp.id} style={styles.item}>
                <Text style={styles.itemTitle}>{exp.position}</Text>
                <Text style={styles.itemSubtitle}>{exp.company}</Text>
                <Text style={styles.itemDate}>
                  {exp.startDate} - {exp.endDate || "Actual"}
                </Text>
                {exp.description && (
                  <Text style={styles.itemDescription}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCACIÓN</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.item}>
                <Text style={styles.itemTitle}>{edu.degree}</Text>
                {edu.field && (
                  <Text style={styles.itemSubtitle}>{edu.field}</Text>
                )}
                <Text style={styles.itemInstitution}>{edu.institution}</Text>
                {edu.graduationYear && (
                  <Text style={styles.itemDate}>{edu.graduationYear}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {!personalInfo.fullName &&
          experiences.length === 0 &&
          education.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                No hay información para mostrar.{"\n"}
                Completa las secciones para ver tu CV.
              </Text>
            </View>
          )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: EPNColors.white,
  },
  content: {
    padding: 20,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: EPNColors.primary,
    paddingBottom: 16,
    marginBottom: 24,
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: EPNColors.secondary,
    marginBottom: 12,
    textAlign: "center",
  },
  contactInfo: {
    gap: 4,
  },
  contactText: {
    fontSize: 14,
    color: EPNColors.textSecondary,
    marginBottom: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: EPNColors.primary,
    marginBottom: 12,
    letterSpacing: 1,
  },
  summaryText: {
    fontSize: 14,
    color: EPNColors.textPrimary,
    lineHeight: 20,
  },
  item: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: EPNColors.border,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: EPNColors.secondary,
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: EPNColors.textSecondary,
    marginBottom: 4,
  },
  itemInstitution: {
    fontSize: 14,
    color: EPNColors.textSecondary,
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 12,
    color: EPNColors.textSecondary,
    fontStyle: "italic",
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 13,
    color: EPNColors.textPrimary,
    lineHeight: 18,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: EPNColors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
});