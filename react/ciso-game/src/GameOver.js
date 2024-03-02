import React, { useState, useEffect } from 'react';
import Spent from './Spent';
import EssentialItemsGrid from './EssentialItemsGrid';

const GameOver = ({ companyObject }) => {
  const [investments, setInvestments] = useState([]);
  const essentialItems = [
    { title: 'Within Budget Margin', explanation: 'The CFO is happy as long as you\'re within 5% of budget.' },
    { title: 'Security Policies', explanation: 'Non-negotiable. Security policies are the foundation of a security program.' },
    { title: 'Privacy Policy', explanation: 'In the United States, while there isn\'t a federal law explicitly mandating all websites to have a privacy policy, several state laws and regulations, such as the California Online Privacy Protection Act (CalOPPA), do require websites that collect personal information from California residents to have a privacy policy that discloses certain information about data collection and usage practices.' },
    { title: 'Remote Monitoring & Management', explanation: 'You can\'t protect what you can\'t see. A RMM platform enables securing, monitoring, and managing endpoints.' },
    { title: 'Cloud Security Posture Management', explanation: 'You can\'t protect what you can\'t see. A CSPM platform provides situational awareness on insecure configs, missing patches, and more.' }, 
    { title: 'Endpoint Protection', explanation: 'Endpoint protection helps defend these devices against malware, viruses, ransomware, and other threats. It\'s non-negotiable in any security program' },
    { title: 'Security Testing', explanation: 'You need tools and services to do security testing. With your budget, it\'s just not possible to hire your way out of this problem. You need one or more of the following: Annual Pentesting, Bug Bounty, Vulnerability Scanner.' },
    { title: 'GRC Capacity', explanation: 'You\'ll need GRC capacity to service assurance & customer security questions, auditing, TPRM, and related work.' },
    { title: 'Corporate Security Capacity', explanation: 'You\'ll need Corporate Security capacity to ensure you have an inventory of endpoint assets, they have AV/EDR/XDR, they\'re encrypted, you have a secure access solution, and more.' },
    { title: 'Product Security Capacity', explanation: 'You\'ll need Product Security capacity to ensure security is built into your product, engineering is keeping up with patching, vulnerabilities are found & fixed, and more.'},
    { title: 'SOC Capacity', explanation: 'You\'ll need SOC capacity to ensure logs are monitored, threats are contained, and more.' }
  ];


  useEffect(() => {
    let _investments = [];
    if (Spent(companyObject.metrics) <= (companyObject.metrics.business.annualSecurityBudget * 0.05) + companyObject.metrics.business.annualSecurityBudget) {
      _investments.push('Within Budget Margin');
    }

    if (companyObject.investments.includes('Security Policies')) {
      _investments.push('Security Policies');
    }

    if (companyObject.investments.includes('Privacy Policy')) {
      _investments.push('Privacy Policy');
    }

    if (companyObject.investments.includes('RMM')) {
      _investments.push('Remote Monitoring & Management');
    }

    if (companyObject.investments.includes('CSPM')) {
      _investments.push('Cloud Security Posture Management');
    }

    // Has security testing capability?
    const securityTestingOptions = ['Annual Pentesting', 'Bug Bounty', 'Vulnerability Scanner'];
    const purchasedSecurityTesting = securityTestingOptions.some(item => companyObject.investments.includes(item));
    if (purchasedSecurityTesting) {
      _investments.push('Security Testing');
    }

    // Has endpoint protection?
    const endpointProtectionOptions = ['AV', 'EDR', 'XDR'];
    const purchasedEndpointProtection = endpointProtectionOptions.some(item => companyObject.investments.includes(item));
    if (purchasedEndpointProtection) {
      _investments.push('Endpoint Protection');
    }

    // Has GRC Capacity?
    if (companyObject.metrics.security.teamCapacity.GRC > 0) {
      _investments.push('GRC Capacity');
    }

    // Has Corporate Security Capacity?
    if (companyObject.metrics.security.teamCapacity['Corporate Security'] > 0) {
      _investments.push('Corporate Security Capacity');
    }

    // Has Product Security Capacity?
    if (companyObject.metrics.security.teamCapacity['Product Security'] > 0) {
      _investments.push('Product Security Capacity');
    }

    // Has SOC Capacity?
    if (companyObject.metrics.security.teamCapacity['SOC'] > 0) {
      _investments.push('SOC Capacity');
    }

    setInvestments(_investments);

  }, [companyObject]); 

  return (
    <div className="tile-container">
      <div>
        <h1>Budget invested!</h1>
        <p>Let's see how you did. Did you get all of your need to haves?</p>
      </div>
      <EssentialItemsGrid essentialItems={essentialItems} selectedItems={investments} />
      <div>
        <h1>What about my other investments?</h1>
        <p>There's a lot of nice-to-haves. Some of them may serve you well IF you covered the essentials first.</p>
      </div>
    </div>
  );
};

export default GameOver;
