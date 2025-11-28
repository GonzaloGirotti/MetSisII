# Grupo 15

# 🏥 Proyecto Clínica Salud+ -- CRUD de Pacientes y Médicos

## 📖 Descripción

Este proyecto corresponde a la materia de Metodología de Sistemas II.
El objetivo es implementar una **API REST** con operaciones CRUD para
gestionar pacientes y médicos en una clínica.

La API podrá consumirse desde **Postman** y también se construirá un
**frontend web** simple que interactúe con los datos.

------------------------------------------------------------------------

## 🎯 Objetivos

-   Desarrollar una **API REST** con Node.js y Express.
-   Implementar operaciones **CRUD** sobre las entidades **Pacientes** y
    **Médicos**.
-   Probar el correcto funcionamiento con **Postman**.
-   Construir una **página web** que consuma la API.
-   Aplicar un **patrón de diseño** aprendido en clases (Creacional,
    Estructural o de Comportamiento).

------------------------------------------------------------------------

## 🚀 Instalación y ejecución

1.  Clonar el repositorio:

    ``` bash
    git clone https://github.com/GonzaloGirotti/MetSisII
    ```

## 🚀 Instalación y ejecución
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/GonzaloGirotti/MetSisII
   ```
2. Navegar al directorio del backend python del proyecto:
   ```bash
   cd backend/app
   ```
3. Instalar las dependencias:
   ```bash
   pip install -r requirements.txt
   ```

4. Navegar al directorio del gateway:
   ```bash
   cd ../../gateway
   ```

5. Instalar las dependencias:
   
   ```bash
   npm install
   ```

## 🌐 Frontend (React + Vite + TypeScript)

6.  Navegar al directorio del frontend:

    ``` bash
    cd ../frontend
    ```

7.  Instalar dependencias:

    ``` bash
    npm install
    ```

    ``` bash
    npm install axios
    ```
8. Ejecutar el servidor de desarrollo:

``` bash
npm run dev
```

El frontend estará disponible en:
👉 **http://localhost:5173/**
y se comunica automáticamente con el gateway en
**http://localhost:3000/api**.

------------------------------------------------------------------------

## 🧪 Pruebas con Postman

-   Se incluirá una colección con todos los endpoints para importar en
    Postman.
-   Pasos:
    1.  Importar la colección.
    2.  Ejecutar las pruebas de **Pacientes** y **Médicos**.

------------------------------------------------------------------------

## 🌐 Frontend

El frontend será una página simple que permitirá:
- Home
- Login
- Logout
- Listar pacientes, médicos y turnos
- Crear nuevos registros.
- Editar registros existentes.
- Eliminar registros.

------------------------------------------------------------------------

## 🧩 Patrón de diseño elegido

De las clases vistas:
- **Creacionales:** Singleton, Factory, Builder
- **Estructurales:** Adapter, Decorator, Facade
- **De comportamiento:** Observer, Strategy, Command

### ✅ Patrón seleccionado: **Facade**

**Justificación:**
En este proyecto tenemos varias operaciones sobre pacientes y médicos
(altas, bajas, modificaciones, consultas). Si bien cada una tiene su
propia lógica, podemos exponer una **interfaz unificada y simplificada**
mediante la API REST.
De esta manera, el frontend y Postman solo ven los endpoints de la API
(la "fachada"), sin preocuparse por la complejidad interna (consultas
SQL, validaciones, controladores).

Esto reduce el acoplamiento y hace más simple el uso de nuestro sistema.

------------------------------------------------------------------------

## 👥 Integrantes del grupo N° 15

-   Dario Colantonio
-   Gonzalo Girotti
-   Mariano Garcia
-   Gianfranco Campagnucci

Metodología de Sistemas II -- Año 2025 -- UTN
