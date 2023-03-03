import React, { useEffect, useState, createContext } from 'react';
import './App.css';

import Layout from './components/Layout';
import Register from './components/Register';
import Login from './components/Login';
import Admin from './components/Admin';
import Unauthorized from './components/Unauthorized';
import Missing from './components/Missing';
import Home from './components/Home';
import GetStarted from './components/GetStarted';
import Dashboard from './components/Dashboard';
import Discord from './components/Discord';
import Resources from './components/Resources';

import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import {Routes, Route} from 'react-router-dom'


const ROLES = {
  "Admin": 5150,
  "Enrolled": 1984,
  "User": 2001
}


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

  console.log(dataObject)

  return (
    <div className="App bg-dark">
      <ResourceContext.Provider value={dataObject}>
        <Routes>
          <Route path={'/'} element={<Layout />}> 
            {/* public routes */}

            {/* login & register */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            {/* landing page routes */}
            <Route path="/" element={<Home />} />
            <Route path={'/get-started'} element={<GetStarted />} />
            <Route path="/resources" element={<Resources />} />


            {/* we want to protect these routes */}
            <Route element={<PersistLogin />}>
              {/*<Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
                <Route path="/resources" element={<Resources />} />
              </Route>*/}

              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="/admin" element={<Admin />} />
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Enrolled, ROLES.Admin]}/>} >
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Enrolled, ROLES.Admin]}/>} >
                <Route path="/discord" element={<Discord />} />
              </Route>
            </Route>


            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Route>

        </Routes>
      </ResourceContext.Provider>
    </div>
  );
}

export default App;
