import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import Header from './components/common/Header';
import Hero from './components/home/Hero';
import Features from './components/home/Features';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ProjectCard from './components/projects/ProjectCard';
import ProjectFilters from './components/projects/ProjectFilters';
import DashboardStats from './components/dashboard/DashboardStats';
import RecentActivity from './components/dashboard/RecentActivity';
import { mockProjects } from './data/mockData';

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [projects, setProjects] = useState(mockProjects);
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      setCurrentPage('dashboard');
    } else {
      setShowAuthModal(true);
      setAuthMode('register');
    }
  };

  const handleFiltersChange = (filters: any) => {
    let filtered = [...mockProjects];

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.skills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(project => project.category === filters.category);
    }

    // Apply budget filter
    if (filters.budgetRange) {
      const [min, max] = filters.budgetRange.includes('+') 
        ? [parseInt(filters.budgetRange.replace('+', '')), Infinity]
        : filters.budgetRange.split('-').map(Number);
      
      filtered = filtered.filter(project => 
        project.budget.min >= min && (max === Infinity || project.budget.max <= max)
      );
    }

    // Apply skills filter
    if (filters.skills.length > 0) {
      filtered = filtered.filter(project =>
        filters.skills.some((skill: string) => project.skills.includes(skill))
      );
    }

    setFilteredProjects(filtered);
  };

  const renderPage = () => {
    if (!isAuthenticated && currentPage !== 'home' && currentPage !== 'browse-projects') {
      setCurrentPage('home');
      return null;
    }

    switch (currentPage) {
      case 'home':
        return (
          <div>
            <Hero onGetStarted={handleGetStarted} />
            <Features />
            
            {/* Featured Projects Preview */}
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Featured Projects
                  </h2>
                  <p className="text-xl text-gray-600">
                    Discover exciting opportunities from top clients
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {mockProjects.filter(p => p.featured).slice(0, 3).map(project => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onViewProject={() => setShowAuthModal(true)}
                      showBidButton={false}
                    />
                  ))}
                </div>
                
                <div className="text-center">
                  <button
                    onClick={() => setCurrentPage('browse-projects')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                  >
                    View All Projects
                  </button>
                </div>
              </div>
            </section>
          </div>
        );

      case 'browse-projects':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Projects</h1>
              <p className="text-gray-600">
                Find the perfect project that matches your skills and interests
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <ProjectFilters onFiltersChange={handleFiltersChange} />
              </div>
              
              <div className="lg:col-span-3">
                <div className="mb-6 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {filteredProjects.length} of {mockProjects.length} projects
                  </div>
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>Sort by: Latest</option>
                    <option>Sort by: Budget (High to Low)</option>
                    <option>Sort by: Budget (Low to High)</option>
                    <option>Sort by: Deadline</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredProjects.map(project => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onViewProject={(id) => isAuthenticated ? alert(`View project ${id}`) : setShowAuthModal(true)}
                    />
                  ))}
                </div>

                {filteredProjects.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-lg">No projects found</p>
                    <p className="text-gray-400 text-sm mt-2">Try adjusting your search criteria</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600">
                {user?.type === 'developer' 
                  ? 'Here\'s an overview of your freelance activity'
                  : 'Manage your projects and find the best developers'
                }
              </p>
            </div>

            <div className="space-y-8">
              <DashboardStats />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {user?.type === 'developer' ? 'Available Projects' : 'Your Projects'}
                    </h3>
                    <div className="space-y-4">
                      {mockProjects.slice(0, 3).map(project => (
                        <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <h4 className="font-semibold text-gray-900 mb-2">{project.title}</h4>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-green-600 font-semibold">
                              ₹{project.budget.min.toLocaleString()} - ₹{project.budget.max.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500">{project.bids.length} bids</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <RecentActivity />
                </div>
              </div>
            </div>
          </div>
        );

      case 'post-project':
        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Post a New Project</h1>
              <div className="text-center py-12 text-gray-500">
                <p>Project posting form would go here...</p>
                <p className="text-sm mt-2">This feature is coming soon!</p>
              </div>
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Messages</h1>
              <div className="text-center py-12 text-gray-500">
                <p>Messaging interface would go here...</p>
                <p className="text-sm mt-2">This feature is coming soon!</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-12 text-gray-500">
              <p>Page under construction...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && (
        <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      )}
      
      {!isAuthenticated && currentPage !== 'home' && currentPage !== 'browse-projects' && (
        <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      )}

      <main>
        {renderPage()}
      </main>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
            
            {authMode === 'login' ? (
              <LoginForm
                onSwitchToRegister={() => setAuthMode('register')}
                onClose={() => setShowAuthModal(false)}
              />
            ) : (
              <RegisterForm
                onSwitchToLogin={() => setAuthMode('login')}
                onClose={() => setShowAuthModal(false)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;