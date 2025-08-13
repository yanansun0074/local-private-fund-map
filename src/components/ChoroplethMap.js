import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography
} from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import styled from '@emotion/styled';
import geographyData from '../data/us_states_2.json';

const MapContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
`;

const MapWrapper = styled.div`
  position: relative;
`;

const MapTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5em;
  color: #333;
  font-family: 'Open Sans', sans-serif;
`;

const Legend = styled.div`
  width: 100px;
  padding: 10px;
  border-radius: 4px;
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 1;
`;

const LegendTitle = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  font-size: 0.8em;
  font-family: 'Open Sans', sans-serif;
`;

const ColorScale = styled.div`
  height: 20px;
  width: 100px;
  margin: 0 auto;
  background: linear-gradient(to right, 
      #EAF4FB,
      #C8DEF1,
      #A5C9E7,
      #82B3DD,
      #4B9CD3,
      #4186B3,
      #367093,
      #2B5A73,
      #214453
  );
  border-radius: 4px;
  position: relative;
`;

const ScaleLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 0.8em;
  width: 100px;
  margin: 5px auto 0;
  font-family: 'Open Sans', sans-serif;
`;

const Tooltip = styled.div`
  position: absolute;
  background: white;
  padding: 5px 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  pointer-events: none;
  display: ${props => props.show ? 'block' : 'none'};
  z-index: 1000;
  font-family: 'Open Sans', sans-serif;
`;

const ChoroplethMap = ({ data, onStateClick }) => {
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedState, setSelectedState] = useState(null);

  // Create color scale
  const colorScale = scaleQuantile()
    .domain(data.map(d => d.funds))
    .range([
      // v1: red
      // '#ffedea',
      // '#ffcec5',
      // '#ffad9f',
      // '#ff8a75',
      // '#ff5533',
      // '#e2492d',
      // '#be3d26',
      // '#9a311f',
      // '#782618'
      // v2: blues
      // '#93C4E5',
      // '#7FB0D3',
      // '#6A9CC1',
      // '#5687AF',
      // '#41739D',
      // '#2D5F8B',
      // v3: blues:
      '#EAF4FB',
      '#C8DEF1',
      '#A5C9E7',
      '#82B3DD',
      '#4B9CD3',
      '#4186B3',
      '#367093',
      '#2B5A73',
      '#214453'
    ]);

  // Calculate min and max values
  const getMinMax = () => {
    const domain = colorScale.domain();
    return {
      min: Math.round(Math.min(...domain)),
      max: Math.round(Math.max(...domain))
    };
  };

  const handleMouseEnter = (geo, event) => {
    const stateName = (geo.properties.NAME || geo.properties.name || '').toUpperCase();
    const current = data.find(d => d.state === stateName);
    if (current) {
      setTooltipContent(`${geo.properties.NAME || geo.properties.name}: ${current.funds} private foundations`);
      setTooltipPosition({ x: event.clientX, y: event.clientY });
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleClick = (geo) => {
    const stateName = (geo.properties.NAME || geo.properties.name || '').toUpperCase();
    setSelectedState(stateName);
    onStateClick(stateName);
  };

  return (
    <MapContainer>
      <MapWrapper>
        <MapTitle>Number of Local-Based Private Foundations Serving Each State</MapTitle>
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{
            scale: 1000,
            rotation: [0, 0, 0],
          }}
        >
          <Geographies geography={geographyData}>
            {({ geographies }) =>
              geographies.map(geo => {
                const stateName = (geo.properties.NAME || geo.properties.name || '').toUpperCase();
                const current = data.find(d => d.state === stateName);
                const isSelected = stateName === selectedState;
                  return (
                    <Geography
                      key={geo.id}
                      geography={geo}
                      fill={isSelected ? '#9B9186' : (current ? colorScale(current.funds) : '#000000')}
                      stroke="#FFFFFF"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: 'none' },
                        hover: { outline: '#000000', fill: isSelected ? '#9B9186' : '#6FB6E0' },
                        pressed: { outline: '#000000', fill: '#9B9186' },
                      }}
                      onMouseEnter={(event) => handleMouseEnter(geo, event)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleClick(geo)}
                    />
                  );
              })
            }
          </Geographies>
        </ComposableMap>
        <Tooltip
          show={showTooltip}
          style={{
            left: tooltipPosition.x - 200,
            top: tooltipPosition.y - 10,
          }}
        >
          {tooltipContent}
        </Tooltip>
        <Legend>
          {/* <LegendTitle>Number of Foundations</LegendTitle> */}
          <ColorScale />
          <ScaleLabels>
            <span>{getMinMax().min}</span>
            <span>{getMinMax().max}</span>
          </ScaleLabels>
        </Legend>
      </MapWrapper>
    </MapContainer>
  );
};

export default ChoroplethMap; 