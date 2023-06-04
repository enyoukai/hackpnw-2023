import { Link, NavLink } from 'react-router-dom'
import logo from '../yummylogo.PNG'
import { useSession } from '../hooks/useSession';

export function Header() { 
	const { isAuthenticated } = useSession();

	console.log(isAuthenticated);

	return (
		<header className="flex flex-row justify-between px-80">
			<div className="flex flex-row gap-10">
				<Link to="/" className="w-40 my-auto">
					<img src={logo} className='w-full h-auto'/>
				</Link>
				<nav className="py-4 flex flex-row justify-around gap-10">
					<NavLink className={({ isActive }) => `text-lg font-semibold ${isActive ? 'text-gray-800' : 'text-gray-500'}`} to='/'>Home</NavLink>
					<NavLink className={({ isActive }) => `text-lg font-semibold ${isActive ? 'text-gray-800' : 'text-gray-500'}`} to='discover'>Discover</NavLink>
				</nav>
			</div>
			{
				isAuthenticated ? 
				<div className="flex flex-row w-10 justify-center items-center">
					<img className="justify-center items-center rounded-full" src="https://i1.sndcdn.com/avatars-Why2guyttlTy7IKw-P2j7wA-t240x240.jpg"/>
				</div> :
				<div className="flex flex-row gap-10 my-auto">
					<NavLink className={({ isActive }) => `text-lg font-semibold ${isActive ? 'text-gray-800' : 'text-gray-500'}`} to='login'>Log In</NavLink>
					<NavLink className={({ isActive }) => `text-lg font-semibold ${isActive ? 'text-gray-800' : 'text-gray-500'}`} to='register'>Register</NavLink>
				</div>
			}
		</header>
	);
}

