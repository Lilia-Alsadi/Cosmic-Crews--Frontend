import React from 'react';
import Navbar from './Navbar';

const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <Navbar />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default PublicLayout;
