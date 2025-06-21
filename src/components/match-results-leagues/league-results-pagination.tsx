import React from 'react';

interface LeagueResultsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const LeagueResultsPagination: React.FC<LeagueResultsPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="mt-8 flex justify-center">
      <nav className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-md ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
          }`}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          if (
            pageNumber === 1 ||
            pageNumber === totalPages ||
            (pageNumber >= currentPage - 1 &&
              pageNumber <= currentPage + 1)
          ) {
            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === pageNumber
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                }`}
              >
                {pageNumber}
              </button>
            );
          } else if (
            pageNumber === currentPage - 2 ||
            pageNumber === currentPage + 2
          ) {
            return (
              <span key={pageNumber} className="px-2">
                ...
              </span>
            );
          }
          return null;
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-md ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
          }`}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default LeagueResultsPagination; 