import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, paginate }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-16 flex justify-center items-center">
      <div className="inline-flex shadow-md rounded-lg overflow-hidden">
        {/* Previous button */}
        <button 
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 flex items-center ${
            currentPage === 1 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-blue-600 hover:bg-blue-50'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline ml-1">Previous</span>
        </button>
        
        {/* Page numbers */}
        <div className="hidden sm:flex">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => {
            // Show 5 page numbers at most (current, 2 before, 2 after)
            if (
              number === 1 || 
              number === totalPages || 
              (number >= currentPage - 1 && number <= currentPage + 1)
            ) {
              return (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-10 flex items-center justify-center ${
                    currentPage === number
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium'
                      : 'bg-white text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  {number}
                </button>
              );
            } else if (
              (number === currentPage - 2 && currentPage > 3) || 
              (number === currentPage + 2 && currentPage < totalPages - 2)
            ) {
              // Show ellipsis
              return (
                <span 
                  key={number} 
                  className="w-10 flex items-center justify-center bg-white text-gray-400"
                >
                  ...
                </span>
              );
            }
            return null;
          })}
        </div>
        
        {/* Mobile pagination indicator */}
        <div className="sm:hidden px-4 py-2 bg-white text-gray-700 font-medium">
          {currentPage} of {totalPages}
        </div>
        
        {/* Next button */}
        <button 
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 flex items-center ${
            currentPage === totalPages 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-blue-600 hover:bg-blue-50'
          }`}
        >
          <span className="hidden sm:inline mr-1">Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;