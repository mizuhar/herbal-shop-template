import useProducts from "../hooks/useProducts"
import ProductCard from "../components/product/ProductCard"

function Shop() {

  const { products, loading, error } = useProducts()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="shop">

      <h1>Shop</h1>

      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  )
}

export default Shop