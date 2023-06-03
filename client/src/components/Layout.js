import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export function Layout() {
	return (
		// <div className="bg-gradient-to-r from-purple-500 to-pink-500 bg-repeat h-screen">
		<div className="bg-repeat h-screen">
			<Header/>
			<Outlet/>
		</div>
	);
}