import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { JSON_API_URL } from '../../config';
import '../../style/style.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const POSTS_LIMIT = 6;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${JSON_API_URL}/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch blog posts', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSelectedPost = () => {
    setSelectedPost(null);
    setIsEditing(false);
    setSearchTerm('');
  };

  const handleEditPost = (postId) => {
    const postToEdit = posts.find((post) => post.id === postId);
    setSelectedPost(postToEdit);
    setIsEditing(true);
  };

  const handleDeletePost = async (postId) => {
    try {
      setLoading(true);
      await axios.delete(`${JSON_API_URL}/posts/${postId}`);
      fetchPosts();
      setAlertType('deleted');
      setTimeout(() => {
        setAlertType('');
      }, 3000);
      clearSelectedPost();
    } catch (error) {
      console.error('Failed to delete the post', error);
      setAlertType('error');
      setTimeout(() => {
        setAlertType('');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    try {
      setLoading(true);
      await axios.put(`${JSON_API_URL}/posts/${selectedPost.id}`, selectedPost);
      fetchPosts();
      setAlertType('edited');
      setTimeout(() => {
        setAlertType('');
      }, 3000);
      clearSelectedPost();
    } catch (error) {
      console.error('Failed to update the post', error);
      setAlertType('error');
      setTimeout(() => {
        setAlertType('');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    try {
      setLoading(true);
      await axios.post(`${JSON_API_URL}/posts`, {
        title: newPostTitle,
        body: newPostBody,
        userId: 1,
      });
      setNewPostTitle('');
      setNewPostBody('');
      fetchPosts();
      setAlertType('created');
      setTimeout(() => {
        setAlertType('');
      }, 3000);
    } catch (error) {
      console.error('Failed to create a new post', error);
      setAlertType('error');
      setTimeout(() => {
        setAlertType('');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      {alertType === 'success' && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          Success! The operation was completed successfully.
        </div>
      )}
      {alertType === 'created' && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          Post was successfully created!
        </div>
      )}
      {alertType === 'error' && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          Error! Something went wrong. Please try again.
        </div>
      )}
      {alertType === 'deleted' && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          Post was successfully deleted!
        </div>
      )}
      {alertType === 'edited' && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
          Post was successfully edited!
        </div>
      )}
      {!isEditing && (
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search Blog Posts"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-green-600"
          />
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      ) : selectedPost ? (
        <div className="bg-white rounded shadow p-4 mb-4">
          <input
            type="text"
            value={selectedPost.title}
            onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
            className="border border-gray-300 rounded-md px-4 py-2 w-full mb-2"
          />
          <textarea
            value={selectedPost.body}
            onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}
            className="border border-gray-300 rounded-md px-4 py-2 w-full mb-2"
          ></textarea>
          <div className="flex gap-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
              onClick={handleSaveEdit}
            >
              Save
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
              onClick={() => handleDeletePost(selectedPost.id)}
            >
              Delete
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2" onClick={clearSelectedPost}>
              Back to All Posts
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <input
              type="text"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder="New Post Title"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-green-600"
            />
          </div>
          <div className="mb-4">
            <textarea
              value={newPostBody}
              onChange={(e) => setNewPostBody(e.target.value)}
              placeholder="New Post Body"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-green-600"
            ></textarea>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4" onClick={handleCreatePost}>
            Create New Post
          </button>
          {filteredPosts.length === 0 ? (
            <p>No matching posts found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {showMore
                ? filteredPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded shadow p-4">
                      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                      <p>{post.body}</p>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                        onClick={() => handleEditPost(post.id)}
                      >
                        Edit Post
                      </button>
                    </div>
                  ))
                : filteredPosts.slice(0, POSTS_LIMIT).map((post) => (
                    <div key={post.id} className="bg-white rounded shadow p-4">
                      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                      <p>{post.body}</p>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                        onClick={() => handleEditPost(post.id)}
                      >
                        Edit Post
                      </button>
                    </div>
                  ))}
            </div>
          )}
          {filteredPosts.length > POSTS_LIMIT && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Posts;
