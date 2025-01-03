import React, { useEffect, useState } from 'react';
import CreatePost from './CreatePost';
import PostList from './PostList';

const Discussion = () => {
    const [posts, setPosts] = useState([]);
    

    const fetchPosts = async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/posts");
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };
    
      // Fetch posts when the component mounts
      useEffect(() => {
        fetchPosts();
      }, []);

    return (
        <div>
            <CreatePost posts={posts} setPosts={setPosts}/>
            <PostList posts={posts} setPosts={setPosts}/>
        </div>
    );
};

export default Discussion;