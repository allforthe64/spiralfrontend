import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <nav className='pt-3 pl-6 flex'>
            <p className='text-white headings text-3xl font-bold'><Link to={'/'}>Spiral</Link></p>
            <ul className="flex w-6/12 justify-around ml-[42%]">
            <li className="leading-loose info-txt text-white text-lg hover:underline"><Link to={'/get-started'}>Get Started</Link></li>
                {/* <li className="leading-loose info-txt text-white text-lg hover:underline"><Link to={'/'}>Dashboard</Link></li> */}
                <li className="leading-loose info-txt text-white text-lg hover:underline"><Link to={'/resources'}>Resources</Link></li>
                {/* <li className="leading-loose info-txt text-white text-lg hover:underline"><Link to={'/'}>Discord</Link></li> */}
                <li className="leading-loose info-txt text-white text-lg hover:underline"><Link to={'/'}>Login/Sign up</Link></li>
            </ul>
        </nav>
    )
}

export default Nav