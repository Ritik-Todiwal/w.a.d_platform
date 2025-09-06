import React, { createContext, useContext, useState } from 'react';
import { Project, Bid, Chat, Notification } from '../types';
import { mockProjects, mockBids, mockChats, mockNotifications } from '../data/mockData';

interface AppContextType {
  projects: Project[];
  bids: Bid[];
  chats: Chat[];
  notifications: Notification[];
  addProject: (project: Omit<Project, 'id' | 'postedDate'>) => void;
  addBid: (bid: Omit<Bid, 'id' | 'submittedDate'>) => void;
  updateBidStatus: (bidId: string, status: 'pending' | 'accepted' | 'rejected') => void;
  markNotificationAsRead: (notificationId: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [bids, setBids] = useState<Bid[]>(mockBids);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const addProject = (projectData: Omit<Project, 'id' | 'postedDate'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      postedDate: new Date().toISOString(),
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const addBid = (bidData: Omit<Bid, 'id' | 'submittedDate'>) => {
    const newBid: Bid = {
      ...bidData,
      id: Date.now().toString(),
      submittedDate: new Date().toISOString(),
      status: 'pending',
    };
    setBids(prev => [newBid, ...prev]);
  };

  const updateBidStatus = (bidId: string, status: 'pending' | 'accepted' | 'rejected') => {
    setBids(prev => prev.map(bid => 
      bid.id === bidId ? { ...bid, status } : bid
    ));
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === notificationId ? { ...notification, read: true } : notification
    ));
  };

  const addNotification = (notificationData: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        projects,
        bids,
        chats,
        notifications,
        addProject,
        addBid,
        updateBidStatus,
        markNotificationAsRead,
        addNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};