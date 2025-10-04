import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, goToPage }) => {
  if (totalPages <= 1) return null;

  const goToFirstPage = () => goToPage(1);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);
  const goToLastPage = () => goToPage(totalPages);

  return (
    <div className="mt-8 flex justify-center">
      <nav className="inline-flex items-center bg-white rounded-xl shadow-md overflow-hidden">
        <button
          onClick={goToFirstPage}
          disabled={currentPage === 1}
          className={`p-2 sm:px-3 sm:py-2 text-sm border-r border-gray-200 ${
            currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
          }`}
        >
          <span className="sr-only">First page</span>
          <ChevronsLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`p-2 sm:px-3 sm:py-2 text-sm border-r border-gray-200 ${
            currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
          }`}
        >
          <span className="sr-only">Previous page</span>
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        {/* Page numbers */}
        <div className="hidden sm:flex">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            // Create a simple pagination view with at most 5 buttons
            let pageNum;
            
            if (totalPages <= 5) {
              // If we have 5 or fewer pages, show all page numbers
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              // If we're near the start, show pages 1-5
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              // If we're near the end, show the last 5 pages
              pageNum = totalPages - 4 + i;
            } else {
              // Otherwise show current page and 2 pages on each side
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`w-10 text-center py-2 border-r border-gray-200 ${
                  currentPage === pageNum
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
        
        {/* Mobile page indicator */}
        <div className="sm:hidden px-4 py-2 text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </div>
        
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`p-2 sm:px-3 sm:py-2 text-sm border-r border-gray-200 ${
            currentPage === totalPages 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
          }`}
        >
          <span className="sr-only">Next page</span>
          <ChevronRight className="w-5 h-5" />
        </button>
        
        <button
          onClick={goToLastPage}
          disabled={currentPage === totalPages}
          className={`p-2 sm:px-3 sm:py-2 text-sm ${
            currentPage === totalPages 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
          }`}
        >
          <span className="sr-only">Last page</span>
          <ChevronsRight className="w-5 h-5" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;