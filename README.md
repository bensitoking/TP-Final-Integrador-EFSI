Mi Presupuesto – Aplicación de Gestión Financiera

Mi Presupuesto es una aplicación web que permite al usuario gestionar sus ingresos y gastos personales, visualizar un resumen de sus finanzas y realizar un seguimiento detallado de sus movimientos. Utiliza React y Recharts para mostrar visualmente los datos de manera eficiente.

Integrantes

Tomás Lendner

Ben Wischñevsky

Descripción del Proyecto

Esta aplicación fue creada para proporcionar una forma sencilla y eficiente de llevar un control de los ingresos y gastos personales de los usuarios. Se han implementado características como filtros avanzados, gráficos interactivos y la capacidad de agregar, editar y eliminar movimientos financieros. Y porque lo pidió la profe.

Tecnologías Utilizadas

React: Librería principal para la construcción de la interfaz de usuario.

Recharts: Biblioteca para la visualización de datos mediante gráficos.

Formik: Para la gestión de formularios y validación de entradas del usuario.

Yup: Para la validación de datos en los formularios.

TailwindCSS: Framework CSS para la estilización rápida y eficiente.

LocalStorage: Para persistencia de datos en el navegador.

Instalación

Seguí estos pasos para ejecutar la aplicación localmente:

Cloná el repositorio:

git clone https://github.com/tu-usuario/mi-presupuesto.git cd mi-presupuesto

Instalá las dependencias:

Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

npm install

Configurá el entorno:

Asegúrate de tener configurado un entorno de desarrollo con Node.js y npm.

Ejecuta la aplicación en modo desarrollo:

Una vez instaladas las dependencias, ejecuta el siguiente comando para iniciar el servidor de desarrollo:

npm start

Esto abre la aplicación en tu navegador predeterminado en http://localhost:3000

Construcción para producción:

Si deseás construir la aplicación para producción, utiliza el siguiente comando:

npm run build

Esto creará una versión optimizada de la aplicación en la carpeta build.

Dependencias

Dependencias necesarias para ejecutar el proyecto:

npm install react-router-dom@6.4.0 npm install recharts npm install formik yup npm install --save-dev tailwindcss postcss autoprefixer

Estructura de Archivos

La estructura del proyecto es la siguiente:

mi-presupuesto/ ├── public/ │ ├── index.html ├── src/ │ ├── components/ # Componentes reutilizables │ ├── context/ # Contexto de movimientos │ ├── hooks/ # Hooks personalizados │ ├── pages/ # Páginas principales (Listado, Nuevo, Resumen) │ ├── App.js # Componente principal │ └── App.css # Estilos de la aplicación ├── package.json # Dependencias y scripts ├── tailwind.config.js # Configuración de Tailwind └── README.md # Este archivo
