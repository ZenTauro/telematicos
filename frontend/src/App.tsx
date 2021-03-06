import React from 'react';
import './App.css';

// Router
import { Route, Switch } from 'react-router';
// State management
import { Provider } from 'react-redux';
import { store } from './redux/Store';

// The pages to render on specific routes
import Main from './pages/Main';
import Config from './pages/Config';
import User from './pages/User';
import Gallery from './pages/Gallery';
import Tables from './pages/Tables';
import Error404 from './pages/404';
// The main elements of the webpage
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavBar />
      <Switch>
        <Route exact={ true } path="/"        component={ Main } />
        <Route exact={ true } path="/config"  component={ Config } />
        <Route exact={ true } path="/myspace" component={ User } />
        <Route exact={ true } path="/gallery" component={ Gallery } />
        <Route exact={ true } path="/tables"  component={ Tables } />
        <Route component={ Error404 } />
      </Switch>
      <Footer />
    </Provider>
  );
}

export default App;
