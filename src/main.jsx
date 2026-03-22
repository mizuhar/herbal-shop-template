import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from "./context/CartContext"
import "./styles/global.css"
import "./styles/layout.css"
import "./styles/product.css"
import "./styles/cart.css"
import "./styles/admin.css"

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <CartProvider>
<BrowserRouter>
    <App />
  </BrowserRouter>

  </CartProvider>
  
 
)
