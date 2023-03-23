import { Link, useNavigate } from 'react-router-dom'
import useLogout from '../hooks/useLogout';


const Nav = () => {

    const navigate = useNavigate()
    const logout = useLogout()

    const signout = async () => {
        await logout()
        navigate('/');
    }

    return (
        <nav className='pt-3 pl-6 flex'>
            <div >
                <Link to={'/'} className='flex items-center'>
                    <img src='./Logo_White_Green.png' alt='logo' className="w-2/12" />
                    <span className='text-white headings text-3xl font-bold pl-5'>Spiral</span>
                </Link>
            </div>
            
            <ul className="flex w-8/12 justify-around ml-[42%]">
                <li className="leading-loose info-txt text-white text-lg hover:underline"><Link to={'/get-started'}>Get Started</Link></li>
                <li className="leading-loose info-txt text-white text-lg hover:underline"><Link to={'/dashboard'}>Dashboard</Link></li>
                <li className="leading-loose info-txt text-white text-lg hover:underline"><Link to={'/resources'}>Resources</Link></li>
                <li className="leading-loose info-txt text-white text-lg hover:underline"><Link to={'/admin'}>Admin</Link></li>
                <li className="leading-loose info-txt text-white text-lg hover:underline"><Link to={'/login'}>Login</Link></li>
                <li className="leading-loose info-txt text-white text-lg hover:underline"><Link to={'/register'}>Sign up</Link></li>
                <li className="leading-loose info-txt text-white text-lg hover:underline"><button onClick={signout}>Signout</button></li>
            </ul>
        </nav>
    )
}

export default Nav