import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AjustesProvider } from './context/AjustesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AjustesProvider>
        <App />
    </AjustesProvider>
  </StrictMode>
)
