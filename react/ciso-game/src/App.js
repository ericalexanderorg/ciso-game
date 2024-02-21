import React, { useState } from 'react';
import CompanySelection from './SelectCompany';
import Invest from './SelectInvestments';

const App = () => {
  const [companyObject, setCompany] = useState(null);

  const handleCompanySelect = (selectedCompany) => {
    setCompany(selectedCompany);
  };

  return (
    <div>
      {!companyObject && <CompanySelection onCompanySelect={handleCompanySelect} />}
      {companyObject && <Invest companyObject={companyObject} />}     
    </div>
  );
};

export default App;
