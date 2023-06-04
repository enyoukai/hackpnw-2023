import { useState, useEffect } from 'react'

import { Post } from '../components/Post'
import axios from 'axios'

import { CreatePostPopup } from '../components/CreatePostPopup'

import { useSession } from '../hooks/useSession'

import { AllPosts } from '../components/AllPosts'

export function Home() {
	const { user, login, logout } = useSession();

	const [isPopupOpen, setPopupOpen] = useState(false);

	const handleOpenPopup = () => {
	  setPopupOpen(true);
	};
  
	const handleClosePopup = () => {
	  setPopupOpen(false);
	};


	return (
		<div className="pt-10">
			<button onClick={handleOpenPopup}> open popup </button>
			{isPopupOpen && <CreatePostPopup onClose={ handleClosePopup}/>}
			
			<AllPosts/>
		</div>
	)
}