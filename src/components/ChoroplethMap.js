import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import styled from '@emotion/styled';

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
`;

const ColorScale = styled.div`
  height: 20px;
  width: 100px;
  margin: 0 auto;
  background: linear-gradient(to right, 
    #ffedea,
    #ffcec5,
    #ffad9f,
    #ff8a75,
    #ff5533,
    #e2492d,
    #be3d26,
    #9a311f,
    #782618
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
`;

const ChoroplethMap = ({ data, onStateClick }) => {
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  // Create color scale
  const colorScale = scaleQuantile()
    .domain(data.map(d => d.funds))
    .range([
      '#ffedea',
      '#ffcec5',
      '#ffad9f',
      '#ff8a75',
      '#ff5533',
      '#e2492d',
      '#be3d26',
      '#9a311f',
      '#782618'
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
    onStateClick((geo.properties.NAME || geo.properties.name || '').toUpperCase());
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
          <ZoomableGroup>
            <Geographies geography="us_states_2.json">
              {({ geographies }) =>
                geographies.map(geo => {
                  const stateName = (geo.properties.NAME || geo.properties.name || '').toUpperCase();
                  const current = data.find(d => d.state === stateName);
                  return (
                    <Geography
                      key={geo.id}
                      geography={geo}
                      fill={current ? colorScale(current.funds) : '#F5F4F6'}
                      stroke="#FFFFFF"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: 'none' },
                        hover: { outline: 'none', fill: '#F53' },
                        pressed: { outline: 'none', fill: '#E42' },
                      }}
                      onMouseEnter={(event) => handleMouseEnter(geo, event)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleClick(geo)}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
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