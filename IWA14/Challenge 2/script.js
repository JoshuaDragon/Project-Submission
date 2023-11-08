// script.js

const add = (a, b) => a + b; // Corrected the function declaration
const multiply = (a, b) => a * b; // Corrected the function declaration

function internal() {
  const internalD = add(this.internal.a, this.internal.b); // Used "add" function and stored the result in "d"
  const internalE = multiply(internalD, this.internal.c); // Used "multiply" function and updated "d"
  console.log(internalE)
  return internalE; // Return the value of "e"
}

// Not allowed to change below this

const example1 = {
	internal: {
		a: 2,
		b: 4,
		c: 8,
	},
	add,
	multiply,
  calculate: internal
}

const example2 = {
	internal: {
		a: 2,
		b: 2,
		c: 3,
	},
	add,
	multiply,
  calculate: internal
}

example1.calculate()
example2.calculate()