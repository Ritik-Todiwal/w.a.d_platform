import React from 'react';
import { Clock, DollarSign, MapPin, Star, Eye } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onViewProject: (projectId: string) => void;
  showBidButton?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onViewProject, 
  showBidButton = true 
}) => {
  const getCategoryName = (category: string) => {
    const categoryMap: Record<string, string> = {
      'static-website': 'Static Website',
      'dynamic-website': 'Dynamic Website',
      'ecommerce-website': 'E-commerce Website',
      'mobile-app': 'Mobile App',
      'web-application': 'Web Application',
      'ui-ux-design': 'UI/UX Design'
    };
    return categoryMap[category] || category;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatBudget = (min: number, max: number) => {
    return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
  };

  const timeAgo = (date: string) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {project.featured && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm font-semibold py-2 px-4 rounded-t-xl">
          ⭐ Featured Project
        </div>
      )}
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer line-clamp-2">
              {project.title}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {timeAgo(project.postedDate)}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Eye className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Budget and Timeline */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-green-600">
            <DollarSign className="w-5 h-5 mr-1" />
            <span className="font-semibold">{formatBudget(project.budget.min, project.budget.max)}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>{project.timeline}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
            {project.skills.length > 4 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                +{project.skills.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Client Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {project.client.avatar ? (
              <img
                src={project.client.avatar}
                alt={project.client.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {project.client.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <div className="font-medium text-gray-900">{project.client.name}</div>
              <div className="flex items-center text-sm text-gray-500">
                <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                <span>{project.client.rating}</span>
                <span className="mx-1">•</span>
                <span>{project.client.reviewCount} reviews</span>
              </div>
            </div>
          </div>
          
          {project.client.verified && (
            <div className="flex items-center text-green-600">
              <span className="text-sm font-medium">Verified</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span className="font-medium">{project.bids.length}</span> bids received
          </div>
          
          {showBidButton && project.status === 'open' && (
            <div className="flex space-x-3">
              <button
                onClick={() => onViewProject(project.id)}
                className="px-4 py-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                View Details
              </button>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                Submit Proposal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;