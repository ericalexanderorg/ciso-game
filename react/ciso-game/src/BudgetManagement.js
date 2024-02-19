// BudgetManagement.js
import React, { useState } from 'react';

const BudgetManagement = ({ budget, expenses, onExpenseAdd }) => {
  const [newExpense, setNewExpense] = useState('');
  const [remainingBudget, setRemainingBudget] = useState(budget);

  const handleAddExpense = () => {
    onExpenseAdd(newExpense);
    setNewExpense('');
    setRemainingBudget(remainingBudget - newExpense);
  };

  return (
    <div>
      <h1>Your budget is: {remainingBudget}</h1>
      <input
        type="text"
        value={newExpense}
        onChange={(e) => setNewExpense(e.target.value)}
        placeholder="Enter new expense"
      />
      <button onClick={handleAddExpense}>Add Expense</button>
      <h2>Expenses:</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>{expense}</li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetManagement;
