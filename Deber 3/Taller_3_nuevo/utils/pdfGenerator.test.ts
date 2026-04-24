import { CVData } from "../types/cv.types";
import { generatePDFHtml } from "./pdfGenerator";

// =============================================
// SUITE DE PRUEBAS UNITARIAS: pdfGenerator
// =============================================
// Este archivo contiene las pruebas unitarias que validan
// que el generador de HTML para el PDF incluye todas las
// secciones esperadas del CV:
// - Información personal (nombre, email)
// - Experiencia laboral
// - Educación
// - Habilidades técnicas
// Si estas pruebas pasan, significa que el PDF generado
// contendrá la estructura correcta del currículum vitae.
// =============================================
describe("pdfGenerator", () => {
    const mockCVData: CVData = {
        personalInfo: {
            fullName: "Juan Pérez",
            email: "juan.perez@example.com",
            phone: "+593 99 123 4567",
            location: "Quito, Ecuador",
            summary: "Desarrollador Mobile con 5 años de experiencia.",
        },
        experiences: [
            {
                id: "1",
                company: "Tech Solutions",
                position: "Senior Developer",
                startDate: "Enero 2020",
                endDate: "Actual",
                description: "Desarrollo de aplicaciones React Native.",
            },
        ],
        education: [
            {
                id: "1",
                institution: "Escuela Politécnica Nacional",
                degree: "Ingeniería en Sistemas",
                field: "Computación",
                graduationYear: "2019",
            },
        ],
        skills: [
            {
                id: "1",
                name: "React Native",
                level: "Avanzado",
            },
        ],
    };

    // =============================================
// PRUEBAS INDIVIDUALES (it)
// =============================================
// Cada test (it) valida un aspecto específico del HTML generado:
// - Test de nombre: Verifica que el nombre del usuario aparezca
// - Test de educación: Verifica que la sección "Educación" esté presente
// - Test de experiencia: Verifica que "Experiencia Laboral" esté presente
// - Test de habilidades: Verifica que "Habilidades" esté presente
// - Tests de datos: Validan que los datos específicos aparezcan en el HTML
// Se usa toContain() para verificar que las palabras/valores existen en el string HTML
// =============================================

    it("debe contener el nombre del usuario", () => {
        const html = generatePDFHtml(mockCVData);
        expect(html).toContain("Juan Pérez");
    });

    it("debe contener la sección de Educación", () => {
        const html = generatePDFHtml(mockCVData);
        expect(html).toContain("Educación");
    });

    it("debe contener la sección de Experiencia", () => {
        const html = generatePDFHtml(mockCVData);
        expect(html).toContain("Experiencia Laboral");
    });

    it("debe contener la sección de Habilidades", () => {
        const html = generatePDFHtml(mockCVData);
        expect(html).toContain("Habilidades");
    });

    it("debe contener los datos de la experiencia", () => {
        const html = generatePDFHtml(mockCVData);
        expect(html).toContain("Tech Solutions");
        expect(html).toContain("Senior Developer");
    });

    it("debe contener los datos de educación", () => {
        const html = generatePDFHtml(mockCVData);
        expect(html).toContain("Escuela Politécnica Nacional");
        expect(html).toContain("Ingeniería en Sistemas");
    });

    it("debe contener los datos de habilidad", () => {
        const html = generatePDFHtml(mockCVData);
        expect(html).toContain("React Native");
        expect(html).toContain("Avanzado");
    });

    it("debe contener el email de contacto", () => {
        const html = generatePDFHtml(mockCVData);
        expect(html).toContain("juan.perez@example.com");
    });

    it("debe contener el resumen profesional", () => {
        const html = generatePDFHtml(mockCVData);
        expect(html).toContain("Desarrollador Mobile con 5 años de experiencia.");
    });
});