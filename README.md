# Prueba-Tecnica-Ecommerce

## Descripción del Proyecto
Este es un proyecto de comercio electrónico de productos relacionados con el mundo del K POP, este sistema permite a los usuarios explorar productos, añadirlos a un carrito de compras y comprarlos. El sistema incluye un frontend desarrollado con Next.js y un backend construido con Node.js, Express y Prisma para la gestión de la base de datos.

## Tecnologías Utilizadas
### Frontend
- **Next.js**: Framework de React para aplicaciones web.
- **JavaScript**: Lenguaje principal para el desarrollo del frontend.
- **Bootstrap**: Para el diseño y estilos.

### Backend
- **Node.js**: Entorno de ejecución para JavaScript.
- **Express.js**: Framework para construir APIs REST.
- **Prisma**: ORM para la gestión de la base de datos.
- **PostgreSQL**: Base de datos relacional.

## Instrucciones para Ejecutar el Proyecto

### Configuración Inicial
1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>
   ```

2. Asegúrate de tener instalados:
   - Node.js (v16 o superior)
   - PostgreSQL

### Backend
1. Ve al directorio del backend:
   ```bash
   cd backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Crea un archivo `.env` en el directorio `backend` con el siguiente contenido:
     ```
     DATABASE_URL=postgresql://<USUARIO>:<CONTRASEÑA>@<HOST>:<PUERTO>/<NOMBRE_BASE_DE_DATOS>
     ```

4. Ejecuta las migraciones de la base de datos (esto creará las tablas necesarias para trabajar). Puedes consultar más detalles en la sección [Scripts de Configuración](#scripts-de-configuración):
   ```bash
   npx prisma migrate dev
   ```

5. Utiliza un administrador de base de datos como pgAdmin u otro de tu preferencia para ejecutar el archivo `insert-products.sql`, ubicado en la raíz del proyecto. Este archivo insertará los productos iniciales en la base de datos.

6. Inicia el servidor:
   ```bash
   npm run dev
   ```
   El backend estará disponible en `http://localhost:4000`.


### Frontend
1. Ve al directorio del frontend:
   ```bash
   cd frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   El frontend estará disponible en `http://localhost:3000`.

## Detalles de Configuración de Base de Datos
El proyecto utiliza PostgreSQL como base de datos. Prisma se encarga de gestionar las migraciones y el esquema de la base de datos.

### Scripts de Configuración
1. **Generar el cliente de Prisma**:
   ```bash
   npx prisma generate
   ```

2. **Ejecutar migraciones**:
   ```bash
   npx prisma migrate dev
   ```

3. **Explorar la base de datos con Prisma Studio**:
   ```bash
   npx prisma studio
   ```

### Esquema de la Base de Datos
El esquema de la base de datos se encuentra definido en el archivo [`schema.prisma`](backend/prisma/schema.prisma). Incluye los modelos `User`, `Product` y `Cart` para gestionar usuarios, productos y carritos de compra.


### Crear un Admin
Para crear un usuario administrador en el sistema, sigue estos pasos:

1. Asegúrate de que el backend esté configurado correctamente y que las migraciones de la base de datos hayan sido ejecutadas.

2. Ejecuta el script `create-admin.js` ubicado en el directorio `backend/scripts`. Este script creará un usuario administrador con credenciales predeterminadas.

   ```bash
   node backend/scripts/create-admin.js
   ```

3. Por defecto, el usuario administrador tendrá las siguientes credenciales:
   - **Email**: `admin@kpopbeat.com`
   - **Contraseña**: `admin123`

4. Puedes iniciar sesión con estas credenciales para acceder a las funciones de administrador.

> **Nota**: Si deseas personalizar las credenciales del administrador, edita el archivo `create-admin.js` antes de ejecutarlo.


¡Listo! Ahora puedes ejecutar y explorar el proyecto.
