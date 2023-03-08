import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = ({ func }) => {
    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            func()
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Incorrect Username or Password');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    return (

        <section className='py-20'>
            <div className='h-10 mb-6'>
                <p ref={errRef} className={errMsg ? "errmsg w-6/12 ml-[25%]" : "offscreen"} aria-live="assertive">{errMsg}</p>
            </div>
            <h1 className='text-white headings font-bold text-5xl mb-16'>Sign In to Spiral</h1>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    className='w-4/12 bg-inherit border-b-2 outline-0 text-white info-txt text-2xl pl-2 pb-px mb-6'
                    placeholder='username'
                />
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    className='w-4/12 bg-inherit border-b-2 outline-0 text-white info-txt text-2xl pl-2 pb-px mb-7'
                    placeholder='password'
                />
                <div className="persistCheck mr-[19%] mb-14">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist" className='text-white info-txt text-lg leading-tight pl-3'>Trust This Device</label>
                </div>
                <button className='info-txt font-bold text-2xl mb-8 bg-alien-green py-px px-8 rounded-md'>Sign In</button>
            </form>
            <p className='text-white'>
                Need an Account?<br/>
                <span className="line">
                    <Link to="/register" className='text-white hover:underline'>Sign Up</Link>
                </span>
            </p>
        </section>

    )
}

export default Login