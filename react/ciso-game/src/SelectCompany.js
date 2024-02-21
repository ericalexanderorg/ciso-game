import React from 'react';
import data from './data.json'; 
import './tiles.css'; 

const CompanySelection = ({ onCompanySelect }) => {

  const handleClick = (companyObject) => {
    onCompanySelect(companyObject)
  };

  return (
    <div className="tile-container">
      <div>
        <h1>Welcome to The CISO Game!</h1>
      </div>
      <div>
        In this game you play the role of a CISO building out a new security program at a startup.
      </div>
      <div>Select the startup you would like to work for</div>
      {Object.entries(data.companies).map(([key, company]) => (
        <div  
          key={key}
          className={`tile`}
          onClick={() => handleClick(data.companies[key])}
        >
          {company.description}
        </div>
      ))}
    </div>
  );
};

export default CompanySelection;
