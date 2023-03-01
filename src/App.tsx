import React, { useEffect, useState, createContext } from 'react';
import './App.css';
import Home from './components/Home';
import GetStarted from './components/GetStarted';
import Resources from './components/Resources';
import Nav from './components/Nav';

import {Routes, Route} from 'react-router-dom'

//establish context
interface ResourceContextType {
  arr: []
}

export const ResourceContext = createContext<ResourceContextType | null>(null)

function App() {
  
  const [dataObject, setDataObject] = useState<ResourceContextType>({
    arr: []
  })

  useEffect(() => {

    const fetchData = async () => {

      await fetch('https://spiral-backend-api.onrender.com/resources')
        .then(res => res.json())
        .then(data => setDataObject({arr: data}))
    }

    fetchData()
    
  }, [])

  return (
    <div className="App bg-dark">
      <ResourceContext.Provider value={dataObject}>
        <Nav />
        <Routes>
          <Route path={'/'} element={<Home />}/>
          <Route path={'/get-started'} element={<GetStarted />} />
          <Route path={'/resources'} element={<Resources />} />
        </Routes>
      </ResourceContext.Provider>
    </div>
  );
}

export default App;
