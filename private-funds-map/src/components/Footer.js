import React from 'react';
import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #f5f5f5;
  padding: 20px 0;
  margin-top: 40px;
  border-top: 1px solid #ddd;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 250px;
`;

const FooterTitle = styled.h4`
  margin: 0 0 10px 0;
  color: #333;
`;

const FooterText = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9em;
  line-height: 1.5;
`;

const FooterLink = styled.a`
  color: #0066cc;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>About This Project</FooterTitle>
          <FooterText>
            This is a project by <a href='https://www.cislm.org/'>CISLM</a> on local-based private foundations across the United States,
            helping researchers and policymakers understand the distribution of philanthropic resources.
          </FooterText>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact</FooterTitle>
          <FooterText>
            For questions or feedback, please contact us at{' '}
            <FooterLink href="mailto:yanans@ad.unc.edu">yanans@ad.unc.edu</FooterLink>
          </FooterText>
        </FooterSection>
      </FooterContent>
      
      <FooterContent style={{ marginTop: '20px', justifyContent: 'center' }}>
        <FooterText>
          © {new Date().getFullYear()} Private Foundations Map. All rights reserved.
        </FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 