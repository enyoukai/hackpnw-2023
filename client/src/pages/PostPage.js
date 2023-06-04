import { Post } from '../components/Post'

import { useParams, Link } from 'react-router-dom';

export function PostPage() {
    
    return (
        <div className="flex flex-col items-center justify-left h-auto min-h-fit w-1/2 mx-auto">
            <h2> {} </h2>
            <p> {} </p>
            <Link to='/'>Back</Link>
        </div>
    );
}

export default PostPage;