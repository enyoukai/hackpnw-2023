import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export function Layout() {
	return (
		// <div className="bg-gradient-to-r from-purple-500 to-pink-500 bg-repeat h-screen">
		<div>
			<div className="bg-[#C7DDB5] h-auto">
				<Header/>
			</div>
			<div className="bg-[#DDEAD1] h-auto min-h-screen">
				<Outlet/>
			</div>
			<div className="bg-[#C7DDB5] h-16"/>
		</div>
	);
}