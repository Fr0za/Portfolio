import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ReactGA from 'react-ga';

import 'tailwindcss/tailwind.css';

import PageHeader from './Components/PageHeader/PageHeader';
import PageFooter from './Components/PageFooter/PageFooter';

import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Projects from './Pages/Projects/Projects';
import Contacts from './Pages/Contacts/Contacts';
import DogsAPI from './Pages/DogsAPI/DogsAPI';

import JsonAPI from './Pages/JsonAPI/JsonAPI';
import Posts from './Pages/JsonAPI/Posts';
import Users from './Pages/JsonAPI/Users';
import User from './Pages/JsonAPI/User';

import './style/style.css';

import { googleTrackingID } from './config';
ReactGA.initialize(googleTrackingID);

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <PageHeader />

      <div className="container mx-auto py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/dogsapi" element={<DogsAPI />} />
          <Route path="/jsonapi" element={<JsonAPI />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<User />} />

          <Route
            path="*"
            element={
              <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
                <h1 className="text-4xl font-bold mb-4">Page not found</h1>
                <Link
                  to="/"
                  className="text-purple-600 hover:underline font-medium"
                >
                  Go Back to home page
                </Link>
              </div>
            }
          />
        </Routes>
      </div>

      <PageFooter />
    </div>
  );
}

export default App;
