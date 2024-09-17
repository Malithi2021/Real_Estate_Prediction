import React, { useState, useEffect } from 'react';
import BHKSelector from './components/BHKSelector';
import BathroomSelector from './components/BathroomSelector';
import PriceEstimator from './components/PriceEstimator';

function App() {
  const [locations, setLocations] = useState([]);
  const [selectedBHK, setSelectedBHK] = useState(1);
  const [selectedBathroom, setSelectedBathroom] = useState(1);
  const [totalSqft, setTotalSqft] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [location, setLocation] = useState('');

  // Fetch location names
  useEffect(() => {
    async function fetchLocations() {
      const res = await fetch('http://127.0.0.1:5000/get_location_names');
      const data = await res.json();
      setLocations(data.locations);
    }
    fetchLocations();
  }, []);

  const handleEstimatePrice = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/predict_home_price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          total_sqft: parseFloat(totalSqft),
          bhk: selectedBHK,
          bath: selectedBathroom,
          location: location
        })
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setEstimatedPrice(data.estimated_price);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)' }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Real Estate Prediction System</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Total Square Feet</label>
          <input 
            type="number" 
            value={totalSqft} 
            onChange={(e) => setTotalSqft(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            placeholder="Enter square feet" 
          />
        </div>

        <BHKSelector selectedBHK={selectedBHK} setSelectedBHK={setSelectedBHK} />
        <BathroomSelector selectedBathroom={selectedBathroom} setSelectedBathroom={setSelectedBathroom} />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <select 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">Select location</option>
            {locations.map((loc, index) => <option key={index} value={loc}>{loc}</option>)}
          </select>
        </div>

        <button 
          onClick={handleEstimatePrice} 
          className="bg-green-500 text-white w-full py-2 rounded-md shadow-md hover:bg-green-600">
          Estimate Price
        </button>

        {estimatedPrice && <PriceEstimator price={estimatedPrice} />}
      </div>
    </div>
  );
}

export default App;
