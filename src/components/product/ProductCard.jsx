import { Link } from "react-router-dom"


function ProductCard({ product }) {
  return (
    <div className="product-card">

      <div className="image-wrapper">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">{product.price} €</p>
      </div>
<Link to={`/product/${product.id}`}>
      <button className="btn">View Product</button>
</Link>

    </div>
  )
}

export default ProductCard