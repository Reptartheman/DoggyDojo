import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
// import Note from './components/Note';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  // const [currentPage, setCurrentPage] = useState('Homepage');

  // const renderPage = () => {
  //   if (currentPage === 'Homepage') {
  //     return <Homepage />;
  //   }
  //   if (currentPage === 'Login') {
  //     return <Login />;
  //   }
  //   if (currentPage === 'Signup') {
  //     return <Signup />;
  //   }
  //   if (currentPage === 'Profile') {
  //     return <Profile />;
  //   }
  // };

  // const handlePageChange = (page) => setCurrentPage(page);

  return (
    <ApolloProvider client={client}>
            <Router>
        <>
          <Header />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/me' element={<Profile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='*' element={<h1 className='display-2'>Wrong page!</h1>} />
          </Routes>
          <Footer />
        </>
      </Router>
    {/* <main>
      <Header currentPage={currentPage} handlePageChange={handlePageChange} />
      {renderPage()}
      <Footer />
    </main> */}
    </ApolloProvider>
  );
}

export default App;
