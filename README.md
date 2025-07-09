# Vertice API - Prueba Técnica

API RESTful para una tienda en línea que permite a los usuarios registrarse, iniciar sesión, consultar productos y generar órdenes de compra. El sistema incluye autenticación JWT, manejo de relaciones y una estructura de código modular.

## Tecnologías Utilizadas
- **Backend**: Node.js, Express.js
- **Base de Datos**: PostgreSQL
- **ORM**: Prisma
- **Autenticación**: JSON Web Token (JWT)
- **Gestor de Paquetes**: pnpm

---

## Requisitos Previos
Asegúrate de tener instalado lo siguiente en tu sistema:
- [Node.js](https://nodejs.org/) (v20 o superior)
- [pnpm](https://pnpm.io/installation) (v10 o superior)
- [PostgreSQL](https://www.postgresql.org/download/)

---

## 🚀 Guía de Instalación y Ejecución

Sigue estos pasos para levantar el proyecto en tu entorno local.

### 1. Clonar el Repositorio
```bash
git clone https://github.com/SurivZ/Vertice
cd Vertice
````

### 2\. Instalar Dependencias

Usa `pnpm` para instalar todas las dependencias definidas en el `package.json` y `pnpm-lock.yaml`.

```bash
pnpm install
```

### 3\. Configurar Variables de Entorno

Copia el archivo de ejemplo `.env.example` para crear tu propio archivo `.env` y configúralo con tus credenciales.

```bash
cp .env.example .env
```

Ahora, abre el archivo `.env` y añade la URL de tu base de datos y un secreto para JWT.

```env
DATABASE_URL="postgresql://user:password@localhost:5432/vertice_db"
JWT_SECRET="secreto_super_largo_y_dificil_de_adivinar"
PORT=3000
```

### 4\. Configurar la Base de Datos

Para configurar la base de datos desde cero (creando las tablas y poblándola con datos de prueba), ejecuta el siguiente comando. **¡Esto borrará la base de datos si ya existe\!**

```bash
pnpm prisma migrate reset
```

*Este comando ejecutará las migraciones y luego el script de `seed` automáticamente.*

### 5\. Iniciar el Servidor

Finalmente, inicia el servidor en modo de desarrollo. Nodemon reiniciará la aplicación automáticamente con cada cambio.

```bash
pnpm run dev
```

La API estará disponible en `http://localhost:3000`.

-----

## Scripts Disponibles

  - `pnpm run dev`: Inicia el servidor en modo desarrollo.
  - `pnpm prisma migrate dev`: Crea un nuevo archivo de migración.
  - `pnpm prisma db seed`: Rellena la base de datos con datos de prueba (seed).
  - `pnpm prisma migrate reset`: Resetea la base de datos y la vuelve a poblar.

-----

## Endpoints de la API

### Principal

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `GET` | `/` | Muestra información de la API y del autor. |

### Autenticación

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Registra un nuevo usuario. |
| `POST` | `/api/auth/login` | Inicia sesión y devuelve un JWT. |

### Usuario

| Método | Ruta | Descripción | Requiere Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users/me` | Devuelve los datos del usuario autenticado. | **Sí** |

### Productos

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Devuelve una lista de todos los productos. |
| `GET` | `/api/products/:id` | Devuelve el detalle de un producto específico. |

### Órdenes

| Método | Ruta | Descripción | Requiere Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/orders` | Devuelve el historial de órdenes del usuario. | **Sí** |
| `POST` | `/api/orders` | Crea una nueva orden de compra. | **Sí** |
| `GET` | `/api/orders/:id` | Devuelve el detalle de una orden específica. | **Sí** |
