import { useState, useEffect } from "react";
import PostCard from "./PostCard";
const PostList = ({posts,setPosts}) => {([]);

  // Function to fetch posts from the backend
  const fetchPosts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };


  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      {posts?.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts?.map((post) => (
          <PostCard key={post._id} post={post} onVote={fetchPosts} setPosts={setPosts}/>
        ))
      )}
    </div>
  );
};

export default PostList;
