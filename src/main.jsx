import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from "./context/CartContext"
import "./styles/product.css"

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <CartProvider>
<BrowserRouter>
    <App />
  </BrowserRouter>

  </CartProvider>
  
 
)
