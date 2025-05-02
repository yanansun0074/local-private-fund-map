import React, { useState } from 'react';
import styled from '@emotion/styled';

const MethodologyContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
`;

const ExpandableSection = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  background-color: #f5f5f5;
  padding: 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  
  &:hover {
    background-color: #e9e9e9;
  }
`;

const SectionContent = styled.div`
  padding: 20px;
  line-height: 1.6;
  background-color: white;
  display: ${props => props.isOpen ? 'block' : 'none'};
  text-align: left;
  padding-left: 40px;
`;

const Methodology = () => {
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  return (
    <MethodologyContainer>
      <ExpandableSection>
        <SectionHeader onClick={() => setIsMethodologyOpen(!isMethodologyOpen)}>
          Sources and Methodology
          <span>{isMethodologyOpen ? '▼' : '▶'}</span>
        </SectionHeader>
        <SectionContent isOpen={isMethodologyOpen}>
          <h3>Data Sources</h3>
          <p>
            The data for this visualization comes from the Internal Revenue Service (IRS) Form 990-PF filings in 2024, 
            which are required for private foundations. These filings provide detailed information about 
            foundation activities, including their mission statements, service areas, and financial data.
          </p>

          <h3>Methodology</h3>
          <p>
            The data was collected and processed through the following steps:
          </p>
          {/* <ol>
            <li>Data was extracted from <a href="https://www.irs.gov/charities-non-profits/private-foundations-filing-requirements">IRS Form 990-PF filings</a> for 2024, the most recent available year</li>
            <li>Foundations were geocoded based on their reported service areas</li>
            <li>Mission statements were cleaned and standardized for better readability</li>
            <li>Service areas were mapped to state-level jurisdictions</li>
            <li>Duplicate entries were removed and data was validated for accuracy</li>
          </ol> */}
          <p>
            Data was extracted from <a href="https://www.irs.gov/charities-non-profits/private-foundations-filing-requirements">IRS Form 990-PF filings</a> for 2024, the most recent available year. We chose data in xml format because it is the most text-friendly format that contains organization mission statement. From there, we extracted private funds' mission statements, EINs, grants, organization names, and expenses. An example of what a xml file format is <a href='https://pp-990-xml.s3.us-east-1.amazonaws.com/202442719349100804_public.xml?response-content-disposition=inline&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA266MJEJYTM5WAG5Y%2F20250501%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250501T181731Z&X-Amz-Expires=1800&X-Amz-SignedHeaders=host&X-Amz-Signature=b6758747194d235fcefeb6978d31353960e6c28c63f74b92b53ca5ee0795092a'>here</a>
          </p>
          <p>
            We then used <a href='https://www.ibm.com/think/topics/named-entity-recognition'>Name Entity Recognition (NER)</a> to identify organization statements containing geographical references. We then map the goegraphical information to state with a. state name/abbreviation and b. a county-to-state database. 
            We recognized that counties in differnt states can have the same name. Other goegraphical information may be in different level so that it cannot be mapped to state. So, we programmed to list all potential serviing states and manually verified them based on the context and organization address. This methods saved us time and efforts from checking all private funds.
          </p>
          <p>
            As this project focused on local-based foundations only, we also removed foundations that serving the U.S. or international areas.
          </p>

          <h3>Limitations</h3>
          <p>
            It's important to note that this data represents only private foundations that filed Form 990-PF 
            with the IRS in 2024. Additionally, the service areas listed are based on 
            self-reported mission statement. Some organizations may choose not to include their service areas in their statements or may not have a statement listed.
          </p>
          <p>
            This methodology is not perfect. If you have any suggestions, would like to contribute or collaborate, please contact Yanan Sun at <a href='mailto:yanans@ad.unc.edu'>yanans@ad.unc.edu</a>.
          </p>
        </SectionContent>
      </ExpandableSection>
    </MethodologyContainer>
  );
};

export default Methodology; 