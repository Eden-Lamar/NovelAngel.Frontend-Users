import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {HeroUIProvider} from "@heroui/system";
import { BrowserRouter as Router } from "react-router-dom";

import './index.css'
import App from './App.jsx'

document.documentElement.classList.add("light"); // Forces light theme

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <Router>
        <App />
      </Router>
    </HeroUIProvider>
  </StrictMode>,
)
