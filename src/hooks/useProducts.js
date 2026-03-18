import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase.js"

export default function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")

      if (error) {
        setError(error.message)
        console.error(error)
      } else {
        setProducts(data)
      }

      setLoading(false)
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}