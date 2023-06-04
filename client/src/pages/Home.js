import { useState, useEffect } from 'react'

import { Post } from '../components/Post'
import axios from 'axios'

import { CreatePostPopup } from '../components/CreatePostPopup'

import { useSession } from '../hooks/useSession'

import { AllPosts } from '../components/AllPosts'

export function Home() {
	const { isAuthenticated } = useSession();

	const [isPopupOpen, setPopupOpen] = useState(false);

	const handleOpenPopup = () => {
	  setPopupOpen(true);
	};
  
	const handleClosePopup = () => {
	  setPopupOpen(false);
	};


	return (
		<div className="pt-4 flex flex-col items-center">
			{isAuthenticated &&
			<button
				className="px-4 py-2 mb-4 text-white bg-[#658354] font-bold rounded shadow-xl"
				onClick={handleOpenPopup}
			>
				Create Post
      		</button> }
			{isPopupOpen && <CreatePostPopup onClose={ handleClosePopup}/>}
			
			<AllPosts/>
			<div className="bg-[#DDEAD1] h-16"/>
		</div>
	)
}