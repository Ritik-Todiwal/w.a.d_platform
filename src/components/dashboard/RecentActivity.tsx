import React from 'react';
import { Clock, MessageSquare, Briefcase, DollarSign, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';

const RecentActivity: React.FC = () => {
  const { user } = useAuth();
  const { projects, bids, notifications } = useApp();

  const getRecentActivities = () => {
    const activities = [];

    // Recent notifications
    notifications.slice(0, 3).forEach(notification => {
      activities.push({
        id: notification.id,
        type: notification.type,
        title: notification.title,
        description: notification.message,
        timestamp: notification.timestamp,
        icon: getNotificationIcon(notification.type)
      });
    });

    // Recent bids for developer
    if (user?.type === 'developer') {
      bids
        .filter(bid => bid.developer.id === user.id)
        .slice(0, 2)
        .forEach(bid => {
          activities.push({
            id: `bid-${bid.id}`,
            type: 'bid',
            title: 'Bid Submitted',
            description: `You submitted a bid for "${bid.projectId}" - ₹${bid.amount.toLocaleString()}`,
            timestamp: bid.submittedDate,
            icon: Briefcase
          });
        });
    }

    // Recent projects for client
    if (user?.type === 'client') {
      projects
        .filter(project => project.client.id === user.id)
        .slice(0, 2)
        .forEach(project => {
          activities.push({
            id: `project-${project.id}`,
            type: 'project',
            title: 'Project Posted',
            description: `You posted "${project.title}" - ${project.bids.length} bids received`,
            timestamp: project.postedDate,
            icon: Briefcase
          });
        });
    }

    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message': return MessageSquare;
      case 'payment': return DollarSign;
      case 'bid': return Briefcase;
      case 'project': return Briefcase;
      default: return User;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const activities = getRecentActivities();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <activity.icon className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatTimeAgo(activity.timestamp)}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {activity.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No recent activity</p>
            <p className="text-sm mt-1">Your recent activities will appear here</p>
          </div>
        )}
      </div>

      {activities.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2">
            Load More Activities
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;