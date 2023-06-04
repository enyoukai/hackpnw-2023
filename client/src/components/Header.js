import { Link, NavLink } from 'react-router-dom'
import logo from '../logo.png'

export function Header() { 
	return (
		<header className="flex flex-row justify-between border border-gray-300 px-80">
			<div className="flex flex-row gap-10">
				<Link to="/" className="w-40 my-auto">
					<img src={logo} className='w-full h-auto'/>
				</Link>
				<nav className="py-4 flex flex-row justify-around gap-10">
					<NavLink className={({ isActive }) => `text-lg font-semibold ${isActive ? 'text-gray-800' : 'text-gray-500'}`} to='/'>Home</NavLink>
					<NavLink className={({ isActive }) => `text-lg font-semibold ${isActive ? 'text-gray-800' : 'text-gray-500'}`} to='about'>Discover</NavLink>
				</nav>
			</div>
			<div className="flex flex-row gap-10 my-auto">
				<NavLink className={({ isActive }) => `text-lg font-semibold ${isActive ? 'text-gray-800' : 'text-gray-500'}`} to='login'>Log In</NavLink>
				<NavLink className={({ isActive }) => `text-lg font-semibold ${isActive ? 'text-gray-800' : 'text-gray-500'}`} to='register'>Register</NavLink>
			</div>
		</header>
	);
}

