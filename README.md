# Backend

API REST hecha con Node.js, Express y MongoDB. Tiene autenticación con JWT, subida de imágenes a Cloudinary y dos modelos relacionados.

## Tecnologías

- Node.js + Express
- MongoDB Atlas + Mongoose
- Cloudinary + Multer (para subir imágenes)
- bcrypt (contraseñas)
- jsonwebtoken (JWT)
- dotenv
- cors

## Instalación

Clona el repo e instala las dependencias:

```bash
npm install
```

Crea el archivo `.env` rellena tus credenciales de MongoDB, Cloudinary y el secreto de JWT.

Para meter datos de prueba en la base de datos:

```bash
npm run seed
```

Para arrancar en desarrollo:

```bash
npm run dev
```

## Endpoints

### Usuarios

| Método | Ruta | Protegida | Qué hace |
|--------|------|-----------|----------|
| POST | `/api/register` | No | Crea un usuario. Manda los datos con `multipart/form-data` para poder subir la imagen. El rol siempre será `user` aunque mandes otra cosa. |
| POST | `/api/login` | No | Login. Devuelve el token y los datos del usuario. |
| GET | `/api/users/profile` | Sí | Devuelve el perfil del usuario logueado con sus favoritos. |
| PUT | `/api/users/add-favorite/:idData` | Sí | Añade un elemento a favoritos. Si ya está no lo duplica. |
| DELETE | `/api/users/remove-favorite/:idData` | Sí | Elimina un elemento de favoritos. |
| DELETE | `/api/users/:id` | Sí | Borra una cuenta. Solo puede el propio usuario o un admin. |
| PUT | `/api/users/:id/role` | Solo admins | Cambia el rol de un usuario. |

(falta por completar)

Para las rutas protegidas hay que mandar el token en el header:

```
Authorization: Bearer <token>
```

## Notas

- El primer admin hay que crearlo a mano desde MongoDB Atlas, cambiando el campo `role` a `"admin"`.
- Las imágenes se suben a la carpeta `backend-users` de Cloudinary.
