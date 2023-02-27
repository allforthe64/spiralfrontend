import React from 'react';
import './App.css';
import Home from './components/Home';
import GetStarted from './components/GetStarted';
import Nav from './components/Nav';

import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App bg-dark">
      <Nav />
      <Routes>
        <Route path={'/'} element={<Home />}/>
        <Route path={'/get-started'} element={<GetStarted />} />
      </Routes>
    </div>
  );
}

export default App;
