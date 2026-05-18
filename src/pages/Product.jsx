import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useCart } from "../context/CartContext"


export default function Product() {

  const { addToCart } = useCart()
  const {id} = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

 useEffect(() => {
  async function fetchProduct() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error(error)
        setProduct(null)
        return
      }

      setProduct(data)
    } catch (err) {
      console.error(err)
      setProduct(null)
    } finally {
      setLoading(false)
    }
  }

  fetchProduct()
}, [id])

function addToCartProduct(){

  if(!product) return

  addToCart(product)
}

if (loading) {
  return <p>Loading product...</p>
}

if (!product) {
  return <p>Product not found.</p>
}

 return (
    <div className="product-page">

      <img src={product.image} alt={product.name} />

      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <h2>{product.price} €</h2>

      <button onClick={addToCartProduct} 
      disabled={product.stock === 0}>
        {product.stock === 0 ? 'Out of Stock': 'Add to Cart' }
        </button>

    </div>
  )
}