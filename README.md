# Backend

API REST para gestionar películas y usuarios, con autenticación, roles y subida de imágenes. Hecha con Node.js, Express y MongoDB Atlas.

## ¿Qué hace?

- Los usuarios se pueden registrar, iniciar sesión y guardar películas como favoritas
- Hay dos roles: `user` (usuario normal) y `admin` (puede crear, editar y borrar películas, y gestionar otros usuarios)
- Las imágenes de perfil se suben a Cloudinary y se eliminan automáticamente si el usuario borra su cuenta
- Los favoritos no se duplican aunque añadas la misma película varias veces

## Tecnologías usadas

- Node.js + Express
- MongoDB Atlas + Mongoose
- Cloudinary + Multer
- bcrypt + JWT
- dotenv + cors

## Cómo arrancarlo

Primero clona el repo e instala las dependencias:

```bash
git clone https://github.com/sara-manzano/backend.git
cd backend
npm install
```

Crea un `.env` en la raíz con esto:

```env
PORT=3000
MONGODB_URI=tu_uri_de_mongodb_atlas
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
JWT_SECRET=una_cadena_secreta_cualquiera
```

Para meter datos de prueba (12 películas):

```bash
npm run seed
```

Para arrancar en desarrollo:

```bash
npm run dev
```

El servidor arranca en `http://localhost:3000`.

---

## Estructura del proyecto

```
src/
├── config/
│   ├── cloudinary.js   # configuración de Cloudinary y multer
│   └── db.js           # conexión a MongoDB
├── controllers/
│   ├── movies.controller.js
│   └── user.controller.js
├── middlewares/
│   ├── auth.js         # isAuth e isAdmin
│   └── file.js         # uploadImage con multer
├── models/
│   ├── movies.js
│   └── user.js
├── routes/
│   ├── movies.routes.js
│   └── user.routes.js
├── seeds/
│   └── movies.seed.js
└── server.js
```

---

## Rutas

Para las rutas que requieren autenticación, hay que enviar el token en el header:

```
Authorization: Bearer <token>
```

El token lo obtienes al hacer login.

### Usuarios

| Método | Ruta | ¿Necesita token? | Qué hace |
|--------|------|-----------------|----------|
| POST | `/api/register` | No | Crea una cuenta. Para subir foto de perfil usa `multipart/form-data`. El rol siempre será `user`. |
| POST | `/api/login` | No | Inicia sesión. Devuelve un token y los datos del usuario. |
| GET | `/api/users/profile` | Sí | Devuelve el perfil del usuario logueado con sus favoritos. |
| PUT | `/api/users/add-favorite/:idData` | Sí | Añade una película a favoritos. Si ya estaba, no la duplica. |
| DELETE | `/api/users/remove-favorite/:idData` | Sí | Quita una película de favoritos. |
| DELETE | `/api/users/:id` | Sí | Borra una cuenta. Cada usuario puede borrar la suya; los admins pueden borrar cualquiera. Al borrar, se elimina también la imagen de Cloudinary. |
| PUT | `/api/users/:id/role` | Solo admins | Cambia el rol de un usuario a `"user"` o `"admin"`. |

### Películas

| Método | Ruta | ¿Necesita token? | Qué hace |
|--------|------|-----------------|----------|
| GET | `/api/movies` | No | Lista todas las películas. |
| GET | `/api/movies/:id` | No | Devuelve una película por su ID. |
| POST | `/api/movies` | Solo admins | Crea una película. El único campo obligatorio es `title`. |
| PUT | `/api/movies/:id` | Solo admins | Actualiza una película. |
| DELETE | `/api/movies/:id` | Solo admins | Elimina una película. |

---

## Ejemplo de uso

**1. Registrarse:**
```bash
POST /api/register
Content-Type: application/json

{
  "name": "Sara",
  "email": "sara@example.com",
  "password": "123456"
}
```

**2. Iniciar sesión y guardar el token:**
```bash
POST /api/login
Content-Type: application/json

{
  "email": "sara@example.com",
  "password": "123456"
}
```

**3. Añadir una película a favoritos:**
```bash
PUT /api/users/add-favorite/<id_de_la_pelicula>
Authorization: Bearer <token>
```

---

## Cosas a tener en cuenta

- El primer admin hay que crearlo a mano desde MongoDB Atlas, cambiando el campo `role` a `"admin"` en el documento del usuario.
- Las imágenes se suben a la carpeta `backend-users` de Cloudinary.
- La contraseña mínima es de 6 caracteres.
- Los tokens caducan a los 7 días.


