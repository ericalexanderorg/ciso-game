import React, { useState, useEffect } from 'react';
//import data from './data.json'; 
//import './tiles.css'; 

const Invest = ({ companyObject }) => {  
  const [budget, setBudget] = useState(companyObject.metrics.business.annualSecurityBudget);
  const [spent, setSpent] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(companyObject.metrics.business.annualSecurityBudget);
  const [capacityGRC, setCapacityGRC] = useState(companyObject.metrics.security.teamCapacity.GRC);
  const [capacityCorporateSecurity, setCapacityCorporateSecurity] = useState(companyObject.metrics.security.teamCapacity.corpSec);
  const [capacityProductSecurity, setCapacityProductSecurity] = useState(companyObject.metrics.security.teamCapacity.prodSec);
  const [capacitySOC, setCapacitySOC] = useState(companyObject.metrics.security.teamCapacity.SOC);
  
  function updateRemainingBudget() {
    let employeesEngineering = companyObject.metrics.business.employeesEngineering;
    let employeesNonEngineering = companyObject.metrics.business.employeesNonEngineering;
    let costPerEngineer = companyObject.metrics.business.securityCosts.dollarsAnnually.perEngineer;
    let costPerNonEngineer = companyObject.metrics.business.securityCosts.dollarsAnnually.perNonEngineer;
    let fixedCost = companyObject.metrics.business.securityCosts.dollarsAnnually.fixed;
    let budget = companyObject.metrics.business.annualSecurityBudget;
    let spent = ((employeesEngineering + costPerEngineer) + (employeesNonEngineering + costPerNonEngineer) + fixedCost);
    setSpent(spent);
    let remaining = budget - spent;
    setRemainingBudget(remaining); 
  }


  useEffect(() => {
    console.log(companyObject);
  }, [companyObject]);


  return (
    <div>
      {companyObject.firstDayPrompts.map((item) => (
        <p>{item}</p>
      ))}
      <p>Budget spent: {spent}</p>
      <p>Budget remaining: {remainingBudget}</p>
      <p></p>
      <p>You have invested in:</p>
      <p></p>
      <p>Select from one of the following areas to invest in:</p>
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

export default Invest;
