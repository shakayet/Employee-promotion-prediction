import { useContext, useEffect, useState } from "react";
import { BiUpvote, BiSolidUpvote, BiSolidDownvote, BiDownvote} from "react-icons/bi";
import { AuthContext } from "../firebase/Auth";

const PostCard = ({ post, onVote,setPosts}) => {
    const {user} = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const [alreadyVoted, setAlreadyVoted] = useState(false)
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments);


  const handleRefresh = async() =>{
        try {
            const response = await fetch("http://127.0.0.1:5000/posts");
            const data = await response.json();
            setPosts(data);
            checkIfVoted();
          }
          catch (error) {
            console.error("Error fetching posts:", error);
          }
    }

  const checkIfVoted = () => {
    if (post?.voters_email?.includes(user?.email)) {
        setAlreadyVoted(true);
        setMessage("");
        }
    else if(post?.email === user?.email){
        setAlreadyVoted(true);
        setMessage("You can not vote your own post post.");
    }
    };

    useEffect(() => {
        checkIfVoted();
    }, [user]);

  const handleVote = async (type) => {
    setLoading(true);
    setAlreadyVoted(true);
    checkIfVoted();
    try {
      const response = await fetch("http://127.0.0.1:5000/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: post._id,
          type,
          email:user?.email
        }),
      });
      const data = await response.json();
      console.log(data); // Handle response
      onVote(); // Callback to refresh post data (if needed)
    } catch (error) {
      console.error("Error voting:", error);
    } finally {
        
        handleRefresh()
    checkIfVoted();
      setLoading(false);
    }
  };

  const handleCommentSubmit = async () => {

    if (comment.trim() === "") {
        setMessage("Comment cannot be empty.");
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: user?.displayName,
                comment: comment,
                id:post?._id
            }),
        });

        const result = await response.json();

        if (response.ok) {
            setMessage(result.message);
            setComments([...comments, { name: user?.displayName, text: comment }]);
            setComment("");
        } else {
            setMessage(result.error || "An error occurred.");
        }
    } catch (error) {
        setMessage("An error occurred while posting your comment.");
    }
};

  return (
    <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="flex items-center mb-4">
                {/* Author's Photo */}
                <img
                    src={post.photoUrl || "https://via.placeholder.com/50"}
                    alt={post.name}
                    className="w-12 h-12 rounded-full mr-3"
                />
                {/* Author's Name */}
                <div>
                    <h2 className="font-bold text-lg">{post.name}</h2>
                    <p className="text-sm text-gray-500">{post.email}</p>
                </div>
            </div>
      <p className="text-gray-800">{post.text}</p>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handleVote('upvote')}
          className={`inline-flex ${alreadyVoted ? 'disabled' : ''} items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={alreadyVoted}
        >
          {post.upVote}
          {(alreadyVoted)?
            <BiSolidUpvote/>:<BiUpvote/>}
        </button>
        <button
          onClick={() => handleVote('downvote')}
          className={`inline-flex ${alreadyVoted ? 'disabled' : ''} items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={alreadyVoted}
        >
          {post.downVote}
          {(alreadyVoted)?
            <BiSolidDownvote/>:<BiDownvote/>}
        </button>
      </div>
      {message && <p className="text-red-500 mt-2">{message}</p>}

        {/* Comments Section */}
        <div className="comments-section mt-6">
                <h3 className="font-bold mb-2">Comments</h3>
                {comments?.length > 0 ? (
                    <ul className="list-disc pl-4">
                        {comments?.map((comment, index) => (
                            <li key={index} className="mb-2">
                                <p className="font-bold">{comment.name}</p>
                                <p>{comment.text}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No comments yet.</p>
                )}

                {/* Comment Input */}
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2 border rounded mt-4"
                    placeholder="Write a comment..."
                />

                {/* Post Comment Button */}
                <button
                    onClick={handleCommentSubmit}
                    className="bg-blue-500 text-white py-1 px-4 rounded mt-2"
                >
                    Post Comment
                </button>
            </div>
    </div>
  );
};

export default PostCard;
