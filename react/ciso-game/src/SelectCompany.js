import React from 'react';
import data from './data.json'; 
import './tiles.css'; 

const CompanySelection = ({ onCompanySelect }) => {

  const handleClick = (companyObject) => {
    onCompanySelect(companyObject)
  };

  return (
    <div className="company-selection">
      <h2>Welcome to The CISO Game!</h2>
      <p>
        In this game you play the role of a CISO building out a new security program at a startup.
      </p>
      <p>Select the startup you would like to work for</p>
      <div className="company-list">
        {Object.entries(data.companies).map(([key, company]) => (
          <div  
            key={key}
            className={"company-item"}
            onClick={() => handleClick(data.companies[key])}
          >
            {company.description}
          </div>
        
        ))}
      </div>
    </div>
  );
};

export default CompanySelection;
