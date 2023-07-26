import React from 'react';

const PageFooter = () => {
  return (
    <footer className="bg-gradient-to-r text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg">
          &copy; {new Date().getFullYear()} Made by <a href='https://www.linkedin.com/in/jonas-%C5%BE-02035a254' target='_blank'>J. Žukauskas</a>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default PageFooter;
