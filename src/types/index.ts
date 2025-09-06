export interface User {
  id: string;
  name: string;
  email: string;
  type: 'client' | 'developer';
  avatar?: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  joinedDate: string;
}

export interface ClientProfile extends User {
  company?: string;
  industry?: string;
  projectsPosted: number;
  totalSpent: number;
}

export interface DeveloperProfile extends User {
  skills: string[];
  hourlyRate: number;
  portfolio: PortfolioItem[];
  experience: string;
  completedProjects: number;
  successRate: number;
  languages: string[];
  availability: 'available' | 'busy' | 'unavailable';
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  projectUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  budget: {
    min: number;
    max: number;
  };
  timeline: string;
  skills: string[];
  client: ClientProfile;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  bids: Bid[];
  postedDate: string;
  featured: boolean;
  files?: string[];
}

export interface Bid {
  id: string;
  projectId: string;
  developer: DeveloperProfile;
  amount: number;
  timeline: string;
  proposal: string;
  milestones?: Milestone[];
  submittedDate: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'file';
  fileUrl?: string;
}

export interface Chat {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
  projectId?: string;
}

export type ProjectCategory = 
  | 'static-website'
  | 'dynamic-website'
  | 'ecommerce-website'
  | 'mobile-app'
  | 'web-application'
  | 'ui-ux-design';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'bid' | 'message' | 'payment' | 'project' | 'system';
  read: boolean;
  timestamp: string;
  actionUrl?: string;
}