# Partes del deber

## Parte 1 - Pasos a realizar en Supabase

1. Ve a la página web de Supabase e ingresa al panel de tu proyecto.
2. En el menú lateral izquierdo, haz clic en **Authentication** (icono de usuarios).
3. Dirígete a la sección **Providers** (Proveedores) bajo "Configuration".
4. Selecciona **Email** y asegúrate de que esté habilitado ("Enable Email provider").
5. **Recomendación para desarrollo:** Desactiva la opción **Confirm email** para no tener que confirmar correos electrónicos reales cada vez que crees un usuario de prueba.
6. Ve a la pestaña **Users** (dentro de Authentication) y haz clic en **Add User** → **Create new user** para crear un usuario de prueba con correo y contraseña.
7. **Opcional pero recomendado (Políticas RLS):** Habilita **RLS** (Row Level Security) en tu tabla de proyectos y crea una política que permita el acceso solo a usuarios autenticados.

## Parte 2 - Configurar Storage en Supabase

1. En el menú lateral izquierdo, haz clic en **Storage**.
2. Haz clic en **New Bucket** y nómbralo (ej: `documentos`).
3. Marca la opción **"Public bucket"** para facilitar la visualización y descarga de archivos.
4. Ve a **Policies** bajo "Configuration" en el menú de Storage.
5. En el bucket, haz clic en **New Policy** bajo "Insert" y "Select".
6. Usa el asistente rápido para permitir que usuarios autenticados puedan subir y leer archivos.
