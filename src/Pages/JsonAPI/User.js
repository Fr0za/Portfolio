import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { JSON_API_URL } from '../../config';

const User = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);

  useEffect(() => {
    fetchUser();
    fetchPostsByUser(userId);
  }, [userId]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${JSON_API_URL}/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostsByUser = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${JSON_API_URL}/posts?userId=${userId}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePersonalInfo = () => {
    setShowPersonalInfo(!showPersonalInfo);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      ) : (
        <div className="bg-white rounded shadow p-4">
          <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>

          {/* Button to toggle personal information */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
            onClick={togglePersonalInfo}
          >
            Personal Information
          </button>

          {/* Display additional user details in a card */}
          {showPersonalInfo && (
            <div className="bg-gray-100 rounded shadow p-4 mt-4">
              <h2 className="text-xl font-bold mb-2">Additional Information</h2>
              <p>Address: {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
              <p>Phone: {user.phone}</p>
              <p>Website: {user.website}</p>
              {/* Add other additional details here */}
            </div>
          )}

          {/* Display posts by the user */}
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Posts by {user.name}</h2>
            <ul>
              {posts.map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
