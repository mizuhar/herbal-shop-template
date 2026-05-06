import { useState, useMemo } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/product/ProductCard";

function Shop() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");

  const normalizedSearch = search.trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(normalizedSearch),
    );
  }, [products, search]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="shop">
      <h1>Shop</h1>
      <div style={{display:'flex',gap:'15px'}}>
   <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 Търси билка..."
      />
      {search && <button onClick={() => setSearch("")}>Clear</button>}
      </div>
   
      <br />
      <br />
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 && <p>Няма намерен продукт...</p>}
    </div>
  );
}

export default Shop;
