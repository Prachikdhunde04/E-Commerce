import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SearchResults() {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
      });
  }, [query]);

  return (
    <div className="container mt-4">
      <h2>Search results for "{query}"</h2>
      <div className="row">
        {results.length === 0 && <p>No products found.</p>}
        {results.map((item) => (
          <div key={item.id} className="col-md-3 mb-3">
            <div className="card h-100 text-center">
              <img
                src={item.image}
                alt={item.title}
                className="card-img-top p-3"
                style={{ height: "200px", objectFit: "contain" }}
              />
              <div className="card-body">
                <h6 className="card-title">{item.title}</h6>
                <p>${item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
