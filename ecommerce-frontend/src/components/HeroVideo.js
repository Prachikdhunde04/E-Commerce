import React from "react";
import "./Hero.css"; // We'll create this next

export default function HeroVideo() {
  return (
    <section className="hero">
      <video autoPlay muted loop className="hero-video">
        <source src="/videos/Green and Beige Minimalist Clothing Sale Mobile Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-content">
        <h1>Big Clothing Sale!</h1>
        <p>Grab your favorites before they're gone.</p>
        <h2>Shop Now</h2>
      </div>
    </section>
  );
}