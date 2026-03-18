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

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error(error)
      } else {
        setProduct(data)
      }

      setLoading(false)
    }

    fetchProduct()

  }, [id])

  if (loading) return <p>Loading...</p>

  if (!product) return <p>Product not found</p>

 return (
    <div className="product-page">

      <img src={product.image} alt={product.name} />

      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <h2>{product.price} €</h2>

      <button onClick={() => addToCart(product)}>
        Add to Cart
        </button>

    </div>
  )
}