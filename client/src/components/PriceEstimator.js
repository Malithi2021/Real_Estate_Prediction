import React from 'react';

const PriceEstimator = ({ price }) => {
  return (
    <div className="mt-4 bg-gray-100 p-4 rounded-md shadow-md text-center">
      <h2 className="text-2xl font-bold text-gray-800">Estimated Price</h2>
      <p className="text-xl text-green-600">{price} Lakh</p>
    </div>
  );
};

export default PriceEstimator;
