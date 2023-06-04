import { useState, useEffect } from 'react'

import { Post } from '../components/Post'
import axios from 'axios'

import { CreatePostPopup } from '../components/CreatePostPopup'

import { useSession } from '../hooks/useSession'

import { AllPosts } from '../components/AllPosts'

export function Home() {
	const posts = [{id: 1, title: "ra", body: "ra"}, {id: 2, title: "gra", body: "gra"}, {id: 3, title: "ah", body: "ah"}];

	const { user, login, logout } = useSession();

	const [isPopupOpen, setPopupOpen] = useState(false);

	const handleOpenPopup = () => {
	  setPopupOpen(true);
	};
  
	const handleClosePopup = () => {
	  setPopupOpen(false);
	};


	return (
		<div clasName="pt-10">
			{user ? (
				<div>
					<p>Welcome, {user.username}!</p>
				</div>
			) : (
				<div>
					<p>Please login to continue.</p>
				</div>
			)}
			<button onClick={handleOpenPopup}> open popup </button>
			{isPopupOpen && <CreatePostPopup onClose={ handleClosePopup}/>}
			
			<AllPosts/>
		</div>
	)
}