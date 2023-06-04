import { Link } from 'react-router-dom';

export function Post(props) {
	console.log(props.image);
	return (    
        <Link className="w-1/2 mx-auto border h-auto" to={`/posts/${props.id}`}>    
			<div className="flex flex-col items-center justify-left h-auto min-h-fit">
				<h1 className="font-bold">
					{props.title}
				</h1>
				<h2>
					{props.body}
				</h2>
				<img src={"http://localhost:5000/" + props.image.filename}/>
				<h2>
					{props.resolved}
				</h2>
			</div>
        </Link>
	);
}