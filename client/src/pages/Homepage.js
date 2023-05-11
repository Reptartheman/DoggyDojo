import React, { useState, useEffect } from "react";
import "../App.css";
import Bone from "../assets/bone.png";

const apiKey = "c33ced43e284438dabf03cc1350d3ddd";

export default function Homepage() {
  // const [news, setNews] = useState([]);

  // useEffect(() => {
  //   const url = `https://newsapi.org/v2/everything?q=dog-training&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`;
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => setNews(data.articles))
  //     .catch(error => console.error(error));
  // }, []);
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
            <img src={Bone} className="gridImg"></img>
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
          <h3>The Latest Doggy headlines!</h3>
          <p>
            <h1>Random Dog Image</h1>
            <img
              src={imageUrl}
              alt="random dog"
              style={{ width: 345, height: 400 }}
            />
          </p>
          <br />
          <p>
            Tortor pretium viverra suspendisse potenti nullam ac tortor.
            Consectetur purus ut faucibus pulvinar elementum integer enim.
            Habitasse platea dictumst vestibulum rhoncus est pellentesque.
            Iaculis nunc sed augue lacus viverra vitae congue. Consequat nisl
            vel pretium lectus quam id. At elementum eu facilisis sed. Ut ornare
            lectus sit amet est placerat in. Hendrerit gravida rutrum quisque
            non tellus orci.
          </p>
        </aside>
      </div>
    </>
  );
}
