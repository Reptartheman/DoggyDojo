import React, { useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Note from './components/Note';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

function App() {
  const [currentPage, setCurrentPage] = useState('Homepage');

  const renderPage = () => {
    if (currentPage === 'Homepage') {
      return <Homepage />;
    }
    if (currentPage === 'Login') {
      return <Login />;
    }
    if (currentPage === 'Signup') {
      return <Signup />;
    }
    if (currentPage === 'Profile') {
      return <Profile />;
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <main>
      <Header currentPage={currentPage} handlePageChange={handlePageChange} />
      {renderPage()}
      <Footer />
    </main>
  );
}

export default App;
