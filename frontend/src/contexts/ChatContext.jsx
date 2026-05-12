import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [shouldRefetchSidebar, setShouldRefetchSidebar] = useState(false);

  const triggerSidebarRefetch = () => setShouldRefetchSidebar(true);
  const resetSidebarRefetch = () => setShouldRefetchSidebar(false);

  return (
    <ChatContext.Provider value={{ shouldRefetchSidebar, triggerSidebarRefetch, resetSidebarRefetch }}>
      {children}
    </ChatContext.Provider>
  );
};
