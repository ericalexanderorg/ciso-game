import React, { useState, useEffect } from 'react';
import data from './data.json'; 
//import './tiles.css'; 

const GameOver = ({ CompanyObject }) => {
  const [grade, setGrade] = useState('A+');
  const [withinBudget, setWithinBudget] = useState('No');
  const [hasSecurityPolicies, setHasSecurityPolicies] = useState('No');
  const [hasPrivacyPolicy, setHasPrivacyPolicy] = useState('No');
  const [hasGRCCapacity, setHasGRCCapacity] = useState('No');
  const [hasCorporateSecurityCapacity, setHasCorporateSecurityCapacity] = useState('No');
  const [hasSOCCapacity, setHasSOCCapacity] = useState('No');
  const [hasProductSecurityCapacity, setHasProductSecurityCapacity] = useState('No');


  useEffect(() => {
    console.log('started')

    CompanyObject = data.companies.test;
    
    let score = 100;

    // Invested in security policies?
    if (Object.values(CompanyObject.investments).includes("Security Policies")){
      setHasSecurityPolicies('Yes');
    }
    else {
      score -= 10;
    }

    // Invested in a privacy policy?
    if (Object.values(CompanyObject.investments).includes("Privacy Policy")){
      setHasPrivacyPolicy('Yes');
    }
    else {
      score -= 10;
    }

    // Has GRC Capacity?
    if (CompanyObject.metrics.security.teamCapacity.GRC > 0) {
      setHasGRCCapacity('Yes');
    }
    else {
      score -= 10;
    }

    // Has Corporate Security Capacity?
    if (CompanyObject.metrics.security.teamCapacity['Corporate Security'] > 0) {
      setHasCorporateSecurityCapacity('Yes');
    }
    else {
      score -= 10;
    }

    // Has Product Security Capacity?
    if (CompanyObject.metrics.security.teamCapacity['Product Security'] > 0) {
      setHasProductSecurityCapacity('Yes');
    }
    else {
      score -= 10;
    }

    // Has SOC Capacity?
    if (CompanyObject.metrics.security.teamCapacity['SOC'] > 0) {
      setHasSOCCapacity('Yes');
    }
    else {
      score -= 10;
    }

    if (score >= 95){
      setGrade('A+')
    }
    else if (score >= 90) {
      setGrade('A')
    }
    else if (score >= 85) {
      setGrade('B+')
    }
    else if (score >= 80) {
      setGrade('B')
    }
    else if (score >= 75) {
      setGrade('C+')
    }
    else if (score >= 70) {
      setGrade('C')
    }
    else if (score >= 60) {
      setGrade('D')
    }
    else {
      setGrade('F')
    }

  }); 

  return (
    <div className="tile-container">
      <div>
        <h1>You've invested your entire budget!</h1>
      </div>
      <div>
        Let's see how you did. Were you able to purchase all of your need to haves?
      </div>
      <ul>
        <li>Within 10% of your budget: {withinBudget}</li>
        <li>Security Policies: {hasSecurityPolicies}</li>
        <li>Privacy Policy: {hasPrivacyPolicy}</li>
        <li>GRC capacity to service requests: {hasGRCCapacity}</li>
        <li>Corporate Security Capacity: {hasCorporateSecurityCapacity}</li>
        <li>SOC Capacity: {hasSOCCapacity}</li>
        <li>Product Security Capacity: {hasProductSecurityCapacity}</li>
      </ul>
      <div>
        You get a {grade}
      </div>
    </div>
  );
};

export default GameOver;
