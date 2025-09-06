import React from 'react';
import { 
  Search, 
  MessageSquare, 
  Shield, 
  Star, 
  Clock, 
  DollarSign,
  Users,
  Code2,
  CheckCircle
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: 'Smart Project Matching',
      description: 'AI-powered algorithm matches developers with projects based on skills, experience, and preferences.',
      color: 'bg-blue-500'
    },
    {
      icon: MessageSquare,
      title: 'Real-time Communication',
      description: 'Integrated chat, video calls, and file sharing for seamless collaboration between clients and developers.',
      color: 'bg-green-500'
    },
    {
      icon: Shield,
      title: 'Secure Escrow System',
      description: 'Your payments are protected with our secure escrow system. Money is released only when milestones are completed.',
      color: 'bg-purple-500'
    },
    {
      icon: Star,
      title: 'Verified Profiles',
      description: 'All developers go through identity and skill verification process to ensure quality and trustworthiness.',
      color: 'bg-yellow-500'
    },
    {
      icon: Clock,
      title: 'Milestone Tracking',
      description: 'Break down projects into milestones with clear deadlines and progress tracking for better project management.',
      color: 'bg-red-500'
    },
    {
      icon: DollarSign,
      title: 'Transparent Pricing',
      description: 'Compare bids side-by-side with detailed cost breakdown and timeline estimates from multiple developers.',
      color: 'bg-indigo-500'
    }
  ];

  const stats = [
    { icon: Users, label: 'Active Users', value: '25,000+' },
    { icon: Code2, label: 'Projects Posted', value: '100,000+' },
    { icon: CheckCircle, label: 'Success Rate', value: '98%' },
    { icon: DollarSign, label: 'Total Earnings', value: '₹50 Cr+' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Choose DevConnect?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide everything you need to successfully complete your projects, 
            from finding the right talent to secure payment processing.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Trusted by Thousands
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Post Your Project</h4>
              <p className="text-gray-600">
                Describe your project requirements, budget, and timeline. Our AI will suggest the best developers for you.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Review Proposals</h4>
              <p className="text-gray-600">
                Receive detailed proposals from qualified developers. Compare costs, timelines, and portfolios.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Start Working</h4>
              <p className="text-gray-600">
                Choose your developer, set up milestones, and start building. Track progress in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;