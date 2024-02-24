import React, { useState, useEffect } from 'react';
import data from './data.json'; 
import Tree from './Tree';
//import './tiles.css'; 

const Invest = ({ companyObject }) => {  
  const [budget, setBudget] = useState(companyObject.metrics.business.annualSecurityBudget);
  const [spent, setSpent] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(companyObject.metrics.business.annualSecurityBudget);
  const [capacityGRC, setCapacityGRC] = useState(companyObject.metrics.security.teamCapacity.GRC);
  const [capacityCorporateSecurity, setCapacityCorporateSecurity] = useState(companyObject.metrics.security.teamCapacity['Corporate Security']);
  const [capacityProductSecurity, setCapacityProductSecurity] = useState(companyObject.metrics.security.teamCapacity['Product Security']);
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


  const handleClick = (x) => {
    //onCompanySelect(companyObject)
    alert(x);
  };


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
      <p>Your team has the following hours a week capacity in these areas (hire to increase):</p>
      <ul>
        <li>GRC: {capacityGRC}</li>
        <li>Corporate Security: {capacityCorporateSecurity}</li>
        <li>Product Security: {capacityProductSecurity}</li>
        <li>SOC: {capacitySOC}</li>
      </ul>
      <p></p>
      <p>Select from one of the following areas to invest in:</p>
      <div>
        <Tree data={data.investments} />
      </div>

      {/*
      {Object.entries(data.investments).map(([key, company]) => (
        <div  
          key={key}
          className={`tile`}
          onClick={() => handleClick(key)}
        >
          {key}
        </div>
      ))}
      */}
    </div>
  );
};

export default Invest;
