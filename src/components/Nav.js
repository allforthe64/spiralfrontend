import { Link, useNavigate } from 'react-router-dom'
import useLogout from '../hooks/useLogout';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from '@fortawesome/free-solid-svg-icons';

import useAuth from "../hooks/useAuth"


const Nav = () => {

    const { auth } = useAuth()

    const navigate = useNavigate()
    const logout = useLogout()

    const signout = async () => {
        await logout()
        navigate('/');
    }

    return (
        <nav className='pt-3 pl-6 flex'>
            <div className='w-4/12'>
                <Link to={'/'} className='flex items-center'>
                    <img src='./Logo_White_Green.png' alt='logo' className="w-2/12" />
                    <span className='text-white headings text-3xl font-bold pl-5'>Spiral</span>
                </Link>
            </div>
            
            <FontAwesomeIcon icon={faBars} className='text-white text-3xl md:hidden mt-px ml-[55%]'/>

            <ul className="md:flex md:justify-around md:w-[55%] md:ml-[12%] md:pt-4 hidden">
                <li className="info-txt text-white md:text-lg hover:underline text-sm"><Link to={'/get-started'}>Get Started</Link></li>
                {auth.id && (auth.roles.includes(2001) || auth.roles.includes(5150)) && 
                    
                    <li className="info-txt text-white md:text-lg hover:underline text-sm"><Link to={'/dashboard'}>Dashboard</Link></li>
                }
                <li className="info-txt text-white md:text-lg hover:underline text-sm"><Link to={'/resources'}>Resources</Link></li>
                {/* <li className="leading-loose info-txt text-white text-lg hover:underline"><Link to={'/admin'}>Admin</Link></li> */}
                {!auth.id &&
                    <>
                        <li className="info-txt text-white md:text-lg hover:underline text-sm"><Link to={'/login'}>Login</Link></li>
                        <li className="info-txt text-white md:text-lg hover:underline text-sm"><Link to={'/register'}>Sign up</Link></li>
                    </> 
                }
                {auth.id && 
                    <li className="leading-loose info-txt text-white md:text-lg text-sm"><button onClick={signout} className='hover:underline'>Signout</button></li>
                }
            </ul>
        </nav>
    )
}

export default Nav