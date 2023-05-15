import React, { useState, useEffect } from "react";
import "../App.css";
import Bone from "../assets/bone.png";

const apiKey = "c33ced43e284438dabf03cc1350d3ddd";

export default function Homepage() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((data) => setImageUrl(data.message))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div className="gridContainer">
        <section className="gridItem1">
          <div className="headingImg">
            <img src={Bone} className="gridImg" alt="bone"></img>
            <h1>Welcome to Doggy Dojo!</h1>
          </div>
          <p>
            With DoggyDojo, you'll have access to a wide range of training
            programs designed to help you teach your dog new commands, improve
            their obedience, and address any behavioral issues they may have.
            Our app includes video tutorials, step-by-step instructions, and
            personalized training plans to ensure you and your dog achieve your
            training goals.
          </p>
          <br />
          <p>
            Our team of experienced trainers is always on hand to provide
            support and guidance, so you can rest assured that you're getting
            the best advice and techniques available. You can also track your
            dog's progress, set reminders for training sessions, and connect
            with other dog owners to share tips and advice.
          </p>
          <br />
          <p>
            Whether you're a first-time dog owner or a seasoned pro, DoggyDojo
            has something for everyone. Download our app today and start
            training your dog the right way!
          </p>
        </section>
        <aside className="gridItem2">
          <h1>Who let the dogs out?!</h1>
          <p>
            <img src={imageUrl} alt="random dog" />
          </p>
          <br />
          <h3>Popular Dog Links</h3>
          <ul>
            <li>
              <a href="https://www.akc.org/">American Kennel Club</a>
            </li>
            <li>
              <a href="https://www.dogster.com/">Dogster</a>
            </li>
            <li>
              <a href="https://thebark.com/">The Bark</a>
            </li>
            <li>
              <a href="https://www.whole-dog-journal.com/">Whole Dog Journal</a>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
}
