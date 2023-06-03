import { useState } from 'react'

import { Post } from '../components/Post'

import { CreatePostPopup } from '../components/CreatePostPopup'

export function Home() {
	const posts = [{id: 1, title: "ra", body: "ra"}, {id: 2, title: "gra", body: "gra"}, {id: 3, title: "ah", body: "ah"}];

	const [isPopupOpen, setPopupOpen] = useState(false);

	const handleOpenPopup = () => {
	  setPopupOpen(true);
	};
  
	const handleClosePopup = () => {
	  setPopupOpen(false);
	};

	return (
		<div clasName="pt-10">
			<button onClick={handleOpenPopup}> open popup </button>
			{isPopupOpen && <CreatePostPopup onClose={ handleClosePopup}/>}
			<div className="flex flex-col gap-10">
				{ posts.map((post) => 
					<Post id={post.id} title={post.title} body={post.body}/>
				) }
			</div>
		</div>
	)
}