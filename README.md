# Backend

API REST de películas y usuarios. Tiene registro/login con JWT, dos roles (user y admin), favoritos y subida de imagen de perfil a Cloudinary.

## Stack

- Node.js + Express
- MongoDB Atlas + Mongoose
- Cloudinary + Multer
- bcrypt + JWT

## Instalación

```bash
git clone https://github.com/sara-manzano/backend.git
cd backend
npm install
```

Crea un `.env` en la raíz. Necesitas una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) y en [Cloudinary](https://cloudinary.com):

```env
PORT=3000
MONGODB_URI=tu_uri_de_mongodb_atlas
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
JWT_SECRET=una_cadena_secreta_cualquiera

# Solo se usan al crear el primer admin
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@ejemplo.com
ADMIN_PASSWORD=contraseña_segura
```

Si quieres tener películas de prueba desde el principio:

```bash
npm run seed
```

Antes de usar la app necesitas al menos un admin. Créalo así:

```bash
npm run seed:admin
```

Y para arrancar en modo desarrollo:

```bash
npm run dev
```

## Autenticación

El login devuelve un token JWT que caduca a los 30 días. Las rutas protegidas lo esperan en el header:

```
Authorization: Bearer <token>
```

## Rutas

### Usuarios

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/register` | — | Crea una cuenta nueva. Acepta imagen de perfil. |
| POST | `/api/login` | — | Inicia sesión. Devuelve el token y los datos del usuario. |
| GET | `/api/users` | admin | Lista todos los usuarios con paginación. |
| GET | `/api/users/profile` | token | Devuelve el perfil del usuario autenticado con sus favoritos. |
| PUT | `/api/users/:id` | owner o admin | Actualiza nombre, email o imagen de perfil. |
| PUT | `/api/users/add-favorite/:idData` | token | Añade una película a favoritos (no se duplican). |
| PUT | `/api/users/:id/role` | admin | Cambia el rol de un usuario (`"user"` o `"admin"`). |
| DELETE | `/api/users/remove-favorite/:idData` | token | Elimina una película de favoritos. |
| DELETE | `/api/users/:id` | owner o admin | Elimina la cuenta. |

### Películas

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/movies` | — | Lista películas con paginación. |
| GET | `/api/movies/:id` | — | Devuelve una película por ID. |
| POST | `/api/movies` | admin | Crea una película nueva. Solo `title` es obligatorio. |
| PUT | `/api/movies/:id` | admin | Actualiza una película. |
| DELETE | `/api/movies/:id` | admin | Elimina una película. |

Los endpoints paginados aceptan `?page=1&limit=20` y devuelven:

```json
{
  "data": [...],
  "page": 1,
  "limit": 20,
  "total": 100,
  "pages": 5
}
```

## Qué se envía en cada petición

### Registro — `POST /api/register`

Enviar como `multipart/form-data`:

| Campo | Tipo | Requerido |
|-------|------|-----------|
| `name` | string | sí |
| `email` | string | sí |
| `password` | string (mín. 6 caracteres) | sí |
| `image` | jpg / png / webp (máx. 2 MB) | no |

### Login — `POST /api/login`

Enviar como `application/json`:

| Campo | Tipo | Requerido |
|-------|------|-----------|
| `email` | string | sí |
| `password` | string | sí |

### Actualizar perfil — `PUT /api/users/:id`

Enviar como `multipart/form-data`. Manda solo los campos que quieras cambiar:

| Campo | Tipo |
|-------|------|
| `name` | string |
| `email` | string |
| `image` | jpg / png / webp (máx. 2 MB) |

### Crear o actualizar película — `POST /api/movies` y `PUT /api/movies/:id`

Enviar como `application/json`. Solo `title` es obligatorio (y solo en el POST):

| Campo | Tipo |
|-------|------|
| `title` | string |
| `plot` | string |
| `fullplot` | string |
| `genres` | string[] |
| `runtime` | number |
| `cast` | string[] |
| `poster` | string (URL) |
| `directors` | string[] |
| `writers` | string[] |
| `year` | number |
| `languages` | string[] |
| `countries` | string[] |
| `released` | date |
| `imdb` | `{ rating, votes, id }` |
| `awards` | `{ wins, nominations, text }` |

