// App.js
import React, { useState, useEffect } from 'react';
import CompanySelection from './CompanySelection';
import BudgetManagement from './BudgetManagement';
import GameOver from './GameOver';
import data from './data.json';

const App = () => {
  const [data, setData] = useState([]);
  const [company, setCompany] = useState(null);
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [gameOver, setGameOver] = useState(false);


  useEffect(() => {
    if (company) {
      // Set the budget based on the selected company
      setBudget(company.budget);
    }
  }, [company]);

  const handleCompanySelect = (selectedCompany) => {
    alert(selectedCompany + "in app.js");
    setCompany(selectedCompany);
  };

  const handleExpenseAdd = (expense) => {
    setExpenses([...expenses, expense]);
    if (budget - expense <=  0) {
      setGameOver(true);
    }
  };

  return (
    <div>
      {!company && <CompanySelection onCompanySelect={handleCompanySelect} />}
      {company && !gameOver && (
        <BudgetManagement
          budget={budget}
          expenses={expenses}
          onExpenseAdd={handleExpenseAdd}
        />
      )}
      {gameOver && <GameOver score={budget - expenses.reduce((a, b) => a + b,  0)} />}
    </div>
  );
};

export default App;
