# CONOCE CHILE

Aplicación turística de Chile construida con Expo SDK 54 y React Native.

## Funciones incluidas
- Catálogo de las 16 regiones de Chile.
- Filtros por zona y búsqueda por región o destino.
- Fichas regionales con destinos destacados.
- Acceso a búsquedas de destinos en Google Maps.
- Interfaz en español, inglés, portugués y francés.

## Antes de compilar
1. Revisa `app.json` y reemplaza `REEMPLAZAR_CON_PROJECT_ID_DE_EXPO` por el ID real del proyecto Expo, o elimina el bloque `extra.eas` y vincula el proyecto con `eas init`.
2. Instala dependencias con `npm install`.
3. Inicia sesión con `eas login`.
4. Ejecuta `eas build -p android --profile preview` para generar un APK.

Las fotografías se cargan desde internet; se necesita conexión para mostrarlas.
