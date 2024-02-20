import React, { useState } from 'react';
import CompanySelection from './SelectCompany';
import BudgetManagement from './SelectInvestments';

const App = () => {
  const [company, setCompany] = useState(null);
  const [invested, setInvestments] = useState(null);

  const handleCompanySelect = (selectedCompany) => {
    setCompany(selectedCompany);
  };

  const handleInvestmentsSpent = (investmentsSpent) => {
    setInvestments(investmentsSpent);
  };

  return (
    <div>
      {!company && <CompanySelection onCompanySelect={handleCompanySelect} />}
      {/* {!invested && <BudgetManagement onDoneInvesting={handleInvestmentsSpent} />}     */}
    </div>
  );
};

export default App;
