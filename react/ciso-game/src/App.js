import React, { useState } from 'react';
import CompanySelection from './SelectCompany';
import Invest from './SelectInvestmentArea';
import GameOver from './GameOver';

const App = () => {
  const [companyObject, setCompany] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const handleCompanySelect = (selectedCompany) => {
    setCompany(selectedCompany);
  };

  const handleGameOver = () => {
    setGameOver(true);
  }

  return (
    <div>
      {/*
      {!companyObject && <CompanySelection onCompanySelect={handleCompanySelect} />}
      {!gameOver && companyObject && <Invest companyObject={companyObject} onGameOver={handleGameOver} />}   
  */} 
      {!gameOver && <GameOver companyObject={companyObject} />}  
    </div>
  );
};

export default App;
