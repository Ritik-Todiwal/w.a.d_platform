import React from 'react';
import { Search, ArrowRight, Code, Users, Shield } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Connect with Top
            <span className="text-yellow-300"> Developers</span>
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            India's premier platform for hiring skilled developers and finding quality projects. 
            Build your dream website or mobile app with confidence.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search for developers, projects, or skills..."
                className="w-full pl-12 pr-32 py-4 text-lg rounded-full border-0 shadow-lg focus:ring-4 focus:ring-blue-300 focus:outline-none"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-colors flex items-center">
                Search
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={onGetStarted}
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-xl"
            >
              Hire Developers
            </button>
            <button
              onClick={onGetStarted}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105"
            >
              Find Work
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
              <Code className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">10,000+</div>
              <div className="text-blue-100">Skilled Developers</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
              <Users className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">50,000+</div>
              <div className="text-blue-100">Projects Completed</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
              <Shield className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-blue-100">Secure Payments</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 -mt-32 -mr-32 w-64 h-64 bg-yellow-300 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-32 -ml-32 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
    </div>
  );
};

export default Hero;