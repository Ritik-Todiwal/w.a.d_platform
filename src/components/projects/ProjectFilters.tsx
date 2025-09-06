import React, { useState } from 'react';
import { Filter, Search, X } from 'lucide-react';

interface ProjectFiltersProps {
  onFiltersChange: (filters: any) => void;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({ onFiltersChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    budgetRange: '',
    timeline: '',
    skills: [] as string[],
    clientRating: ''
  });

  const categories = [
    { value: 'static-website', label: 'Static Website' },
    { value: 'dynamic-website', label: 'Dynamic Website' },
    { value: 'ecommerce-website', label: 'E-commerce Website' },
    { value: 'mobile-app', label: 'Mobile App' },
    { value: 'web-application', label: 'Web Application' },
    { value: 'ui-ux-design', label: 'UI/UX Design' }
  ];

  const budgetRanges = [
    { value: '0-25000', label: 'Under ₹25,000' },
    { value: '25000-50000', label: '₹25,000 - ₹50,000' },
    { value: '50000-100000', label: '₹50,000 - ₹1,00,000' },
    { value: '100000-250000', label: '₹1,00,000 - ₹2,50,000' },
    { value: '250000+', label: 'Above ₹2,50,000' }
  ];

  const timelineOptions = [
    { value: '1-2', label: '1-2 weeks' },
    { value: '2-4', label: '2-4 weeks' },
    { value: '1-2m', label: '1-2 months' },
    { value: '3-6m', label: '3-6 months' },
    { value: '6m+', label: '6+ months' }
  ];

  const popularSkills = [
    'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'PHP', 'WordPress',
    'Laravel', 'Django', 'React Native', 'Flutter', 'Vue.js', 'Angular',
    'MongoDB', 'MySQL', 'PostgreSQL', 'AWS', 'Docker', 'Figma', 'Adobe XD'
  ];

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleSkillToggle = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    handleFilterChange('skills', newSkills);
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      search: '',
      category: '',
      budgetRange: '',
      timeline: '',
      skills: [],
      clientRating: ''
    };
    setFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== ''
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects by title, description, or skills..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Filter Toggle Button */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
          
          {hasActiveFilters && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">
                {filters.skills.length + (filters.category ? 1 : 0) + (filters.budgetRange ? 1 : 0) + (filters.timeline ? 1 : 0) + (filters.clientRating ? 1 : 0)} active
              </span>
              <button
                onClick={clearAllFilters}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Options */}
      {isOpen && (
        <div className="p-6 space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Project Category</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {categories.map((category) => (
                <label key={category.value} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category.value}
                    checked={filters.category === category.value}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{category.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Budget Range */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Budget Range</h3>
            <div className="space-y-2">
              {budgetRanges.map((range) => (
                <label key={range.value} className="flex items-center">
                  <input
                    type="radio"
                    name="budgetRange"
                    value={range.value}
                    checked={filters.budgetRange === range.value}
                    onChange={(e) => handleFilterChange('budgetRange', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Timeline</h3>
            <div className="space-y-2">
              {timelineOptions.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="timeline"
                    value={option.value}
                    checked={filters.timeline === option.value}
                    onChange={(e) => handleFilterChange('timeline', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {popularSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.skills.includes(skill)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {skill}
                  {filters.skills.includes(skill) && (
                    <X className="w-3 h-3 ml-1 inline" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Client Rating */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Client Rating</h3>
            <div className="space-y-2">
              {['4.5+', '4.0+', '3.5+', '3.0+'].map((rating) => (
                <label key={rating} className="flex items-center">
                  <input
                    type="radio"
                    name="clientRating"
                    value={rating}
                    checked={filters.clientRating === rating}
                    onChange={(e) => handleFilterChange('clientRating', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{rating} stars & up</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFilters;