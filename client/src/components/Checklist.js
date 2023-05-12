import React from 'react';
import "../App.css";

export default function Checklist(prop) {
  const dogs = prop.dogs

  return (
    <div>
      {dogs.map((dog) => (
        <div key={dog._id}>
          <h3>Dog Size: {dog.size}</h3>
          <h3>Dog Activity: {dog.activity}</h3>
          <h3>Dog Training: {dog.training}</h3>
        </div>
      ))}
    </div>
  )
}
