import { Link } from 'react-router-dom';

export function Post(props) {
	return (    
        <Link className="w-1/2 mx-auto border" to={`/posts/${props.id}`}>    
			<div className="flex flex-col items-center justify-left h-auto min-h-fit">
				<h1 className="font-bold">
					{props.title}
				</h1>
				<h2>
					{props.body}
				</h2>
			</div>
        </Link>
	);
}