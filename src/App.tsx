import React, { useEffect } from 'react';
import './App.css';
//import Register from './components/Register'
import Login from './components/Login';
import Home from './components/Home';
import GetStarted from './components/GetStarted';
import Nav from './components/Nav';

import {Routes, Route} from 'react-router-dom'

function App() {

  useEffect(() => {

    const fetchData = async () => {

      await fetch('https://spiral-backend-api.onrender.com/resources')
        .then(res => res.json())
        .then(data => console.log(data))
    }

    fetchData()
      .catch(console.error)
    
  }, [])

  return (
    <div className="App bg-dark">
      <Login />
      <Nav />
      <Routes>
        <Route path={'/'} element={<Home />}/>
        <Route path={'/get-started'} element={<GetStarted />} />
      </Routes>
    </div>
  );
}

export default App;
