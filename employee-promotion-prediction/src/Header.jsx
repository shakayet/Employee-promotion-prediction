import { useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './firebase/Auth';
import logo from './assets/logo.png'

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const [photoURL, serPhotoURL] = useState('')

    useEffect(() => {
        serPhotoURL(user?.photoURL)
    }, [user]);
    
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    };

    const navOptions = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/predict">Predict</Link></li>
            {user?.email ? (
                <>
                    <li><Link to="/discussion">Discussion</Link></li>
                    <li><button onClick={handleLogOut}>Log out</button></li>
                </>
            ) : (
                <li><Link to="/login">Login</Link></li>
            )}
            <li><Link to="/faq">FAQ</Link></li>
        </>
    );

    return (
        <div>
            {/* Fixed Navbar */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-green-300">
                <div className="navbar">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow font-bold">
                                {navOptions}
                            </ul>
                        </div>
                        <div className="w-14 h-14">
                            <a href="/">
                                <img src={logo} alt="Transparent Image" />
                            </a>
                        </div>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 font-bold">
                            {navOptions}
                        </ul>
                    </div>
                    <div className="navbar-end flex items-center">
                        {!user ? (
                            <></>
                        ) : user?.photoURL ? (
                            <img
                                src={photoURL}
                                alt="User"
                                className="w-14 h-14 rounded-full object-cover mr-4"
                                style={{ width: '50px', height: '50px' }}
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                                <span className="text-xl text-white">{user?.displayName[0]}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Your Actual Page Content */}
            <div className="pt-16"></div>
        </div>
    );
};

export default Header;
