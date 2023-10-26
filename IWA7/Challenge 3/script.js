const leoName = 'Leo'
const leoSurname = 'Musvaire     '
const leoBalance = '-9394'

const sarahName = 'Sarah    '
const sarahSurname = 'Kleinhans'
const sarahBalance = '-4582.2'

const divider = '----------------------------------'

// Only change below this line
const leoAmountOwed = Math.abs(parseFloat(leoBalance)).toFixed(2);
const sarahAmountOwed = Math.abs(parseFloat(sarahBalance)).toFixed(2);

const totalOwedAmount = parseFloat(leoBalance) + parseFloat(sarahBalance);
const totalOwedString = "R " + Math.abs(totalOwedAmount).toFixed(2);

const leoMessage = `${leoName} ${leoSurname.trim()} (Owed: R ${leoAmountOwed})`;
const sarahMessage = `${sarahName.trim()} ${sarahSurname} (Owed: R ${sarahAmountOwed})`;

const totalMessage = `Total amount owed: ${totalOwedString}`;

const result = `${leoMessage}\n${sarahMessage}\n${divider}\n${totalMessage}\n${divider}`

console.log(result);