import React, { useState, useRef } from "react";
import "./App.css";
import ChoroplethMap from "./components/ChoroplethMap";
import DataTable from "./components/DataTable";
import Footer from "./components/Footer";
import Methodology from "./components/Methodology";
import mapData from "./data/map_data.json";
import foundationData from "./data/state_map_data.json";

function App() {
  const [selectedState, setSelectedState] = useState(null);
  const tableRef = useRef(null);

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
    // Scroll to the table when a state is selected
    console.log("State clicked:", stateName);

    // Use setTimeout to ensure the state update has completed and the table is rendered
    setTimeout(() => {
      console.log("Table ref after timeout:", tableRef.current);
      if (tableRef.current) {
        const tableTop = tableRef.current.offsetTop;
        console.log("Table top position:", tableTop);
        window.scrollTo({
          top: tableTop - 100, // Offset by 100px to show some context above
          behavior: "smooth",
        });
      } else {
        console.log("Table ref is still null!");
      }
    }, 100);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>U.S. Local-based Private Foundations Map</h1>
      </header>
      <main>
        <ChoroplethMap data={mapData} onStateClick={handleStateClick} />

        <DataTable
          ref={tableRef}
          data={selectedState ? foundationData[selectedState] : null}
          selectedState={selectedState}
        />
        <h2>
          Read the full{" "}
          <a href="https://www.cislm.org/research/philanthropy-and-local-news/">
            Philanthropy and Local News Report
          </a>{" "}
          by CISLM
        </h2>
        <Methodology />
      </main>
      <Footer />
    </div>
  );
}

export default App;
