import { Routes, Route } from "react-router-dom";

import Admin from "./admin/Admin"

import Layout from "./components/layout/Layout";


import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {

  return (

    <Layout>

      <Routes>

        <Route path="/admin" element={<Admin />} />

        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/product/:id" element={<Product />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

      </Routes>

    </Layout>

  );

}

export default App;