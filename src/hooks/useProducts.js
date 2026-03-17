import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function useProducts() {

  const [products, setProducts] = useState([])

  useEffect(() => {

    async function fetchProducts() {

      const { data } = await supabase
        .from("products")
        .select("*")

      setProducts(data)

    }

    fetchProducts()

  }, [])

  return products
}