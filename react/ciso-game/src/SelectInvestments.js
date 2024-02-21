import React, { useState, useEffect } from 'react';
//import data from './data.json'; 
//import './tiles.css'; 

const Invest = ({ companyObject }) => {  
  useEffect(() => {
    console.log(companyObject);
  }, [companyObject]);


  return (
    <div>
      <ul>
        {companyObject.firstDayPrompts.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Invest;
