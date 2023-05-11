// import React, { useState } from 'react';
// import Quiz from '../components/Quiz';

// export default function Login() {
//   return (
//     <div>
//       <h1>Profile Test</h1>
//       {/* TODO: Need to code some kind of logic for there to be a button on the profile page that takes you to the quiz. So the Quiz component will likely not live on this page, but within a button component? */}
//       <Quiz />
//     </div>
//   );
// }

import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Checklist from '../components/Checklist';
import Note from '../components/Note';
import Quiz from '../components/Quiz';

import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Rocco from '../assets/Rocco.jpeg'

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = Auth.getProfile()
  // navigate to personal profile page if username is yours
  // console.log(Auth.getProfile())
  console.log(user)
  if (Auth.loggedIn() && Auth.getProfile().username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user.username) {
    return (
      <div className="errorContainer">
      <h4>
        WOOF WOOF! You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
      
      <img src={Rocco}></img>
      <p id="pleaseLogin">Please login...</p>
      
      </div>
    );
  }

  if (!user.dog) {
    return(
      <div>
        <Quiz />
      </div>
    )
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {`${user.username}'s`} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5">
          <Checklist
          />
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <Note />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
