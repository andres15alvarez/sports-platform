export const getFormColor = (result: string): string => {
  const colors: Record<string, string> = {
    W: 'bg-green-500',
    D: 'bg-gray-500',
    L: 'bg-red-500',
  };
  return colors[result] || 'bg-gray-300';
};

export const getStatusColor = (description: string | null): string => {
  if (!description) return '';
  const lowerDesc = description.toLowerCase();

  if (lowerDesc.includes('champions league'))
    return 'border-l-4 border-blue-600';
  if (lowerDesc.includes('europa league'))
    return 'border-l-4 border-orange-500';
  if (lowerDesc.includes('relegation') || lowerDesc.includes('descenso'))
    return 'border-l-4 border-red-600';

  return 'border-l-4 border-gray-300';
};
