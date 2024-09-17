import React from 'react';

const BHKSelector = ({ selectedBHK, setSelectedBHK }) => {
  const bhkOptions = [1, 2, 3, 4, 5];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">BHK</label>
      <div className="flex space-x-2 mt-2">
        {bhkOptions.map(bhk => (
          <button 
            key={bhk}
            className={`py-2 px-4 border rounded-md ${selectedBHK === bhk ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setSelectedBHK(bhk)}>
            {bhk} BHK
          </button>
        ))}
      </div>
    </div>
  );
};

export default BHKSelector;
