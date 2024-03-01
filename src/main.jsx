import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/login/Login.jsx';
import SignUp from './pages/registration/SignUp.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <App />,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render( <RouterProvider router={router} />

)
