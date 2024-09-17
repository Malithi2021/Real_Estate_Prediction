import React from 'react';

const BathroomSelector = ({ selectedBathroom, setSelectedBathroom }) => {
  const bathOptions = [1, 2, 3, 4, 5];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
      <div className="flex space-x-2 mt-2">
        {bathOptions.map(bath => (
          <button 
            key={bath}
            className={`py-2 px-4 border rounded-md ${selectedBathroom === bath ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setSelectedBathroom(bath)}>
            {bath}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BathroomSelector;
