import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DataContextFunction from './context/context';
import Layout from './components/layout/Layout.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import WelcomePage from './components/WelcomePage/WelcomePage.jsx';
import { ToastContainer } from 'react-toastify';
import ForgetPassword from './components/ForgetPassword/ForgetPassword.jsx';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated/RedirectIfAuthenticated.jsx';
import Profile from './components/Profile/Profile.jsx';
import Notfoundpage from './components/Notfoundpage/Notfoundpage.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import Protected from './components/Protucted/Protucted.jsx';
import TouristDestinations from './components/Tourist-Destinations/Tourist-Destinations.jsx';
import TouristItineraries from './components/Tourist-Itineraries/Tourist-Itineraries.jsx';
import Accommodation from './components/Accommodation/Accommodation.jsx';
import Transportation from './components/Transportation/Transportation.jsx';
import ReviewsOfUsers from './components/Reviews-of-Users/Reviews-of-Users.jsx';

export default function App() {
  // Set up the router
  let router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { index: true, element: <WelcomePage /> },
        { path: '/HomePage', element: <Protected><HomePage /></Protected> },
        { 
          path: '/login', 
          element: <RedirectIfAuthenticated><Login /></RedirectIfAuthenticated> 
        },
        { 
          path: '/signup', 
          element: <RedirectIfAuthenticated><Signup /></RedirectIfAuthenticated> 
        },
        { path: '/forgot-password', element: <ForgetPassword /> },
        { path: '/profile', element: <Protected><Profile /></Protected> },
        { path: '/Tourist-Destinations', element: <Protected><TouristDestinations /></Protected> },
        { path: '/Tourist-Itineraries', element: <Protected><TouristItineraries /></Protected> },
        { path: '/Accommodation', element: <Protected><Accommodation /></Protected> },
        { path: '/Transportation', element: <Protected><Transportation /></Protected> },
        { path: '/Reviews-of-Users', element: <Protected><ReviewsOfUsers /></Protected> },
        { path: "*", element: <Notfoundpage /> }
      ]
    }
  ]);

  return (
    <DataContextFunction>
      <RouterProvider router={router} />
      <ToastContainer /> {/* Include ToastContainer here if you need to display notifications */}
    </DataContextFunction>
  );
}
