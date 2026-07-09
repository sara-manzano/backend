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

Crea un `.env` en la raíz:

```env
PORT=3000
MONGODB_URI=tu_uri_de_mongodb_atlas
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
JWT_SECRET=una_cadena_secreta_cualquiera
```

Si quieres cargar películas de prueba:

```bash
npm run seed
```

Para crear el primer admin:

```bash
node src/seeds/admin.seed.js
```

Para arrancar:

```bash
npm run dev
```

## Rutas

Las rutas protegidas necesitan el token en el header:

```
Authorization: Bearer <token>
```

### Usuarios

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/register` | — | Registro. Acepta `multipart/form-data` si quieres subir foto. |
| POST | `/api/login` | — | Login. Devuelve token + datos del usuario. |
| GET | `/api/users` | admin | Lista todos los usuarios. Paginación: `?page=1&limit=20`. |
| GET | `/api/users/profile` | token | Perfil del usuario logueado con sus favoritos. |
| PUT | `/api/users/:id` | token | Actualiza nombre, email o imagen de perfil. |
| PUT | `/api/users/add-favorite/:idData` | token | Añade una película a favoritos (sin duplicados). |
| DELETE | `/api/users/remove-favorite/:idData` | token | Quita una película de favoritos. |
| DELETE | `/api/users/:id` | token | Borra cuenta. Cada usuario puede borrar la suya; los admins pueden borrar cualquiera. |
| PUT | `/api/users/:id/role` | admin | Cambia el rol de un usuario (`"user"` o `"admin"`). |

### Películas

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/movies` | — | Lista películas. Paginación: `?page=1&limit=20`. |
| GET | `/api/movies/:id` | — | Una película por ID. |
| POST | `/api/movies` | admin | Crea película. Solo `title` es obligatorio. |
| PUT | `/api/movies/:id` | admin | Actualiza película. |
| DELETE | `/api/movies/:id` | admin | Elimina película. |

## Notas

- Las imágenes de perfil se suben a Cloudinary y se eliminan automáticamente al actualizar o borrar la cuenta.
- Los tokens caducan a los 30 días.
- El `.env` nunca se sube al repositorio. Usa `.env` como plantilla para configurar tu entorno.
