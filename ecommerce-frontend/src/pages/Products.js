import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import ProductGrid from "../components/ProductGrid";

export default function Products({ searchTerm, filters }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const [fakeRes, dummyRes, kolzRes] = await Promise.all([
          fetch("https://fakestoreapi.com/products").then(r => r.json()),
          fetch("https://dummyjson.com/products").then(r => r.json()),
          fetch("https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json").then(r => r.json()),
        ]);

        const normalizedFake = fakeRes.map(p => ({
          uniqueId: `fake-${p.id}`,
          title: p.title || "Unknown Product",
          price: p.price || 0,
          image: p.image || null,
        }));

        const normalizedDummy = dummyRes.products.map(p => ({
          uniqueId: `dummy-${p.id}`,
          title: p.title || "Unknown Product",
          price: p.price || 0,
          image: p.images?.[0] || null,
        }));

        const normalizedKolz = kolzRes.map((p, idx) => ({
          uniqueId: `kolz-${idx}`,
          title: p.name || "Unknown Product",
          price: p.price || 0,
          image: p.image || null,
        }));

        const merged = [...normalizedFake, ...normalizedDummy, ...normalizedKolz];
        setProducts(merged);
        setFilteredProducts(merged);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (filters.price) {
      const [min, max] = filters.price.split("-").map(Number);
      result = result.filter(p => p.price >= min && p.price <= max);
    }

    setFilteredProducts(result);
  }, [searchTerm, filters, products]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Products</h2>
      <ProductGrid products={filteredProducts} addToCart={addToCart} />
      {filteredProducts.length === 0 && <p>No products found.</p>}
    </div>
  );
}







