import React, { useState, useEffect } from 'react';
import { Post } from '../components/Post'
import axios from 'axios';

export function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        try {
            const response = await axios.get('/posts');
            setPosts(response.data);
        } catch(error) {
            console.error('Error fetching posts: ', error);
        }
    };

    return(
        <div className="flex flex-col gap-10">
				{ posts.map((post) => 
					<Post id={post.id} title={post.title} body={post.body}/>
				) }
        </div>
    )
}