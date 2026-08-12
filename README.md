# 🚀 Prabhakar Gupta — Personal Portfolio

A state-of-the-art, interactive 3D personal developer portfolio web application. Built with **React 19**, **Vite 7**, **Three.js**, **Framer Motion**, **GSAP**, and **Tailwind CSS**, featuring glassmorphism UI, WebGL fluid physics cursor, smooth animations, and real-time contact form integration.

![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite 7](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🌟 Overview & Key Features

This portfolio is designed to showcase my journey as a developer, highlighting my technical skills, soft skills, featured projects, competitive coding profiles, career roadmap, resume, and contact details in a visual and interactive layout.

### ✨ Highlights & Interactive Components

- 🌊 **WebGL Fluid Physics Cursor (`SplashCursor`)**: Real-time fluid dynamics rendering on mouse/touch movement using custom WebGL shaders.
- 🌌 **Aurora Animated Hero (`AuroraHero`)**: Dynamic gradient mesh background with pulsing glow and interactive call-to-action buttons.
- 🎨 **Modern Animated Typography**:
  - `Typewriter`: Dynamic role & intro text typing animation.
  - `GradientText`: Multi-color animated text gradients.
  - `BlurText`: Word-by-word smooth blur reveal effect.
- 🧩 **Glassmorphism Navigation & UI Controls**:
  - `Navbar`: Floating top glass navigation bar.
  - `CardNav`: Expandable multi-category menu card with smooth GSAP animations.
  - `Dock`: macOS-inspired floating action dock at the bottom of the screen.
  - `Scrollbar`: Custom desktop & mobile scroll progress indicators powered by `framer-motion` springs.
- ⏳ **Custom Preloader (`Loader`)**: Introductory animated screen loader on initial page mount.
- 📬 **Interactive Contact Form (`Form` & `Touchcard`)**: Real-time form submission directly sent to email powered by **EmailJS** with feedback notifications.
- 📱 **Fully Responsive Layout**: Built mobile-first with adaptive layouts for desktop, tablet, and mobile screens.

---

## 🛠️ Tech Stack

| Category | Technologies / Libraries Used |
| :--- | :--- |
| **Core & Framework** | [React 19](https://react.dev/), [React DOM 19](https://react.dev/), [React Router DOM 7](https://reactrouter.com/) |
| **Build Tool** | [Vite 7](https://vitejs.dev/) |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/), Custom Vanilla CSS3, Glassmorphism, CSS Variables |
| **3D & WebGL** | [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei), Custom WebGL Shaders |
| **Animations & Effects**| [Framer Motion 12](https://www.framer.com/motion/), [GSAP 3](https://gsap.com/) |
| **Icons** | [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/) |
| **Services & Tooling** | [EmailJS Browser](https://www.emailjs.com/), [ESLint](https://eslint.org/), [Vercel](https://vercel.com/) |

---

## 📂 Project Structure

```text
My-Personal-Portfolio/
├── vercel.json                 # Root deployment config targeting subfolder build
├── README.md                   # Root documentation
└── prabhakar-gupta-portfolio/  # Main application source code
    ├── public/                 # Static assets (logo, resume, images)
    ├── src/
    │   ├── assets/             # Component-specific media
    │   ├── components/
    │   │   ├── background/     # Aurora animated background & hero buttons
    │   │   ├── contents/       # Section-specific components (Home, About, Skills, Projects, Profiles, Goals, Resume, Contact)
    │   │   ├── layout/         # Navbar, Dock, Footer
    │   │   ├── splashcursor/   # WebGL Fluid Shader Cursor
    │   │   ├── CardNav.jsx     # Animated popup navigation menu
    │   │   ├── InteractiveCard.jsx # 3D Tilt interactive cards
    │   │   ├── Loader.jsx      # Intro preloader
    │   │   └── SectionShell.jsx# Standardized section wrapper
    │   ├── App.jsx             # Main layout & section assembly
    │   ├── App.css             # Global application styles
    │   ├── index.css           # Design system tokens & Tailwind imports
    │   └── main.jsx            # React application entry point
    ├── .env                    # Environment variables (EmailJS keys)
    ├── index.html              # HTML entry point
    ├── package.json            # Dependencies & scripts
    ├── tailwind.config.js      # Tailwind configuration
    └── vite.config.js          # Vite configuration
```

---

## ⚡ Getting Started (Run Locally)

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.x or higher recommended)
- **npm** (v9.x or higher) or **yarn** / **pnpm**

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/PrabhakarG001/My-Personal-Portfolio.git
   cd My-Personal-Portfolio/prabhakar-gupta-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create or verify the `.env` file inside `prabhakar-gupta-portfolio`:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   VITE_CONTACT_TO_EMAIL=your_email_address@example.com
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173` to view the website.

5. **Build for Production**:
   ```bash
   npm run build
   ```
   The production-ready output will be generated in the `dist/` directory.

6. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## ⚙️ Available Scripts

Run these commands inside `prabhakar-gupta-portfolio`:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode with Hot Module Replacement (HMR). |
| `npm run build` | Builds the app for production into the `dist` folder. |
| `npm run preview` | Serves the production build locally for testing. |
| `npm run lint` | Runs ESLint to check for code quality and syntax issues. |

---

## 🧠 How It Works

1. **Section Architecture**: Each portfolio section is wrapped in a reusable `SectionShell` component providing consistent padding, entrance animations, and section chips.
2. **Smooth Navigation**: Navigation items trigger smooth viewport scrolling via `element.scrollIntoView({ behavior: 'smooth' })`.
3. **Scroll Progress Tracking**: Framer Motion's `useScroll` and `useSpring` hooks compute real-time scroll progress and render vertical desktop and horizontal mobile progress bars.
4. **Fluid Shader Physics**: The `SplashCursor` component initializes a WebGL context over a full-screen canvas, computing velocity and pressure arrays to render dynamic fluid splashes on mouse movement.
5. **Contact Handling**: The contact form collects user input, runs validation, and posts payload asynchronously via `@emailjs/browser` to send instant email alerts without requiring a custom backend server.

---

## 🌐 Deployment

This project is configured for automatic build & deployment on **Vercel**.

Root `vercel.json` configuration:
```json
{
  "installCommand": "cd prabhakar-gupta-portfolio && npm install --include=dev",
  "buildCommand": "cd prabhakar-gupta-portfolio && npx vite build",
  "outputDirectory": "prabhakar-gupta-portfolio/dist"
}
```

---

## 👤 Author

**Prabhakar Gupta**
- **GitHub**: [@PrabhakarG001](https://github.com/PrabhakarG001)
- **Email**: [prabhakarg465@gmail.com](mailto:prabhakarg465@gmail.com)

---

⭐ *If you like this project, feel free to give it a star on GitHub!*
