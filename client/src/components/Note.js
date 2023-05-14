import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { ADD_NOTE } from "../utils/mutations";
import { QUERY_NOTE, QUERY_USER } from "../utils/queries";

import Auth from "../utils/auth";

const NoteForm = () => {
  const user = Auth.getProfile();
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: user.username },
  });
  const [noteText, setNoteText] = useState({
    text: "",
  });
  useEffect(() => {
    if (!loading && data?.user?.notes?.length > 0) {
      setNoteText({ text: data.user.notes[0].text });
    }
  }, [loading, data]);

  const [addNote, { error }] = useMutation(ADD_NOTE, {
    update(cache, { data: { addNote } }) {},
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const theNote = await addNote({
        variables: {
          username: user.username,
          text: noteText,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "noteText" && value.length <= 280) {
      setNoteText(value);
    }
  };

  return (
    <div className="profileHeader">
      <h3>How is your dog's progress?</h3>

      {Auth.loggedIn() ? (
        <>
          <form className="" onSubmit={handleFormSubmit}>
            <div className="col-12 col-lg-9">
              <textarea
                name="noteText"
                placeholder="Here's a new thought..."
                value={noteText.text}
                className="form-input w-100"
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="formButton" type="submit">
                Add Note
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your notes. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default NoteForm;
