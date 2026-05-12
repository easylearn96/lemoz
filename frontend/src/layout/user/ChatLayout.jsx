import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Particles from '@/components/common/Particles';
import ChatSidebar from '@/components/chat/ChatSidebar';
import { Menu } from 'lucide-react';

const ChatLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden relative">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full mix-blend-screen opacity-50 animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[100px] rounded-full mix-blend-screen opacity-40"></div>
        <Particles className='absolute inset-0 z-0 opacity-50' ease={80} quantity={80} staticity={30} />
      </div>

      <ChatSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 bg-transparent relative z-10">
        <div className="lg:hidden p-4 border-b border-white/10 flex items-center bg-black/40 backdrop-blur-md">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-white hover:bg-white/10 rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
          <span className="ml-4 font-semibold text-lg">Chats</span>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ChatLayout;
