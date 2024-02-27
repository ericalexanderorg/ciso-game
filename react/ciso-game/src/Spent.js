
const calculateSpent = (metrics) => {
    console.log(metrics)
    let employeesEngineering = metrics.business.employeesEngineering;
    let employeesNonEngineering = metrics.business.employeesNonEngineering;
    let costPerEngineer = metrics.business.securityCosts.dollarsAnnually.perEngineer;
    let costPerNonEngineer = metrics.business.securityCosts.dollarsAnnually.perNonEngineer;
    let fixedCost = metrics.business.securityCosts.dollarsAnnually.fixed;

    return (employeesEngineering * costPerEngineer) + (employeesNonEngineering * costPerNonEngineer) + fixedCost;
};

export calculateSpent;