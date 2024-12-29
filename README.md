# Tidy Notes - Backend
**Backend de Tidy Notes** – Aplicación de gestión de notas con MongoDB y TypeScript.

## 🚀 Tecnologías utilizadas
[![My Skills](https://skillicons.dev/icons?i=ts,docker,mongo,bash,bun)](https://skillicons.dev)

---  

## 📥 Pasos para clonar y ejecutar el proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/PatricioPoncini/tidy-notes.git
cd tidy-notes
```
### 2. Instalar dependencias
```bash
bun i
```

### 3. Levantar MongoDB con Docker
```bash
docker compose up -d
```

### 4. Configuración del entorno
Crear un archivo `.env` y pegar las siguientes credenciales
```bash
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=secret
MONGO_URI=mongodb://root:secret@localhost:27017
```

### 5. Levantar el backend
```bash
bun run dev
```