import React, { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import emailjs from 'emailjs-com';

import { emailjs_service, emailjs_template, emailjs_userID } from '../../config';

const Contacts = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmailError('');
    setSubjectError('');
    setMessageError('');
    setSuccessMessage('');
    setErrorMessage('');

    let isValid = true;
    if (!email) {
      setEmailError('Please enter your email');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }
    if (!subject) {
      setSubjectError('Please enter a subject');
      isValid = false;
    } else if (subject.length < 6) {
      setSubjectError('Subject must be at least 6 characters long');
      isValid = false;
    }
    if (!message) {
      setMessageError('Please enter a message');
      isValid = false;
    } else if (message.length < 15) {
      setMessageError('Message must be at least 15 characters long');
      isValid = false;
    }

    if (isValid) {
      emailjs
        .send(emailjs_service, emailjs_template, {
          from_email: email,
          from_subject: subject,
          message: message,
        }, emailjs_userID)
        .then((response) => {
          console.log('Email sent successfully', response);
          setSuccessMessage('Email sent successfully');
          clearForm();
        })
        .catch((error) => {
          console.error('Failed to send email', error);
          setErrorMessage('Failed to send email. Please try again later.');
        });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const clearForm = () => {
    setEmail('');
    setSubject('');
    setMessage('');
  };

  const dismissSuccessMessage = () => {
    setSuccessMessage('');
  };

  const dismissErrorMessage = () => {
    setErrorMessage('');
  };

  return (
    <div className="bg-gray-100 py-8 rounded-lg shadow-md">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Send Me an Email</h2>
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <span className="inline-block">{successMessage}</span>
            <button
              className="absolute top-0 right-0 px-4 py-3"
              onClick={dismissSuccessMessage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="inline-block">{errorMessage}</span>
            <button
              className="absolute top-0 right-0 px-4 py-3"
              onClick={dismissErrorMessage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto" noValidate>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-800 font-medium mb-1">
              Email<span className="required-label">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-green-600"
              placeholder="Enter your email"
              required
            />
            {emailError && (
              <div className="text-red-500 text-sm mt-1">{emailError}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-800 font-medium mb-1">
              Subject<span className="required-label">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-green-600"              
              placeholder='Subject must be at least 6 characters long'
              required
            />
            {subjectError && (
              <div className="text-red-500 text-sm mt-1">{subjectError}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-800 font-medium mb-1">
              Message<span className="required-label">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-green-600"
              placeholder='Message must be at least 15 characters long'
              required
            ></textarea>
            {messageError && (
              <div className="text-red-500 text-sm mt-1">{messageError}</div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-900"
          >
            Send Email
          </button>
        </form>
        <div className="flex items-center space-x-4 mt-8">
          <a
            href="https://github.com/Fr0za"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-gray-800 hover:text-blue-600"
          >
            <FaGithub className="text-2xl" />
          </a>
          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-gray-800 hover:text-blue-600"
          >
            <FaLinkedin className="text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
