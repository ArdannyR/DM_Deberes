// src/features/registro-proyecto/api/createProyecto.ts
import { proyectoApi } from "@entities/proyecto-tesis/api/proyectoApi";
import type { CreateProyectoDto } from "@entities/proyecto-tesis/model/types";
import { supabase } from "@shared/api/supabase";
import * as FileSystem from 'expo-file-system/legacy';
import { decode } from 'base64-arraybuffer';

export interface ValidationError {
  field: keyof CreateProyectoDto;
  message: string;
}

/** Valida el formulario antes de enviar a Supabase */
export function validateProyecto(
  dto: Partial<CreateProyectoDto>,
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!dto.titulo?.trim())
    errors.push({ field: "titulo", message: "El título es obligatorio" });

  if (!dto.autores?.trim())
    errors.push({ field: "autores", message: "Ingresa al menos un autor" });

  if (!dto.tutor_docente?.trim())
    errors.push({
      field: "tutor_docente",
      message: "El tutor docente es obligatorio",
    });

  if (!dto.tecnologias_utilizadas?.trim())
    errors.push({
      field: "tecnologias_utilizadas",
      message: "Especifica las tecnologías",
    });

  if (!dto.fecha_inicio?.trim())
    errors.push({
      field: "fecha_inicio",
      message: "La fecha de inicio es obligatoria",
    });

  if (dto.fecha_inicio && !/^\d{4}-\d{2}-\d{2}$/.test(dto.fecha_inicio))
    errors.push({ field: "fecha_inicio", message: "Formato: AAAA-MM-DD" });

  if (dto.repositorio_github && !/^https?:\/\/.+/.test(dto.repositorio_github))
    errors.push({
      field: "repositorio_github",
      message: "Debe ser una URL válida",
    });

  return errors;
}

/** Sube un archivo PDF a Supabase Storage */
export async function uploadDocument(
  fileUri: string,
  fileName: string,
): Promise<string | null> {
  try {
    const fileExt = fileName.split('.').pop();
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: 'base64',
    });

    const { data, error } = await supabase.storage
      .from('documentos_pdf_deber_4')
      .upload(uniqueFileName, decode(base64), {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading file:', error);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('documentos_pdf_deber_4')
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading document:', error);
    return null;
  }
}

/** Crea el proyecto tras validar */
export async function createProyecto(dto: CreateProyectoDto) {
  return proyectoApi.create(dto);
}