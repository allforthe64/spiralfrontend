import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import useLogout from '../hooks/useLogout';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from '@fortawesome/free-solid-svg-icons';

import useAuth from "../hooks/useAuth"


const Nav = () => {

    const { auth } = useAuth()

    const [navVis, setNavVis] = useState(false)

    const navigate = useNavigate()
    const logout = useLogout()

    const signout = async () => {
        await logout()
        navigate('/');
    }

    const showNav = () => {
        setNavVis(prev => !prev)
    }

    return (
        <>
            <nav className='pt-3 px-6 flex justify-between'>
                <div className='w-4/12'>
                    <Link to={'/'} className='flex items-center'>
                        <img src='./Logo_White_Green.png' alt='logo' className="w-2/12" />
                        <span className='text-white headings text-3xl font-bold pl-5'>Spiral</span>
                    </Link>
                </div>
                
                <div className={navVis ? 'ml-[30%] md:hidden w-[35.2%] flex justify-end pr-2 pt-px bg-white transition-color ease-in' : 'ml-[30%] md:hidden w-[35.2%] flex justify-end pr-2 pt-px transition-color duration-500 ease-in-out'}>
                    <nav id='mini-nav' className="filter-nav-1 info-txt">
                        <label htmlFor="touch-1"><FontAwesomeIcon icon={faBars} className={navVis ? 'text-black text-3xl mt-px ml-[80%]' : 'text-white text-3xl mt-px ml-[80%]'} onClick={() => showNav()}/></label>               
                        <input type="checkbox" id="touch-1" /> 

                        <ul id='mini-slide' className="slide-1 bg-white">
                            <li className="info-txt text-left md:text-lg hover:underline text-sm"><Link to={'/get-started'}>Get Started</Link></li>
                            {auth.id && (auth.roles.includes(1984) || auth.roles.includes(5150)) && 
                                
                                <li className="info-txt text-left md:text-lg hover:underline text-sm"><Link to={'/dashboard'}>Dashboard</Link></li>
                            }
                            {auth.id && (auth.roles.includes(1984) || auth.roles.includes(2001) || auth.roles.includes(5150)) && 
                                
                                <li className="info-txt text-left md:text-lg hover:underline text-sm"><Link to={'/resources'}>Resources</Link></li>
                            }
                            {auth.id && auth.roles.includes(5150) && 
                                <li className="info-txt text-left md:text-lg hover:underline text-sm"><Link to={'/admin'}>Admin</Link></li>
                            }
                            {!auth.id &&
                                <>
                                    <li className="info-txt text-left md:text-lg hover:underline text-sm"><Link to={'/login'}>Login</Link></li>
                                    <li className="info-txt text-left md:text-lg hover:underline text-sm"><Link to={'/register'}>Sign up</Link></li>
                                </> 
                            }
                            {auth.id && 
                                <li className="leading-loose info-txt text-left md:text-lg text-sm"><button onClick={signout} className='hover:underline'>Signout</button></li>
                            }
                        </ul>

                    </nav> 
                </div>

                <ul className={auth.id ? "md:flex md:justify-between md:w-[60%] lg:w-[50%] md:pt-4 hidden" : "md:flex md:justify-between w-[40%] lg:w-[30%] md:pt-4 hidden"}>
                    <li className="info-txt text-white hover:underline lg:text-base text-sm"><Link to={'/get-started'}>Get Started</Link></li>
                    {auth.id && (auth.roles.includes(1984) || auth.roles.includes(5150)) && 
                            <li className="info-txt text-white lg:text-base hover:underline text-sm"><Link to={'/dashboard'}>Dashboard</Link></li>
                    }

                    {auth.id && (auth.roles.includes(1984) || auth.roles.includes(2001) || auth.roles.includes(5150)) && 
                             <li className="info-txt text-white lg:text-base hover:underline text-sm"><Link to={'/resources'}>Resources</Link></li>
                    }
                    
                    {auth.id && auth.roles.includes(5150) &&
                        <li className="info-txt text-white lg:text-base hover:underline text-sm"><Link to={'/admin'}>Admin</Link></li>
                    }
                    {!auth.id &&
                        <div className='flex'>
                            <li className="info-txt text-white lg:text-base hover:underline text-sm"><Link to={'/login'}>Login</Link></li>
                            <li className="ml-10 info-txt text-white lg:text-base hover:underline text-sm"><Link to={'/register'}>Sign up</Link></li>
                        </div> 
                    }
                    {auth.id && 
                        <li className="info-txt text-white lg:text-base text-sm"><button onClick={signout} className='lg:text-base text-sm hover:underline'>Signout</button></li>
                    }
                </ul>
            </nav>
        </>
    )
}

export default Nav