import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { JSON_API_URL } from '../../config';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${JSON_API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div key={user.id} className="bg-white rounded shadow p-4">
              <h2 className="text-xl font-bold mb-2">{user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Username: {user.username}</p>
              <Link
                to={`/users/${user.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 inline-block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
