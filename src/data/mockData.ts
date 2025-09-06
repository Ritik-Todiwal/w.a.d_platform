import { Project, Bid, Chat, Notification, DeveloperProfile, ClientProfile, Message } from '../types';

export const mockClients: ClientProfile[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya@company.com',
    type: 'client',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 4.9,
    reviewCount: 45,
    verified: true,
    joinedDate: '2023-03-10',
    company: 'Tech Innovations Pvt Ltd',
    industry: 'Technology',
    projectsPosted: 23,
    totalSpent: 185000
  },
  {
    id: '2',
    name: 'Amit Patel',
    email: 'amit@startup.com',
    type: 'client',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 4.7,
    reviewCount: 32,
    verified: true,
    joinedDate: '2023-05-20',
    company: 'Startup Hub',
    industry: 'E-commerce',
    projectsPosted: 18,
    totalSpent: 125000
  }
];

export const mockDevelopers: DeveloperProfile[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh@dev.com',
    type: 'developer',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 4.8,
    reviewCount: 127,
    verified: true,
    joinedDate: '2023-01-15',
    skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS'],
    hourlyRate: 25,
    portfolio: [
      {
        id: '1',
        title: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with payment integration',
        image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe']
      },
      {
        id: '2',
        title: 'Business Management App',
        description: 'React Native app for small business management',
        image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
        technologies: ['React Native', 'Firebase', 'Redux']
      }
    ],
    experience: '5+ years',
    completedProjects: 89,
    successRate: 98,
    languages: ['English', 'Hindi'],
    availability: 'available'
  },
  {
    id: '2',
    name: 'Sneha Gupta',
    email: 'sneha@designer.com',
    type: 'developer',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 4.9,
    reviewCount: 95,
    verified: true,
    joinedDate: '2022-11-08',
    skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'React', 'Vue.js'],
    hourlyRate: 30,
    portfolio: [
      {
        id: '3',
        title: 'Mobile Banking App',
        description: 'Complete UI/UX design for a mobile banking application',
        image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=400',
        technologies: ['Figma', 'Prototyping', 'User Research']
      }
    ],
    experience: '4+ years',
    completedProjects: 67,
    successRate: 96,
    languages: ['English', 'Hindi'],
    availability: 'available'
  },
  {
    id: '3',
    name: 'Vikram Singh',
    email: 'vikram@fullstack.com',
    type: 'developer',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 4.6,
    reviewCount: 78,
    verified: true,
    joinedDate: '2023-02-28',
    skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker'],
    hourlyRate: 28,
    portfolio: [],
    experience: '3+ years',
    completedProjects: 45,
    successRate: 94,
    languages: ['English', 'Hindi', 'Punjabi'],
    availability: 'busy'
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Website for Fashion Brand',
    description: 'Need a modern e-commerce website for my fashion brand. Should include product catalog, shopping cart, payment integration, user accounts, and admin panel. Looking for clean, mobile-responsive design.',
    category: 'ecommerce-website',
    budget: { min: 50000, max: 100000 },
    timeline: '6-8 weeks',
    skills: ['React', 'Node.js', 'MongoDB', 'Payment Integration'],
    client: mockClients[0],
    status: 'open',
    bids: [],
    postedDate: '2024-01-15T10:30:00Z',
    featured: true
  },
  {
    id: '2',
    title: 'Mobile App for Food Delivery',
    description: 'Cross-platform mobile app for food delivery service. Features needed: restaurant listings, menu management, order tracking, payment gateway, push notifications, and admin dashboard.',
    category: 'mobile-app',
    budget: { min: 150000, max: 250000 },
    timeline: '12-16 weeks',
    skills: ['React Native', 'Firebase', 'Payment Gateway', 'Real-time Updates'],
    client: mockClients[1],
    status: 'open',
    bids: [],
    postedDate: '2024-01-20T14:15:00Z',
    featured: false
  },
  {
    id: '3',
    title: 'Corporate Website Redesign',
    description: 'Complete redesign of our corporate website. Need modern design, better user experience, SEO optimization, and content management system. Current site is outdated and not mobile-friendly.',
    category: 'dynamic-website',
    budget: { min: 25000, max: 50000 },
    timeline: '4-6 weeks',
    skills: ['WordPress', 'PHP', 'SEO', 'Responsive Design'],
    client: mockClients[0],
    status: 'in-progress',
    bids: [],
    postedDate: '2024-01-10T09:00:00Z',
    featured: false
  },
  {
    id: '4',
    title: 'SaaS Dashboard UI/UX Design',
    description: 'Need complete UI/UX design for a SaaS analytics platform. Should include dashboard layouts, charts, user management interfaces, and mobile responsive design. Looking for modern, clean design.',
    category: 'ui-ux-design',
    budget: { min: 30000, max: 60000 },
    timeline: '3-5 weeks',
    skills: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research'],
    client: mockClients[1],
    status: 'open',
    bids: [],
    postedDate: '2024-01-22T16:45:00Z',
    featured: true
  }
];

export const mockBids: Bid[] = [
  {
    id: '1',
    projectId: '1',
    developer: mockDevelopers[0],
    amount: 75000,
    timeline: '7 weeks',
    proposal: 'I can create a comprehensive e-commerce solution using React and Node.js. My approach includes modern UI design, secure payment integration with Razorpay, and scalable architecture. I have 5+ years of experience in similar projects.',
    milestones: [
      { id: '1', title: 'UI Design & Setup', description: 'Complete UI design and project setup', amount: 20000, dueDate: '2024-02-05', status: 'pending' },
      { id: '2', title: 'Product Catalog', description: 'Product listing and detail pages', amount: 25000, dueDate: '2024-02-15', status: 'pending' },
      { id: '3', title: 'Shopping Cart & Checkout', description: 'Cart functionality and payment integration', amount: 20000, dueDate: '2024-02-25', status: 'pending' },
      { id: '4', title: 'Admin Panel & Testing', description: 'Admin dashboard and final testing', amount: 10000, dueDate: '2024-03-05', status: 'pending' }
    ],
    submittedDate: '2024-01-16T11:20:00Z',
    status: 'pending'
  },
  {
    id: '2',
    projectId: '1',
    developer: mockDevelopers[2],
    amount: 85000,
    timeline: '8 weeks',
    proposal: 'I will build your e-commerce website using Django and React. My solution will include advanced features like inventory management, multiple payment options, and SEO optimization. I guarantee 100% mobile responsiveness.',
    submittedDate: '2024-01-17T09:15:00Z',
    status: 'pending'
  },
  {
    id: '3',
    projectId: '4',
    developer: mockDevelopers[1],
    amount: 45000,
    timeline: '4 weeks',
    proposal: 'I specialize in SaaS UI/UX design with 4+ years of experience. I will create a comprehensive design system with modern dashboard layouts, interactive prototypes, and detailed design specifications. My process includes user research and multiple revision rounds.',
    submittedDate: '2024-01-23T13:30:00Z',
    status: 'pending'
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: '2',
    content: 'Hi! I saw your project requirement and I\'m interested in working with you.',
    timestamp: '2024-01-18T10:30:00Z',
    read: true,
    type: 'text'
  },
  {
    id: '2',
    senderId: '2',
    receiverId: '1',
    content: 'Hello! Thanks for your interest. Could you share some similar projects you\'ve worked on?',
    timestamp: '2024-01-18T11:00:00Z',
    read: true,
    type: 'text'
  },
  {
    id: '3',
    senderId: '1',
    receiverId: '2',
    content: 'Sure! I\'ve attached my portfolio. I\'ve worked on 3 similar e-commerce projects in the last year.',
    timestamp: '2024-01-18T11:15:00Z',
    read: false,
    type: 'text'
  }
];

export const mockChats: Chat[] = [
  {
    id: '1',
    participants: [mockDevelopers[0], mockClients[0]],
    lastMessage: mockMessages[2],
    unreadCount: 1,
    projectId: '1'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'New Bid Received',
    message: 'Rajesh Kumar submitted a bid for your E-commerce Website project',
    type: 'bid',
    read: false,
    timestamp: '2024-01-16T11:20:00Z',
    actionUrl: '/dashboard/projects/1'
  },
  {
    id: '2',
    userId: '1',
    title: 'Project Message',
    message: 'You have a new message regarding your Mobile App project',
    type: 'message',
    read: false,
    timestamp: '2024-01-18T11:15:00Z',
    actionUrl: '/dashboard/messages/1'
  },
  {
    id: '3',
    userId: '1',
    title: 'Payment Processed',
    message: 'Your payment of ₹20,000 has been processed successfully',
    type: 'payment',
    read: true,
    timestamp: '2024-01-15T14:30:00Z'
  }
];