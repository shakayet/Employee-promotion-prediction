import React, { useState, useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { app } from '../firebase/firebase.config';
import { FaGoogle } from 'react-icons/fa'; // Importing Google icon

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Login = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    // Handle login for email and password
    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
    };

    // Use effect to navigate after successful login (either Google or email/password)
    useEffect(() => {
        if (user || googleUser) {
            navigate('/'); // Redirect to home page
        }
    }, [user, googleUser, navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100 to-blue-100"> {/* Lighter gradient background */}
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-green-600">Login</h2>

                {/* Email/Password Login */}
                <form onSubmit={handleLogin}>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                className="mr-2"
                            />
                            <label htmlFor="rememberMe" className="text-gray-700">Remember me</label>
                        </div>
                        <Link to="/forgot-password" className="text-green-500 hover:underline">Forgot password?</Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-bold transition duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    {error && <p className="text-red-500 text-center mt-4">{error.message}</p>}
                </form>

                {/* Horizontal Line with "or" */}
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Google Sign-In */}
                <button
                    onClick={() => signInWithGoogle()}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-lg flex items-center justify-center font-bold transition duration-300"
                    disabled={googleLoading}
                >
                    <FaGoogle className="mr-2" /> {/* Google icon */}
                    {googleLoading ? 'Signing in with Google...' : 'Sign in with Google'}
                </button>
                {googleError && <p className="text-red-500 text-center mt-4">{googleError.message}</p>}

                <p className="text-center mt-6">
                    Don't have an account? <Link to="/signup" className="text-green-500 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
