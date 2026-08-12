# 🚀 Prabhakar Gupta — Personal Portfolio

A modern, interactive 3D personal developer portfolio built with **React 19**, **Vite 7**, **Three.js**, **Framer Motion**, **GSAP**, and **Tailwind CSS**. Features glassmorphism UI, WebGL fluid physics cursor, smooth animations, and real-time contact form integration.

![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite 7](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## ✨ Features

- 🌊 **WebGL Fluid Physics Cursor (`SplashCursor`)**: Interactive fluid shader dynamics on mouse/touch movement.
- 🌌 **Aurora Animated Hero (`AuroraHero`)**: Dynamic gradient mesh background with pulsing glow.
- 🎨 **Modern Animated Typography**: `Typewriter`, `GradientText`, and `BlurText` word-by-word reveal effects.
- 🧩 **Glassmorphism Navigation**: Floating top navbar, expandable GSAP `CardNav` menu, and macOS-style bottom `Dock`.
- 📊 **Comprehensive Sections**: About Me, Tech Arsenal, Soft Skills, Featured Projects, Competitive Coding Profiles, Career Goals, and Resume.
- 📬 **Live Contact Form**: Real-time form submissions powered by **EmailJS** (`@emailjs/browser`).

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework & Build** | [React 19](https://react.dev/), [Vite 7](https://vitejs.dev/), [React Router DOM 7](https://reactrouter.com/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), Custom Vanilla CSS3, Glassmorphism |
| **3D & WebGL** | [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei), WebGL Shaders |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/), [GSAP 3](https://gsap.com/) |
| **Services** | [EmailJS Browser](https://www.emailjs.com/), [Vercel](https://vercel.com/) |

---

## 📂 Project Structure

```text
prabhakar-gupta-portfolio/
├── public/                 # Static assets (logo, resume, images)
├── src/
│   ├── assets/             # Media & tech stack icons
│   ├── components/         # Background, layout, sections, splash cursor
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── App.jsx             # Main application layout
│   ├── App.css             # Global component styles
│   ├── index.css           # Design tokens & Tailwind imports
│   └── main.jsx            # React entry point
├── .env                    # Environment variables (EmailJS keys)
├── index.html              # HTML entry template
├── package.json            # Project dependencies & scripts
├── tailwind.config.js      # Tailwind configuration
├── vite.config.js          # Vite configuration
└── vercel.json             # Vercel deployment configuration
```

---

## 🚀 Running the Project

### Prerequisites
- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)

### Setup & Launch

1. **Clone the repository**:
   ```bash
   git clone https://github.com/PrabhakarG001/My-Personal-Portfolio.git
   cd My-Personal-Portfolio/prabhakar-gupta-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in `prabhakar-gupta-portfolio`:
   ```env
   VITE_EMAILJS_SERVICE_ID=service_xcpqxv3
   VITE_EMAILJS_TEMPLATE_ID=template_z808bej
   VITE_EMAILJS_PUBLIC_KEY=q0490FOTrP1srtpx1
   VITE_CONTACT_TO_EMAIL=prabhakarg465@gmail.com
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 👤 Author

**Prabhakar Gupta**
- **GitHub**: [@PrabhakarG001](https://github.com/PrabhakarG001)
- **Email**: [prabhakarg465@gmail.com](mailto:prabhakarg465@gmail.com)
