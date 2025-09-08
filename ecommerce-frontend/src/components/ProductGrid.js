import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductGrid({ products }) {
  return (
    <div className="row">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.uniqueId} className="col-md-3 mb-3">
            <div className="card h-100">
              <ImageWithLoader src={product.image} alt={product.title} />
              <div className="card-body">
                <h6 className="card-title">{product.title}</h6>
                <p className="card-text fw-bold">
                  {product.price > 0 ? `$${product.price.toFixed(2)}` : "Unavailable"}
                </p>
              </div>
              <div className="card-footer text-center">
                <Link to={`/product/${product.uniqueId}`} state={{ product }}>
                  <div>{product.title}</div>
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

function ImageWithLoader({ src, alt }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8f9fa",
      }}
    >
      {!loaded && (
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <img
        src={src || `${process.env.PUBLIC_URL}/placeholder.jpg`}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={(e) => (e.target.src = `${process.env.PUBLIC_URL}/placeholder.jpg`)}
        style={{
          display: loaded ? "block" : "none",
          height: "100%",
          width: "auto",
          objectFit: "contain",
        }}
        loading="lazy"
      />
    </div>
  );
}

function ImageWithLoader({ src, alt }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8f9fa",
      }}
    >
      {!loaded && (
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <img
        src={src || `${process.env.PUBLIC_URL}/placeholder.jpg`}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={(e) => (e.target.src = `${process.env.PUBLIC_URL}/placeholder.jpg`)}
        style={{
          display: loaded ? "block" : "none",
          height: "100%",
          width: "auto",
          objectFit: "contain",
        }}
        loading="lazy"
      />
    </div>
  );
}




