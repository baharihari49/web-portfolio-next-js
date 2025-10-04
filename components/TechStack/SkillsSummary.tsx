import React from 'react';
import { Star } from 'lucide-react';
import { TechStackItem } from '@/app/types/techStack';
import { getCategoryIcon } from '@/app/utils/techStackUtils';

interface SkillsSummaryProps {
  techStacks: TechStackItem[];
  categories: string[];
}

const SkillsSummary: React.FC<SkillsSummaryProps> = ({ techStacks, categories }) => {
  return (
    <div className="mt-12 bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Star className="w-5 h-5 text-yellow-500 mr-2" />
        Skills Proficiency Overview
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Expertise levels */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-gray-500 mb-2">PROFICIENCY LEVELS</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#22c55e' }}></div>
              <span className="text-sm text-gray-700">Expert (90-100%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#3b82f6' }}></div>
              <span className="text-sm text-gray-700">Advanced (80-89%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#f59e0b' }}></div>
              <span className="text-sm text-gray-700">Intermediate (70-79%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#ef4444' }}></div>
              <span className="text-sm text-gray-700">Beginner ({`< 70%`})</span>
            </div>
          </div>
        </div>
        
        {/* Category breakdown */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-gray-500 mb-2">CATEGORY BREAKDOWN</h4>
          <div className="space-y-2">
            {categories.map(category => {
              const count = techStacks.filter(tech => tech.category === category).length;
              return (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getCategoryIcon(category)}
                    <span className="text-sm text-gray-700 ml-2">{category}</span>
                  </div>
                  <span className="text-sm font-medium text-blue-600">{count} {count === 1 ? 'tech' : 'techs'}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Top proficiency */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-gray-500 mb-2">TOP EXPERTISE</h4>
          <div className="space-y-2">
            {techStacks
              .sort((a, b) => b.proficiency - a.proficiency)
              .slice(0, 4)
              .map(tech => (
                <div key={tech.name} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{tech.name}</span>
                  <span className="text-sm font-medium text-blue-600">{tech.proficiency}%</span>
                </div>
              ))
            }
          </div>
        </div>
        
        {/* Years of experience */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-gray-500 mb-2">EXPERIENCE YEARS</h4>
          <div className="space-y-2">
            {techStacks
              .filter(tech => tech.years)
              .sort((a, b) => (b.years || 0) - (a.years || 0))
              .slice(0, 4)
              .map(tech => (
                <div key={tech.name} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{tech.name}</span>
                  <span className="text-sm font-medium text-blue-600">{tech.years} {tech.years === 1 ? 'year' : 'years'}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSummary;