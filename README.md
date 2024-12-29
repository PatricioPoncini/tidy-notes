# tidy-notes-back

## Pasos para clonar el repositorio

1. Clonar el repositorio utilizando el comando `git clone https://github.com/PatricioPoncini/tidy-notes.git`
2. Entrar al repositorio con `cd tidy-notes`
3. Instalar dependencias con Bun utilizando `bun i`
4. Levantar la base de datos Mongo con docker compose `docker compose up -d`. Esto levantará un container con Mongo sin necesidad de instalarlo.
5. Crear un archivo `.env` como el que hay de ejemplo debajo
6. Levantar el backend utilzando el comando `bun run dev`

## .env

```dotenv
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=secret
MONGO_URI=mongodb://root:secret@localhost:27017
```
