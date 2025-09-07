import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Products({ searchTerm, filters }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  // Fetch all three APIs
  useEffect(() => {
    async function fetchProducts() {
      try {
        const [fakeStoreRes, dummyRes, kolzRes] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("https://dummyjson.com/products"),
          fetch("https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json"),
        ]);

        const fakeStoreData = await fakeStoreRes.json();
        const dummyData = await dummyRes.json();
        const kolzData = await kolzRes.json();

        // Normalize DummyJSON
        const dummyProducts = dummyData.products.map((p) => ({
          ...p,
          uniqueId: `dummy-${p.id}`,
          title: p.title,
          price: p.price || 0,
          image: p.images?.[0] || "placeholder.jpg",
        }));

        // Normalize Kolzsticks
        const kolzProducts = kolzData.map((p, idx) => ({
          ...p,
          uniqueId: `kolz-${idx}`,
          title: p.name || "Unknown Product",
          price: p.price || 0,
          image: p.image || "placeholder.jpg",
        }));

        // Normalize FakeStore
        const fakeProducts = fakeStoreData.map((p) => ({
          ...p,
          uniqueId: `fake-${p.id}`,
          title: p.title,
          price: p.price || 0,
          image: p.image || "placeholder.jpg",
        }));

        // Merge all
        const mergedProducts = [...fakeProducts, ...dummyProducts, ...kolzProducts];

        setProducts(mergedProducts);
        setFilteredProducts(mergedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }

    fetchProducts();
  }, []);

  // Apply search + filters
  useEffect(() => {
    let result = [...products];

    // Search
    if (searchTerm) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    if (filters.price) {
      const [min, max] = filters.price.split("-").map(Number);
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    setFilteredProducts(result);
  }, [products, searchTerm, filters]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Products</h2>
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.uniqueId} className="col-md-3 mb-3">
              <div className="card h-100">
                <Link
                  to={`/product/${product.uniqueId}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    style={{ height: "200px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h6 className="card-title">{product.title}</h6>
                    <p className="card-text fw-bold">
                      {product.price > 0 ? `$${product.price.toFixed(2)}` : "Unavailable"}
                    </p>
                  </div>
                </Link>
                <div className="card-footer text-center">
                  <button
                    className="btn btn-dark btn-sm"
                    disabled={product.price <= 0}
                    onClick={() => addToCart({ ...product, quantity: 1 })}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}


