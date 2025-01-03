import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./Components/Root/Root";
import Error from "./Components/Error/Error";
import Form from "./Form";
import Home from "./Home/Home";
import Login from "./Login/Login";
import AuthProvider from './firebase/Auth'; // Correct AuthProvider import
import SignUp from "./Signup/Signup";
import Discussion from "./Discussion/Discussion";
import Faq from "./Components/FAQ/Faq";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />, // Custom error element
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/predict',
        element: <Form />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/discussion',
        element: <Discussion></Discussion>
      },
      {
        path: '/faq',
        element: <Faq></Faq>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider> {/* Correct AuthProvider wrapping */}
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthProvider>
);
