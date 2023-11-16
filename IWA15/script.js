// scripts.js

const data = {
	lists: [
		['first', [15, 11, 13, 7, 5]],
		['second', [2, 6, 8, 4, 14, 12, 10]],
		['third', [9, 3, 1]],
	]
}

// Only edit below

// Destructure the lists from the data object
const [, first] = data.lists[0] || [, []];
const [, second] = data.lists[1] || [, []];
const [, third] = data.lists[2] || [, []];

const result = [];

const extractBiggest = () => {
	// Get the last elements of each array
	const firstLast = first.slice(-1)[0] || -Infinity;
	const secondLast = second.slice(-1)[0] || -Infinity;
	const thirdLast = third.slice(-1)[0] || -Infinity;

	// Determine which array contains the largest last element
	if (firstLast >= secondLast && firstLast >= thirdLast) {
		result.push(first.pop());
	} else if (secondLast >= firstLast && secondLast >= thirdLast) {
		result.push(second.pop());
	} else {
		result.push(third.pop());
	}
}

// Only edit above

result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())

result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())

result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())

console.log(result)