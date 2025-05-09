import React, { useState } from 'react';
import './App.css';
import ChoroplethMap from './components/ChoroplethMap';
import DataTable from './components/DataTable';
import Footer from './components/Footer';
import Methodology from './components/Methodology';
import mapData from './data/map_data.json';
import foundationData from './data/state_map_data.json';

function App() {
  const [selectedState, setSelectedState] = useState(null);
  
  // Sample data structure - replace with your actual data
  // const mapData = [
  //   { name: 'California', value: 1000 },
  //   { name: 'New York', value: 800 },
  //   { name: 'Texas', value: 600 },
  //   // Add more states with their foundation counts
  // ];

  // // Sample foundation data - replace with your actual data
  // const foundationData = {
  //   'California': [
  //     { name: 'Foundation 1', city: 'Los Angeles', assets: 1000000, giving: 100000 },
  //     { name: 'Foundation 2', city: 'San Francisco', assets: 2000000, giving: 200000 },
  //   ],
  //   'New York': [
  //     { name: 'Foundation 3', city: 'New York', assets: 1500000, giving: 150000 },
  //   ],
  //   // Add more states with their foundation details
  // };

  const handleStateClick = (stateName) => {
    setSelectedState(stateName);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>U.S. Local-based Private Foundations Map</h1>
      </header>
      <main>
        <ChoroplethMap 
          data={mapData} 
          onStateClick={handleStateClick} 
        />
        
        <DataTable 
          data={selectedState ? foundationData[selectedState] : null} 
          selectedState={selectedState} 
        />
        <Methodology />
      </main>
      <Footer />
    </div>
  );
}

export default App;
