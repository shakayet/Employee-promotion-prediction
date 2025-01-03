import { useContext, useState } from "react";
import { AuthContext } from "../firebase/Auth";

const CreatePost = ({setPosts}) => {
  const {user} = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postText, setPostText] = useState("");

  // Function to handle post submission
  const handlePostSubmit = async () => {
    const postData = {
      text: postText,
      name: user?.displayName,
      email: user?.email,
      photoUrl: user?.photoURL,
      upVote: 0,
      downVote: 0
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      console.log(data); // Handle response
      // Reset the form
      setPostText("");
      setIsModalOpen(false); // Close modal after submission

      try {
        const response = await fetch("http://127.0.0.1:5000/posts");
        const data = await response.json();
        setPosts(data);
      }
      catch (error) {
        console.error("Error fetching posts:", error);
      }
    } catch (error) {
      console.error("Error submitting post", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      {/* Display card */}
      <div
        className="w-full max-w-lg bg-white shadow-md rounded-lg p-4 py-4 mb-4 cursor-pointer hover:bg-gray-100"
        onClick={() => setIsModalOpen(true)}
      >
        <p className="text-gray-500">What's on your mind?</p>
      </div>

      {/* Modal for post creation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <textarea
              className="w-full h-32 p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="What's on your mind?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />

            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                onClick={handlePostSubmit}
              >
                Submit Post
              </button>
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
