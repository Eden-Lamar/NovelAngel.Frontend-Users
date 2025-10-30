import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {HeroUIProvider} from "@heroui/system";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './context/AuthProvider';
import './index.css'
import App from './App.jsx'



document.documentElement.classList.add("light"); // Forces light theme
// 🧠 Automatically set theme based on system or saved preference
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

document.documentElement.classList.remove("light", "dark");
document.documentElement.classList.add(initialTheme);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>  
      </Router>
    </HeroUIProvider>
  </StrictMode>,
)
