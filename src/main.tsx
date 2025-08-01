import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AjustesProvider } from './context/AjustesContext.tsx'
// import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AjustesProvider>
      {/* <BrowserRouter> */}
        <App />
      {/* </BrowserRouter> */}
    </AjustesProvider>
  </StrictMode>
)
