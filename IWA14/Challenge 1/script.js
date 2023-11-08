const firstName = 'John';
const age = 35;
const hobby = 'Coding';

const logTwice = (message) => {
  console.log(message);
  console.log(message);
}

function greet() {
  logTwice(`Hello, ${firstName} (${age}). I love ${hobby}!`);
}

greet();