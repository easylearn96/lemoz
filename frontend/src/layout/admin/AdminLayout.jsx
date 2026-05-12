import React, { useState } from 'react';
import { Sidebar } from '@/components/admin/SideBar';
import { Outlet } from 'react-router';

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handlePageChange = (pageId) => {
    setCurrentPage(pageId);
  };

  const handleLogout = () => {
    // Logout logic is handled in Sidebar via redux but we can add more here if needed
    console.log("Admin Logout");
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <Sidebar 
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleSidebar}
        onLogout={handleLogout}
      />
      <main className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-[280px]'} p-8`}>
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
