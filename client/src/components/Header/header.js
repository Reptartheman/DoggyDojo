import React from "react";
import "../../App.css";
import "../Header/header.css";

export default function Header() {
  return (
    <header className="header">
      <h1> Doggy Dojo </h1>
      <h2> Helping Your Dog Reach Their Pet-tential! </h2>
      <nav className="button-container" role="group" aria-label="Outlined Buttons">
        <button type="button" className="navButtons">Sample</button>
        <button type="button" className="navButtons">
          Sample
        </button>
        <button type="button" className="navButtons">Sample</button>
        <button type="button"className="navButtons">Sample</button>
      </nav>
    </header>
  );
}
