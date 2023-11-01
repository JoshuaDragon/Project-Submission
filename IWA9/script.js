const salary = 4000;
const lodging = 'apartment'
const size = 'large'


// Only change the syntax below (not the values or key names)

const expenses = {
    food: 51.7501,
    transport:  10.2,
}
  
const tax = {
    734: '3%',
    234: '20%',
    913: '12%',
    415: '38%',
    502: '42%',
}

const rent = {
    none: 0,
    'small-room': 200,
    'large-room': 300,
    'small-apartment': 400,
    'large-apartment': 800,
    'small-house': 1200,
    'large-house': 2400,
}

// You can change below however you want

// Calculate the tax amount
const taxAmount = salary * (parseFloat(tax[913]) / 100);

// Calculate the rent based on lodging and size
const rentKey = `${size}-${lodging}`;
const rentAmount = rent[rentKey] || 0;

// Calculate the remaining balance after expenses
const balance = salary - taxAmount - expenses.food - expenses.transport - rentAmount;

// Round the balance to two decimal places
const roundedBalance = balance.toFixed(2);

console.log(roundedBalance);