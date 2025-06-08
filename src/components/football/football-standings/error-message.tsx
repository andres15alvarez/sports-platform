import React from 'react';

interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => (
  <div className="flex justify-center items-center min-h-screen bg-white">
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-lg">
      <p className="font-bold">Error</p>
      <p>{error}</p>
    </div>
  </div>
);
