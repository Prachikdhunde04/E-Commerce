import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";

export default function CategoryPage({ filters }) {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let data = [];

        if (category.toLowerCase() === "essentials") {
          // Essentials → fetch from dummyjson
          const res = await fetch("https://dummyjson.com/products");
          const json = await res.json();

          data = json.products.filter((p) =>
            ["furniture", "groceries", "beverages"].includes(
              p.category.toLowerCase()
            )
          );
        } else {
          // For other categories → fetch from fakestore
          const res = await fetch(
            `https://fakestoreapi.com/products/category/${category}`
          );
          data = await res.json();
        }

        setItems(data);
      } catch (err) {
        console.error("Error fetching category data:", err);
      }
    }

    fetchData();
  }, [category]);

  // Apply filters (price)
  useEffect(() => {
    let result = [...items];
    if (filters.price) {
      const [min, max] = filters.price.split("-").map(Number);
      result = result.filter((p) => p.price >= min && p.price <= max);
    }
    setFilteredItems(result);
  }, [items, filters]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">
        {category.toLowerCase() === "essentials"
          ? "ESSENTIALS "
          : `${category.toUpperCase()}`}
      </h2>

      <ProductGrid products={filteredItems} />
    </div>
  );
}




