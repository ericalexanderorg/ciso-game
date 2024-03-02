import React, { useState, useEffect } from 'react';
import CompanySelection from './SelectCompany';
import Invest from './SelectInvestmentArea';
import GameOver from './GameOver';
import './styles.css';

const App = () => {
  const [companyObject, setCompany] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const handleCompanySelect = (selectedCompany) => {
    setCompany(selectedCompany);
  };

  const handleGameOver = (companyObject) => {
    setCompany(companyObject);
    setGameOver(true);
  }

  useEffect(() => {
    document.title = "CISO Game";
  }, []);

  return (
    <div className="app">
      {!companyObject && <CompanySelection onCompanySelect={handleCompanySelect} />}
      {!gameOver && companyObject && <Invest companyObject={companyObject} onGameOver={handleGameOver} />}   
      {gameOver && companyObject && <GameOver companyObject={companyObject} />}  
    </div>
  );
};

export default App;
