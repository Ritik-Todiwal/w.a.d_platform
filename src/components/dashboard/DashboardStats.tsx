import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Briefcase, Users, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';

const DashboardStats: React.FC = () => {
  const { user } = useAuth();
  const { projects, bids } = useApp();

  const getDeveloperStats = () => {
    const userBids = bids.filter(bid => bid.developer.id === user?.id);
    const acceptedBids = userBids.filter(bid => bid.status === 'accepted');
    const totalEarnings = acceptedBids.reduce((sum, bid) => sum + bid.amount, 0);
    
    return {
      activeBids: userBids.filter(bid => bid.status === 'pending').length,
      acceptedProjects: acceptedBids.length,
      totalEarnings,
      averageRating: user ? user.rating : 0
    };
  };

  const getClientStats = () => {
    const userProjects = projects.filter(project => project.client.id === user?.id);
    const activeProjects = userProjects.filter(project => project.status === 'in-progress').length;
    const completedProjects = userProjects.filter(project => project.status === 'completed').length;
    const totalSpent = userProjects.reduce((sum, project) => sum + project.budget.max, 0);
    const totalBidsReceived = userProjects.reduce((sum, project) => sum + project.bids.length, 0);

    return {
      activeProjects,
      completedProjects,
      totalSpent,
      totalBidsReceived
    };
  };

  const isDeveloper = user?.type === 'developer';
  const developerStats = isDeveloper ? getDeveloperStats() : null;
  const clientStats = !isDeveloper ? getClientStats() : null;

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ElementType;
    color: string;
    trend?: { value: string; isUp: boolean };
  }> = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center ${trend.isUp ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isUp ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            <span className="text-sm font-medium">{trend.value}</span>
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{title}</div>
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      
      {isDeveloper && developerStats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Active Bids"
            value={developerStats.activeBids}
            icon={Briefcase}
            color="bg-blue-500"
            trend={{ value: "+12%", isUp: true }}
          />
          <StatCard
            title="Accepted Projects"
            value={developerStats.acceptedProjects}
            icon={Users}
            color="bg-green-500"
            trend={{ value: "+8%", isUp: true }}
          />
          <StatCard
            title="Total Earnings"
            value={`₹${developerStats.totalEarnings.toLocaleString()}`}
            icon={DollarSign}
            color="bg-purple-500"
            trend={{ value: "+25%", isUp: true }}
          />
          <StatCard
            title="Average Rating"
            value={`${developerStats.averageRating}/5`}
            icon={Star}
            color="bg-yellow-500"
          />
        </div>
      ) : (
        clientStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Active Projects"
              value={clientStats.activeProjects}
              icon={Briefcase}
              color="bg-blue-500"
              trend={{ value: "+5%", isUp: true }}
            />
            <StatCard
              title="Completed Projects"
              value={clientStats.completedProjects}
              icon={Users}
              color="bg-green-500"
              trend={{ value: "+15%", isUp: true }}
            />
            <StatCard
              title="Total Investment"
              value={`₹${clientStats.totalSpent.toLocaleString()}`}
              icon={DollarSign}
              color="bg-purple-500"
              trend={{ value: "+30%", isUp: true }}
            />
            <StatCard
              title="Bids Received"
              value={clientStats.totalBidsReceived}
              icon={Star}
              color="bg-orange-500"
              trend={{ value: "+18%", isUp: true }}
            />
          </div>
        )
      )}
    </div>
  );
};

export default DashboardStats;