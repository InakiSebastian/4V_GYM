# WEB 4VGYM (EDUARDO E IÑAKI)
## Descripción
Este proyecto es una interfaz para Tablet/Laptop que permite gestionar los monitores y las actividades del gimnasio. La aplicación sigue un diseño predefinido y prioriza la reutilización de componentes.

## Características Principales
- **Cabecera fija:** Contiene el nombre y el logo del gimnasio.
- **Selector de funciones:** En la parte inferior, permite alternar entre la vista de actividades y la de monitores.
- **Gestión de Actividades:**
  - Selección de fecha y navegación entre días.
  - Tres bloques de actividad fijos por día.
  - Posibilidad de añadir, editar y eliminar actividades.
  - Cada actividad muestra los monitores y el tipo de actividad.
- **Gestión de Monitores:**
  - Vista en carrusel de los monitores actuales.
  - Buscador para encontrar monitores específicos.
  - Funcionalidades para crear, editar y eliminar monitores.
- **Backend:**
  - Mock con listas de actividades y monitores, inicializadas al arrancar la aplicación.

## Instalación
1. Clona este repositorio:
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   ng serve
   ```

## Tecnologías Utilizadas
- **Frontend:** Angular 
- **Backend:** MockApi
- **Diseño:** Basado en   [FIGMA](https://www.figma.com/design/3NcX2Cv4FMznUtnMbTmvZl/2DAM-4VGYM?node-id=6-10109)

## Uso
1. Accede a la aplicación en un navegador compatible.
2. Usa el selector de funciones para cambiar entre Actividades y Monitores.
3. Gestiona las actividades y monitores según sea necesario.

