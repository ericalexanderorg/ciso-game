import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Spent from './Spent';
import data from './data.json'; 


const Invest = ({ companyObject, onGameOver }) => {  
  const [budget] = useState(companyObject.metrics.business.annualSecurityBudget);
  const [spent, setSpent] = useState(0);
  const [investments, setInvestments] = useState([]);
  const [remainingBudget, setRemainingBudget] = useState(companyObject.metrics.business.annualSecurityBudget);
  const [capacityGRC, setCapacityGRC] = useState(companyObject.metrics.security.teamCapacity.GRC);
  const [capacityCorporateSecurity, setCapacityCorporateSecurity] = useState(companyObject.metrics.security.teamCapacity['Corporate Security']);
  const [capacityProductSecurity, setCapacityProductSecurity] = useState(companyObject.metrics.security.teamCapacity['Product Security']);
  const [capacitySOC, setCapacitySOC] = useState(companyObject.metrics.security.teamCapacity.SOC);
  const [showModal, setShowModal] = useState(false);
  const [selectedInvestmentArea, setSelectedInvestmentArea] = useState('test investment area');


  const purchase = (selection) => {
    if (!addInvestment(selection)){
      return;
    }
    setShowModal(false);
    companyObject.metrics = mergeObjects(companyObject.metrics, data.investments[selectedInvestmentArea][selection].metrics)
    setCapacityGRC(companyObject.metrics.security.teamCapacity.GRC);
    setCapacityCorporateSecurity(companyObject.metrics.security.teamCapacity['Corporate Security']);
    setCapacityProductSecurity(companyObject.metrics.security.teamCapacity['Product Security']);
    setCapacitySOC(companyObject.metrics.security.teamCapacity.SOC);
    let s = Spent(companyObject.metrics);
    setSpent(s);
    setRemainingBudget(budget - s); 
    if (s >= budget){
      onGameOver(companyObject);
    }
  };

  const addInvestment = (investment) => {
    if (companyObject.investments.find(element => element === investment)){
      alert(investment + " already purchased. Choose another investment");
      return false;
    }
    companyObject.investments.push(investment)
    setInvestments(companyObject.investments);
    return true;
  };

  const removeLastInvestment = () => {
    companyObject.investments.pop();
    setInvestments(companyObject.investments);
  };

  const mergeObjects = (obj1, obj2) => {
    const backup = obj1;
    const result = {};

    for (let key in obj1) {
        if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
            if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                result[key] = mergeObjects(obj1[key], obj2[key]); 
            } else if (typeof obj1[key] === 'number' && typeof obj2[key] === 'number') {
                let r = obj1[key] + obj2[key];
                if (r < 0){
                  removeLastInvestment();
                  alert('Your team does not have enough ' + key + ' capacity to service this request. You will need to hire before purchasing');
                  return backup;
                }
                else {
                  result[key] = r;
                }
            } 
        } else {
            result[key] = obj1[key];
        }
    }
    return result;
  };

  const openModal = (investmentArea) => {
    setSelectedInvestmentArea(investmentArea);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {companyObject.firstDayPrompts.map((item) => (
        <p>{item}</p>
      ))}
      <p>Budget spent: {spent}</p>
      <p>Budget remaining: {remainingBudget}</p>
      <p></p>
      <p>You have invested in:</p>
      <ul>
        {investments.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      <p>Your team has the following hours a week capacity in these areas (hire to increase):</p>
      <ul>
        <li>GRC: {capacityGRC}</li>
        <li>Corporate Security: {capacityCorporateSecurity}</li>
        <li>Product Security: {capacityProductSecurity}</li>
        <li>SOC: {capacitySOC}</li>
      </ul>
      <p></p>
      <p>Select from one of the following areas to invest in:</p>
      
      {Object.entries(data.investments).map(([key, company]) => (
        <button onClick={() => openModal(key)}>{key}</button>
      ))}

      {showModal && (
        <Modal onClose={closeModal}>
          <p>{selectedInvestmentArea}</p>
          <p>Select from one of the following options:</p>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {Object.entries(data.investments[selectedInvestmentArea]).map(([key, node]) => (
              <button onClick={() => purchase(key)}>{node.description}</button>
            ))}
          </div>

        </Modal>
      )}
      
    </div>
  );
};

export default Invest;
