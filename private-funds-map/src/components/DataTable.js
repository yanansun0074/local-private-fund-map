import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const TableContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  table-layout: fixed;
`;

const TableHeader = styled.th`
  background-color: #f5f5f5;
  padding: 12px;
  text-align: center;
  border-bottom: 2px solid #ddd;
  word-wrap: break-word;
  vertical-align: top;
`;

const TableRow = styled.tr`
  &:nth-of-type(even) {
    background-color: #f9f9f9;
  }
  
  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  word-wrap: break-word;
  vertical-align: top;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #ddd;
  background-color: ${props => props.active ? '#0066cc' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  border-radius: 4px;
  
  &:hover {
    background-color: ${props => props.active ? '#0066cc' : '#f5f5f5'};
  }
  
  &:disabled {
    background-color: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  color: #666;
  font-size: 0.9em;
`;

const DataTable = ({ data, selectedState }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Function to clean mission text by removing the dollar amount at the end
  const cleanMissionText = (mission) => {
    return mission.replace(/\s*-\s*[^-]+$/, '');
  };

  // Reset to page 1 when selectedState changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedState]);

  if (!selectedState || !data) {
    return null;
  }

  // Calculate pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <TableContainer>
      <h2>{data.length} Local-based Private Foundations in {selectedState}</h2>
      <StyledTable>
        <thead>
          <tr>
            <TableHeader style={{ width: "10%" }}>EIN</TableHeader>
            <TableHeader style={{ width: "20%" }}>Name</TableHeader>
            <TableHeader style={{ width: "60%" }}>Mission</TableHeader>
            <TableHeader style={{ width: "10%" }}>Service Area</TableHeader>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((foundation, index) => (
            <TableRow key={index}>
              <TableCell style={{ width: "10%" }}>{foundation.EIN}</TableCell>
              <TableCell style={{ width: "20%" }}>{foundation.Name}</TableCell>
              <TableCell style={{ width: "60%" }}>{cleanMissionText(foundation.Mission)}</TableCell>
              <TableCell style={{ width: "10%" }}>{Array.isArray(foundation.State) ? foundation.State.join(', ') : foundation.State}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>

      {totalPages > 1 && (
        <PaginationContainer>
          <PageButton 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </PageButton>
          
          {[...Array(totalPages)].map((_, index) => (
            <PageButton
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              active={currentPage === index + 1}
            >
              {index + 1}
            </PageButton>
          ))}
          
          <PageButton 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </PageButton>

          <PageInfo>
            Page {currentPage} of {totalPages}
          </PageInfo>
        </PaginationContainer>
      )}
    </TableContainer>
  );
};

export default DataTable; 