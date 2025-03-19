import React, { useRef, useEffect } from 'react';
import { X, BookMarked, FolderGit } from 'lucide-react';
import { TechStackItem } from '@/app/types/techStack';
import { colorMap, getProficiencyColor, getProficiencyLabel } from '@/app/utils/techStackUtils';

interface TechDetailsModalProps {
  selectedTech: string | null;
  onClose: () => void;
  techStacks: TechStackItem[];
}

const TechDetailsModal: React.FC<TechDetailsModalProps> = ({ 
  selectedTech, 
  onClose,
  techStacks
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Find selected tech details
  const selectedTechDetails = selectedTech 
    ? techStacks.find(tech => tech.name === selectedTech)
    : null;
  
  // Handle click outside of modal
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);
  
  if (!selectedTech || !selectedTechDetails) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-start">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                  style={{ 
                    backgroundColor: `${colorMap[selectedTechDetails.color as keyof typeof colorMap] || '#3b82f6'}15`
                  }}>
              <div style={{ color: colorMap[selectedTechDetails.color as keyof typeof colorMap] || '#3b82f6' }}>
                {selectedTechDetails.icon}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{selectedTechDetails.name}</h3>
              <div className="flex items-center">
                <span className="text-sm text-gray-500">{selectedTechDetails.category}</span>
                <span 
                  className="ml-2 px-2 py-0.5 text-xs rounded-full text-white"
                  style={{ backgroundColor: getProficiencyColor(selectedTechDetails.proficiency) }}
                >
                  {getProficiencyLabel(selectedTechDetails.proficiency)}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Description */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-500 mb-2">DESCRIPTION</h4>
            <p className="text-gray-700">
              {selectedTechDetails.description || `Expertise in ${selectedTechDetails.name} development and implementation.`}
            </p>
          </div>
          
          {/* Proficiency details */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-500 mb-2">PROFICIENCY</h4>
            <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full relative"
                style={{ 
                  width: `${selectedTechDetails.proficiency}%`,
                  backgroundColor: getProficiencyColor(selectedTechDetails.proficiency)
                }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                  {selectedTechDetails.proficiency}%
                </span>
              </div>
            </div>
            <div className="mt-4">
              <span 
                className="text-sm font-medium"
                style={{ color: getProficiencyColor(selectedTechDetails.proficiency) }}
              >
                {getProficiencyLabel(selectedTechDetails.proficiency)} Level
              </span>
            </div>
          </div>
          
          {/* Experience and projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedTechDetails.years && (
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-2">EXPERIENCE</h4>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                    <BookMarked className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-gray-800">{selectedTechDetails.years}</span>
                    <span className="text-gray-600 ml-1">{selectedTechDetails.years === 1 ? 'year' : 'years'}</span>
                  </div>
                </div>
              </div>
            )}
            
            {selectedTechDetails.projects && (
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-2">PROJECTS</h4>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mr-3">
                    <FolderGit className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-gray-800">{selectedTechDetails.projects}</span>
                    <span className="text-gray-600 ml-1">{selectedTechDetails.projects === 1 ? 'project' : 'projects'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechDetailsModal;