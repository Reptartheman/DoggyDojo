import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Checklist from "../components/Checklist";
import NoteForm from "../components/Note";
import Quiz from "../components/Quiz";

import { QUERY_USER } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();
  const user = Auth.getProfile();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: user.username },
  });

  if (Auth.loggedIn() && Auth.getProfile().username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  } else {
  }

  if (!data.user.dogs.length > 0) {
    return (
      <div>
        <Quiz />
      </div>
    );
  } else {
    return (
      <div>
        <div className="textAreaContainer">
          <h2>Viewing {`${user.username}'s`} profile.</h2>

          <div className="col-12 col-md-10 mb-5">
            <Checklist dogs={data.user.dogs} />
          </div>
          <div>
            <NoteForm />
          </div>
          {!userParam && (
            <div
              className="col-12 col-md-10 mb-3 p-3"
              style={{ border: "1px dotted #1a1a1a" }}
            ></div>
          )}
        </div>
      </div>
    );
  }
};

export default Profile;
