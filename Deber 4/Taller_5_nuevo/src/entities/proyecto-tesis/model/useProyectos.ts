import { useState, useEffect } from 'react';
import { proyectoApi } from '../api/proyectoApi';
import type { ProyectoTesis } from './types';

export function useProyectos() {
  const [proyectos, setProyectos] = useState<ProyectoTesis[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarProyectos = async () => {
    try {
      setLoading(true);
      const data = await proyectoApi.getAll();
      setProyectos(data);
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProyectos();
  }, []);

  return { proyectos, loading, cargarProyectos };
}
