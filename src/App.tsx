import { useEffect, useState, createContext } from 'react';
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
import NewResourceForm from './components/NewResourceForm';
import EditResource from './components/EditResource'

import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import useAxiosPrivate from './hooks/useAxiosPrivate';

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

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [dataObject, setDataObject] = useState<ResourceContextType>({
    arr: []
  })

  const [foo, setFoo] = useState(false)
  const changeFoo = () => {
    setFoo(prev => !prev)
  }

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getResources = async () => {

        try {
            const response = await axiosPrivate.get('/resources', {
                signal: controller.signal
            });
            console.log(response.data);
            isMounted && setDataObject({arr: response.data});
        } catch (err) {
            console.error(err);
            navigate('/', { state: { from: location }, replace: true });
        }
    }
    getResources();

    return () => {
        isMounted = false;
        controller.abort();
      }
    }, [foo])

  return (
    <div className="App bg-dark">
      <ResourceContext.Provider value={dataObject}>
        <Routes>
          <Route path={'/'} element={<Layout />}> 
            {/* public routes */}

            {/* login & register */}
            <Route path="login" element={<Login func={changeFoo}/>} />
            <Route path="register" element={<Register />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            {/* landing page routes */}
            <Route path="/" element={<Home />} />
            <Route path={'/get-started'} element={<GetStarted />} />

            {/* we want to protect these routes */}
            <Route element={<PersistLogin />}>

              {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="/resources" element={<Resources />} />
              </Route> */}

              <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />} >
                <Route path="resources">
                  <Route index element={<Resources />} />
                  <Route path=':id' element={<EditResource func={setFoo}/>} />
                  <Route path='new' element={<NewResourceForm func={setFoo}/>} />
                </Route>
              </Route>

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
