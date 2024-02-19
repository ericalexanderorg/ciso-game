import React, { useState } from 'react';
import data from './data.json'; 
import './tiles.css'; 

const CompanySelection = () => {
  const [selectedCompany, setCompany] = useState('');

  const handleClick = (companyKey) => {
    setCompany(companyKey);
  };

  return (
    <div className="tile-container">
      <h1>Welcome to The CISO Game!</h1>
      <p>In this game you play the role of a CISO building out a new security</p>
      {Object.entries(data.companies).map(([key, company]) => (
        <div  
          key={key}
          className={`tile ${selectedCompany === key ? 'selected' : ''}`}
          onClick={() => handleClick(key)}
        >
          {company.description}
        </div>
      ))}
    </div>
  );
};

export default CompanySelection;
