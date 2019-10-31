import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Route } from 'react-router';
import Main from './pages/Main';
import Config from './pages/Config';
import User from './pages/User';
import Gallery from './pages/Gallery';

const App: React.FC = () => {
  new Event('onStorageChange');

  return (
    <div>
      <NavBar />
        <Route exact={ true } path="/"        component={ Main } />
        <Route exact={ true } path="/config"  component={ Config } />
        <Route exact={ true } path="/myspace" component={ User } />
        <Route exact={ true } path="/gallery" component={ Gallery } />
      <Footer />
    </div>
  );
}

export default App;
