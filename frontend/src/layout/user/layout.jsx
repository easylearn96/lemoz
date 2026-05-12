import React from 'react';
import { Outlet } from 'react-router';

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* You can add a Navbar or Sidebar for users here if needed */}
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
