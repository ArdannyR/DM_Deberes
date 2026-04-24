import { CVData } from "../types/cv.types";

export const generatePDFHtml = (cvData: CVData): string => {
    const { personalInfo, experiences, education, skills } = cvData;

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; }
                .header { text-align: center; border-bottom: 3px solid #1a3c6e; padding-bottom: 20px; margin-bottom: 30px; }
                .header h1 { font-size: 28px; color: #1a3c6e; margin-bottom: 10px; }
                .header .contact { font-size: 14px; color: #666; line-height: 1.6; }
                .section { margin-bottom: 30px; }
                .section h2 { font-size: 16px; color: #1a3c6e; border-bottom: 2px solid #1a3c6e; padding-bottom: 8px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }
                .summary { font-size: 14px; line-height: 1.6; color: #444; }
                .item { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
                .item:last-child { border-bottom: none; }
                .item h3 { font-size: 16px; color: #222; margin-bottom: 4px; }
                .item .subtitle { font-size: 14px; color: #666; margin-bottom: 4px; }
                .item .institution { font-size: 14px; color: #555; margin-bottom: 4px; }
                .item .date { font-size: 12px; color: #888; font-style: italic; margin-bottom: 6px; }
                .item .description { font-size: 13px; color: #444; line-height: 1.5; }
                .skills-grid { display: flex; flex-wrap: wrap; gap: 10px; }
                .skill-item { background: #f5f5f5; padding: 8px 16px; border-radius: 20px; display: flex; align-items: center; gap: 8px; }
                .skill-name { font-size: 14px; color: #333; }
                .skill-level { font-size: 11px; color: #1a3c6e; font-weight: 600; }
                .empty { text-align: center; color: #999; font-style: italic; padding: 20px; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>${personalInfo.fullName || "Mi CV"}</h1>
                <div class="contact">
                    ${personalInfo.email ? `<div>📧 ${personalInfo.email}</div>` : ""}
                    ${personalInfo.phone ? `<div>📱 ${personalInfo.phone}</div>` : ""}
                    ${personalInfo.location ? `<div>📍 ${personalInfo.location}</div>` : ""}
                </div>
            </div>

            ${personalInfo.summary ? `
                <div class="section">
                    <h2>Resumen Profesional</h2>
                    <p class="summary">${personalInfo.summary}</p>
                </div>
            ` : ""}

            <div class="section">
                <h2>Experiencia Laboral</h2>
                ${experiences.length > 0 ? experiences.map(exp => `
                    <div class="item">
                        <h3>${exp.position}</h3>
                        <div class="subtitle">${exp.company}</div>
                        <div class="date">${exp.startDate} - ${exp.endDate || "Actual"}</div>
                        ${exp.description ? `<div class="description">${exp.description}</div>` : ""}
                    </div>
                `).join("") : '<div class="empty">No hay experiencia agregada</div>'}
            </div>

            <div class="section">
                <h2>Educación</h2>
                ${education.length > 0 ? education.map(edu => `
                    <div class="item">
                        <h3>${edu.degree}</h3>
                        ${edu.field ? `<div class="subtitle">${edu.field}</div>` : ""}
                        <div class="institution">${edu.institution}</div>
                        ${edu.graduationYear ? `<div class="date">${edu.graduationYear}</div>` : ""}
                    </div>
                `).join("") : '<div class="empty">No hay educación agregada</div>'}
            </div>

            ${skills.length > 0 ? `
                <div class="section">
                    <h2>Habilidades</h2>
                    <div class="skills-grid">
                        ${skills.map(skill => `
                            <div class="skill-item">
                                <span class="skill-name">${skill.name}</span>
                                <span class="skill-level">${skill.level}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            ` : ""}
        </body>
        </html>
    `;
};