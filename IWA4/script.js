const date = 2050
const status = 'parent'
var count = 0
var Newdate = ""

if (date == 2050) {
	console.log("January", 'New Year’s Day')
	console.log("March", 'Human Rights Day')
	Newdate = 'April'
	console.log(Newdate, 'Family Day')
	console.log(Newdate, 'Freedom Day')
	count = count + 4
}

if (status == "student") {
	  console.log('June', 'Youth Day')
		count = count + 1
  }

	console.log('August', 'Women’s Day')
	console.log('September', 'Heritage Day')
	Newdate = 'December'
	console.log(Newdate, 'Day of Reconciliation')
	count = count + 3

if (status == "parent") {
	  console.log(Newdate, 'Christmas Day')
		count = count + 1
  }

if (status == "parent" || status == "student") {
	console.log(Newdate, 'Day of Goodwill')
	count = count + 1
}

console.log('Your status is:', status)
console.log('The year is:', date)
console.log('The total holidays is:', count)