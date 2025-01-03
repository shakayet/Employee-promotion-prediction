import { Link, useNavigate } from 'react-router-dom'; // import useNavigate
import { useContext, useState } from 'react';
import { AuthContext } from '../firebase/Auth';
import { FaGoogle } from 'react-icons/fa'; // Importing Google icon

const SignUp = () => {
    const { createUser } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();  // initialize useNavigate

    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        // Clear any previous errors
        setError('');

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log('Created user:', user);
                // Redirect to the home page after successful signup
                navigate('/'); // or use '/home' if that's the home route
            })
            .catch(error => {
                // Handle specific errors
                if (error.code === 'auth/email-already-in-use') {
                    setError('This email is already in use. Please use a different email.');
                } else if (error.code === 'auth/invalid-email') {
                    setError('Invalid email address. Please enter a valid email.');
                } else if (error.code === 'auth/weak-password') {
                    setError('Password is too weak. Please choose a stronger password.');
                } else {
                    setError('Error: ' + error.message);
                }
                console.log(error);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100 to-blue-100"> {/* Lighter gradient background */}
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-green-600">Sign Up</h2>

                <form onSubmit={handleSignUp}>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-center my-4">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-bold transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Horizontal Line with "or" */}
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Google Sign-Up */}
                <button
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-lg flex items-center justify-center font-bold transition duration-300"
                >
                    <FaGoogle className="mr-2" /> Sign up with Google
                </button>

                <p className="text-center mt-6">
                    Already have an account? <Link to="/login" className="text-green-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
