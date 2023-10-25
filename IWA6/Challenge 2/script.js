const rent = 400;
const tax = '8%';
const food = 51.7501;
const salary = 800;
const transport = 10.2;
const hourOfDay = 00;
const minuteOfDay = 00;

// Only change below this line

if (hourOfDay !== null && minuteOfDay !== null && hourOfDay == 0 && minuteOfDay == 0) 
	{var taxAsDecimal = Number(tax.replace('%', '')) / 100
    const startingAfterTax = salary * (1 - taxAsDecimal)
	var balance = startingAfterTax - transport - food - rent
	
console.log(balance.toFixed(3))
    }