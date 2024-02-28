import React from 'react';

const BudgetBar = ({ totalBudget, budgetSpent }) => {
  // Calculate the percentage of budget spent
  const percentageSpent = (budgetSpent / totalBudget) * 100;

  return (
    <div style={{ width: '100%', backgroundColor: '#f0f0f0', borderRadius: '5px', height: '40px', marginTop: '10px', position: 'relative', display: 'flex', alignItems: 'center' }}>
      <div style={{ width: `${percentageSpent}%`, backgroundColor: '#007bff', borderRadius: '5px', height: '100%', position: 'absolute', top: '0', left: '0' }} />
      <div style={{ position: 'absolute', top: '50%', left: '0', transform: 'translateY(-50%)', padding: '0 10px' }}>Spent: ${budgetSpent}</div>
      <div style={{ position: 'absolute', top: '50%', right: '0', transform: 'translateY(-50%)', padding: '0 10px' }}>Budget: ${totalBudget}</div>
    </div>
  );
};

export default BudgetBar;
