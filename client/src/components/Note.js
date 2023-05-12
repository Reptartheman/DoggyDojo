// import React from 'react';

// export default function Note() {
//   return null;
// }

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useMutation } from '@apollo/client';
// import "../App.css";

// import { ADD_NOTE } from '../utils/mutations';
// import { QUERY_NOTE, QUERY_ME } from '../utils/queries';

// import Auth from '../utils/auth';

// const noteForm = () => {
//   const [noteText, setNoteText] = useState('');

//   const [characterCount, setCharacterCount] = useState(0);

//   const [addNote, { error }] = useMutation(ADD_NOTE, {
//     update(cache, { data: { addNote } }) {
//       try {
//         const { notes } = cache.readQuery({ query: QUERY_NOTE });

//         cache.writeQuery({
//           query: QUERY_NOTE,
//           data: { notes: [addNote, ...notes] },
//         });
//       } catch (e) {
//         console.error(e);
//       }

//       // update me object's cache
//       const { me } = cache.readQuery({ query: QUERY_ME });
//       cache.writeQuery({
//         query: QUERY_ME,
//         data: { me: { ...me, notes: [...me.notes, addNote] } },
//       });
//     },
//   });

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const { data } = await addNote({
//         variables: {
//           noteText,
//         },
//       });

//       setNoteText('');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     if (name === 'noteText' && value.length <= 280) {
//       setNoteText(value);
//       setCharacterCount(value.length);
//     }
//   };

//   return (
//     <div>
//       <h3>Track your dog's progress...</h3>

//       {Auth.loggedIn() ? (
//         <>
//           <p
//             className={`m-0 ${
//               characterCount === 280 || error ? 'text-danger' : ''
//             }`}
//           >
//             Character Count: {characterCount}/280
//           </p>
//           <form
//             className="flex-row justify-center justify-space-between-md align-center"
//             onSubmit={handleFormSubmit}
//           >
//             <div className="col-12 col-lg-9">
//               <textarea
//                 name="noteText"
//                 placeholder="Today's progress..."
//                 value={noteText}
//                 className="form-input w-100"
//                 style={{ lineHeight: '1.5', resize: 'vertical' }}
//                 onChange={handleChange}
//               ></textarea>
//             </div>

//             <div className="col-12 col-lg-3">
//               <button className="btn btn-primary btn-block py-3" type="submit">
//                 Add Note
//               </button>
//             </div>
//             {error && (
//               <div className="col-12 my-3 bg-danger text-white p-3">
//                 {error.message}
//               </div>
//             )}
//           </form>
//         </>
//       ) : (
//         <p>
//           You need to be logged in. Please{' '}
//           <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
//         </p>
//       )}
//     </div>
//   );
// };

// export default noteForm;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { ADD_NOTE } from '../utils/mutations';
import { QUERY_NOTE, QUERY_USER } from '../utils/queries';


import Auth from '../utils/auth';
// import { Note } from '../../../server/models';

const NoteForm = () => {
  const user = Auth.getProfile()
  console.log(user)
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
    update(cache, { data: { addNote } }) {
      // try {
      //   const { note } = cache.readQuery({ query: QUERY_NOTE });

      //   cache.writeQuery({
      //     query: QUERY_NOTE,
      //     data: { note: [addNote, ...note] },
      //   });
      // } catch (e) {
      //   console.error(e);
      // }

      // update me object's cache
      // const { user } = cache.readQuery({ query: QUERY_USER });
      // cache.writeQuery({
      //   query: QUERY_USER,
      //   data: { user: { ...user, note: [...user.note, addNote] } },
      // });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(noteText)
      const theNote= await addNote({
        variables: {
          username: user.username,
          text: noteText,
        },
      });

      // setNoteText(theNote);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'noteText' && value.length <= 280) {
      setNoteText(value);
    }
  };

  console.log(data)
  return (
    <div className='profileHeader'>
      <h3 >How is your dog's progress?</h3>

      {Auth.loggedIn() ? (
        <>
          <form
            className=""
            onSubmit={handleFormSubmit}
          >
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
          You need to be logged in to share your notes. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default NoteForm;
