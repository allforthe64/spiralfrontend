import { Link, useNavigate } from 'react-router-dom'
import useLogout from '../hooks/useLogout';

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
            
            <ul className="flex justify-around w-[55%] ml-[12%] pt-4">
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