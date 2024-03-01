import React, { useState, useEffect } from 'react';
import Spent from './Spent';
import EssentialItemsGrid from './EssentialItemsGrid';

const GameOver = ({ companyObject }) => {
  const [grade, setGrade] = useState('A+');
  const [withinBudget, setWithinBudget] = useState('No');
  const [hasSecurityPolicies, setHasSecurityPolicies] = useState('No');
  const [hasPrivacyPolicy, setHasPrivacyPolicy] = useState('No');
  const [hasGRCCapacity, setHasGRCCapacity] = useState('No');
  const [hasCorporateSecurityCapacity, setHasCorporateSecurityCapacity] = useState('No');
  const [hasSOCCapacity, setHasSOCCapacity] = useState('No');
  const [hasProductSecurityCapacity, setHasProductSecurityCapacity] = useState('No');
  const essentialItems = [
    { title: 'Within 10% of Budget', explanation: 'The CFO is happy as long as you\'re within 5% of budget.' },
    { id: 2, title: 'Item 2', explanation: 'Explanation for Item 2' },
  ];


  useEffect(() => {
    let score = 100;

    // Within 10% of the budget?
    if (Spent(companyObject.metrics) <= (companyObject.metrics.business.annualSecurityBudget * 0.05) + companyObject.metrics.business.annualSecurityBudget) {
      setWithinBudget('Yes');
      companyObject.investments.push('Within 10% of Budget')
    }
    else {
      score -= 10;
    }

    // Invested in security policies?
    if (Object.values(companyObject.investments).includes("Security Policies")){
      setHasSecurityPolicies('Yes');
    }
    else {
      score -= 10;
    }

    // Invested in a privacy policy?
    if (Object.values(companyObject.investments).includes("Privacy Policy")){
      setHasPrivacyPolicy('Yes');
    }
    else {
      score -= 10;
    }

    // Has GRC Capacity?
    if (companyObject.metrics.security.teamCapacity.GRC > 0) {
      setHasGRCCapacity('Yes');
    }
    else {
      score -= 10;
    }

    // Has Corporate Security Capacity?
    if (companyObject.metrics.security.teamCapacity['Corporate Security'] > 0) {
      setHasCorporateSecurityCapacity('Yes');
    }
    else {
      score -= 10;
    }

    // Has Product Security Capacity?
    if (companyObject.metrics.security.teamCapacity['Product Security'] > 0) {
      setHasProductSecurityCapacity('Yes');
    }
    else {
      score -= 10;
    }

    // Has SOC Capacity?
    if (companyObject.metrics.security.teamCapacity['SOC'] > 0) {
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

  }, [companyObject]); 

  return (
    <div className="tile-container">
      <div>
        <h1>Budget invested! Let's see how you did.</h1>
      </div>
      <EssentialItemsGrid essentialItems={essentialItems} selectedItems={companyObject.investments} />

      <div>
        Your grade is {grade} based on your investment choices.
      </div>
    </div>
  );
};

export default GameOver;
