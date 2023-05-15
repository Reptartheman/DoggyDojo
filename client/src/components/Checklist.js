import React from "react";
import "../App.css";

// Populates the checklist based off how many dogs arein the user's dog array
export default function Checklist(prop) {
  
  const dogs = prop.dogs;

  return (
    <div className="checkList">
      {dogs.map((dog) => (
        <div key={dog._id}>
          <h3>Dog Size:</h3>
          <p>{dog.size}</p>
          <h3>Dog Activity:</h3>
          <p>{dog.activity}</p>
          <h3>Dog Training:</h3>
          <p>{dog.training}</p>
        </div>
      ))}
    </div>
  );
}
