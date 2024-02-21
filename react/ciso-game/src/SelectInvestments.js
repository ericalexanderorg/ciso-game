import React, { useState, useEffect } from 'react';
//import data from './data.json'; 
//import './tiles.css'; 

const Invest = ({ companyObject }) => {  
  useEffect(() => {
    console.log(companyObject);
  }, [companyObject]);


  return (
    <div>
      {companyObject.description}
    </div>
  );
};

export default Invest;
