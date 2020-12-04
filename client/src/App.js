import React from 'react';
import {useRoutes} from './routes';
import {BrowserRouter as Router} from 'react-router-dom';

import './App.css';

function App() {
  const routes = useRoutes();

  return (
    <>
      <Router>{routes}</Router>
    </>
  );
}

export default App;
