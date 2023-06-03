import { Post } from '../components/Post'

import { useParams, Link } from 'react-router-dom';

export function PostPage() {
    const { postId } = useParams(); 

    return (
        <div className="flex flex-col items-center justify-left h-auto min-h-fit bg-gray-100 w-1/2 mx-auto">
            <h2> Post!!!!! </h2>
            <p> post number {postId} </p>
            <Link to='/'>Back</Link>
        </div>
    );
}

export default PostPage;