import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Post(props) {
	console.log(props.image);

	const [isClicked, setIsClicked] = useState(false);

	const handleClick = () => {
	  setIsClicked(true);
	};

	return (     
		<div className="flex flex-col items-center justify-left h-auto min-h-fit mx-auto rounded-xl shadow-xl bg-[#b3cf99]">
			<div className="w-full px-5 py-5">
				<div className="flex flex-row gap-5 items-center mb-2 justify-between">
					<p className="font-bold text-xl text-gray-800">{props.title}</p>
					<p className='font-semibold text-gray-500'>@ {props.location.addressName}</p>
				</div>
				<p className="font-semibold text-gray-700">{props.body}</p>
			</div>
			<img src={"http://localhost:5000/" + props.image.filename}/>
			<div className="px-5 my-2">
				<button onClick={handleClick} disabled={isClicked} className="text-lg text-center items-center font-bold text-[#658354]">
					{isClicked ? 'Already Received!' : 'I Want This'}
				</button>
			</div>
		</div>
	);
}