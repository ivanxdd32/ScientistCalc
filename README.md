
# 🧪 ScientistCalc

**ScientistCalc** es una calculadora moderna, intuitiva y adaptable que permite cambiar entre una calculadora básica y una científica con un solo clic. El proyecto está enfocado en ofrecer una experiencia accesible y agradable, integrando sonidos, soporte multilenguaje y modo claro/oscuro.

---

## 🚀 Características

- 🧮 Calculadora básica y científica
- 🎨 Interfaz moderna y adaptable (modo día/noche)
- 🌐 Internacionalización con soporte para 10 idiomas
- 🔊 Sonidos al presionar botones usando [Tone.js](https://tonejs.github.io/)
- ⚛️ Componentizado con React
- 🧩 Animaciones con GSAP
- 🛠️ Proyecto estructurado con buenas prácticas y control de versiones en GitHub

---

## 🛠 Tecnologías utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tone.js](https://tonejs.github.io/)
- [i18next](https://www.i18next.com/) + `react-i18next`
- [GSAP](https://greensock.com/gsap/)
- [Node.js](https://nodejs.org/) (entorno de ejecución)
- ESLint para análisis estático de código

---

## 📁 Estructura del proyecto

```
src/
│
├── Components/         # Componentes reutilizables (Header, Main, etc.)
├── locales/            # Archivos JSON con traducciones por idioma
├── assets/             # Recursos estáticos si se usan
├── App.jsx             # Componente principal de la app
├── index.css           # Estilos globales
├── i18n.js             # Configuración de internacionalización
└── main.jsx            # Punto de entrada de React
```

---

## 📦 Instalación y uso local

1. Clona el repositorio:

```bash
git clone https://github.com/ivanxdd32/ScientistCalc.git
cd ScientistCalc
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

4. Accede a la app en tu navegador:

```
http://localhost:5173
```

---

## 📝 Estado del proyecto

🚧 Proyecto en desarrollo. Se planea añadir:

- Más funciones científicas
- Historial de operaciones
- Soporte para accesibilidad
- Deploy en plataformas como Render o Netlify

---

## 🔄 Actualizaciones recientes

- Añadido selector de música con Tone.js para reproducir 4 sonidos de relajación.
- Implementada validación y manejo básico de errores en el input de la calculadora.
- Mejoras en el diseño y usabilidad de la calculadora científica.
- Incorporación de selección de idioma con banderas para mejor experiencia multilenguaje.

---

## 🔗 Enlaces

- 📂 [Repositorio en GitHub](https://github.com/ivanxdd32/ScientistCalc.git)

---

## 🤝 Contribuciones

Las contribuciones serán bienvenidas en futuras etapas del desarrollo. Puedes abrir issues o pull requests con mejoras o correcciones.

---

## 🧑‍💻 Autor

Desarrollado por **Iván Martínez Ríos**.  
Proyecto con fines de aprendizaje y práctica profesional en desarrollo frontend.

---
