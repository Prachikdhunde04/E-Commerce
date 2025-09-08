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
          fetch("https://fakestoreapi.com/products"),
          fetch("https://dummyjson.com/products"),
          fetch("https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json"),
        ]);

        const fakeData = await fakeRes.json();
        const dummyData = await dummyRes.json();
        const kolzData = await kolzRes.json();

        // Normalize DummyJSON
        const normalizedDummy = dummyData.products.map((p) => ({
          uniqueId: `dummy-${p.id}`,
          title: p.title || "Unknown Product",
          price: p.price || 0,
          image: p.images?.[0] || null,
        }));

        // Normalize Kolzsticks
        const normalizedKolz = kolzData.map((p, idx) => ({
          uniqueId: `kolz-${idx}`,
          title: p.name || "Unknown Product",
          price: p.price || 0,
          image: p.image || null,
        }));

        // Normalize FakeStore
        const normalizedFake = fakeData.map((p) => ({
          uniqueId: `fake-${p.id}`,
          title: p.title || "Unknown Product",
          price: p.price || 0,
          image: p.image || null,
        }));

        // Merge all
        const merged = [...normalizedFake, ...normalizedDummy, ...normalizedKolz];
        setProducts(merged);
        setFilteredProducts(merged);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }

    fetchProducts();
  }, []);

  // Apply search + price filters
  useEffect(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.price) {
      const [min, max] = filters.price.split("-").map(Number);
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    setFilteredProducts(result);
  }, [products, searchTerm, filters]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Products</h2>
      <ProductGrid products={filteredProducts} />
    </div>
  );
}




