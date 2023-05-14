import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

export default function Signup() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section>
      <div className="loginContainer">
        {data ? (
          <p>
            Success! You may now head <Link to="/me">to your profile.</Link>
          </p>
        ) : (
          <form
            onSubmit={handleFormSubmit}
            id="contact"
            action=""
            method="post"
          >
            <h3>Sign Up</h3>
            <fieldset className="formLabel">
              <input
                placeholder="Your name"
                name="username"
                type="text"
                required
                value={formState.name}
                onChange={handleChange}
              ></input>
            </fieldset>
            <fieldset className="formLabel">
              <input
                placeholder="Email"
                type="email"
                name="email"
                required
                value={formState.email}
                onChange={handleChange}
              ></input>
            </fieldset>
            <fieldset className="formLabel">
              <input
                placeholder="Password"
                type="password"
                name="password"
                required
                value={formState.password}
                onChange={handleChange}
              ></input>
            </fieldset>
            <fieldset className="formLabel">
              <button
                name="submit"
                type="submit"
                id="contact-submit"
                data-submit="...Sending"
              >
                Submit
              </button>
            </fieldset>
          </form>
        )}

        {error && (
          <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
        )}
      </div>
    </section>
  );
}
