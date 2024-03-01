import React, { useState } from 'react';
import Modal from './Modal';
import Spent from './Spent';
import BudgetBar from './BudgetBar';
import ErrorMessage from './ErrorMessage';
import data from './data.json'; 


const Invest = ({ companyObject, onGameOver }) => {  
  const [budget] = useState(companyObject.metrics.business.annualSecurityBudget);
  const [spent, setSpent] = useState(0);
  const [investments, setInvestments] = useState(['None yet!']);
  const [capacityGRC, setCapacityGRC] = useState(companyObject.metrics.security.teamCapacity.GRC);
  const [capacityCorporateSecurity, setCapacityCorporateSecurity] = useState(companyObject.metrics.security.teamCapacity['Corporate Security']);
  const [capacityProductSecurity, setCapacityProductSecurity] = useState(companyObject.metrics.security.teamCapacity['Product Security']);
  const [capacitySOC, setCapacitySOC] = useState(companyObject.metrics.security.teamCapacity.SOC);
  const [showModal, setShowModal] = useState(false);
  const [selectedInvestmentArea, setSelectedInvestmentArea] = useState(null);
  const [error, setError] = useState('');


  const purchase = (selection) => {
    if (!addInvestment(selection)){
      // Purchase already made and user notified it was blocked
      // return before closing the modal
      return;
    }
    
    // This is hacky 
    // mergeObjects is recursive and has a check to block negative metrics
    // it can block anywhere in the recursion, so this try/catch is there for the error to bubble up through the recursion
    // I'm sure there's a better way, just not interested in figuring it out ATM
    // this is good enough for now
    try {
      companyObject.metrics = mergeObjects(companyObject.metrics, data.investments[selectedInvestmentArea][selection].metrics)
      setCapacityGRC(companyObject.metrics.security.teamCapacity.GRC);
      setCapacityCorporateSecurity(companyObject.metrics.security.teamCapacity['Corporate Security']);
      setCapacityProductSecurity(companyObject.metrics.security.teamCapacity['Product Security']);
      setCapacitySOC(companyObject.metrics.security.teamCapacity.SOC);
      let s = Spent(companyObject.metrics);
      setSpent(s);
      if (s >= budget){
        onGameOver(companyObject);
      }
      setShowModal(false);
    }
    catch {
      removeLastInvestment();
    }
    
  };

  const addInvestment = (investment) => {
    if (companyObject.investments.find(element => element === investment)){
      setError(investment + " already purchased. Choose another investment");
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
    const result = {};

    for (let key in obj1) {
        if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
            if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                result[key] = mergeObjects(obj1[key], obj2[key]); 
            } else if (typeof obj1[key] === 'number' && typeof obj2[key] === 'number') {
                let r = obj1[key] + obj2[key];
                if (r < 0){
                  setError('Your team does not have enough ' + key + ' capacity to service this purchase. Hire to increase capacity.');
                  throw new Error("Insufficient Capacity")
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
    setError(null);
    setShowModal(false);
  };

  return (
    <div className="tiles">
      <div className="title-tile">
          <h2>Welcome to {companyObject.description}</h2>
      </div>
      <div className="objective-tile">
          <p>Your objectives for the year are:</p>
          <ol>
              {companyObject.prompts.priorities.map((priority) => (
              <li>{priority}</li>
              ))}
          </ol>
      </div>
        <div className="detail-tile">
        <p>Additional detail that may help with your investment choices:</p>
        <ul>
            {companyObject.prompts.additionalDetail.map((priority) => (
            <li>{priority}</li>
            ))}
        </ul>
      </div>
      <div className="budget-tile">
        <BudgetBar totalBudget={budget} budgetSpent={spent} />
      </div>
      <div className="capacity-tile">
        <p>Your team has the following hours a week capacity in these areas (hire to increase):</p>
        <ul>
          <li>GRC: {capacityGRC}</li>
          <li>Corporate Security: {capacityCorporateSecurity}</li>
          <li>Product Security: {capacityProductSecurity}</li>
          <li>SOC: {capacitySOC}</li>
        </ul>
      </div>
      <div className="select-area">
        <p>Select from one of the following areas to invest in:</p>
        
        {Object.entries(data.investments).map(([key, company]) => (
          <button style={{ padding: '10px 20px', margin: '5px' }} onClick={() => openModal(key)}>{key}</button>
        ))}
      </div>
      <div className="investments-tile">
        <p>Investments:</p>
        <ul>
          {investments.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>

      {showModal && (
        <Modal onClose={closeModal}>
          {error && <ErrorMessage message={error} />}
          <p>{selectedInvestmentArea}</p>
          <p>Select from one of the following options:</p>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {Object.entries(data.investments[selectedInvestmentArea]).map(([key, node]) => (
              <button style={{ padding: '10px 20px', margin: '5px' }} onClick={() => purchase(key)}>{node.description}</button>
            ))}
          </div>

        </Modal>
      )}
      
    </div>
  );
};

export default Invest;
