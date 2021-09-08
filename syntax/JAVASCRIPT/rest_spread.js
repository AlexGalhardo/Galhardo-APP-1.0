// REST ARRAY 
const numbers = [1, 2, 3, 4, 5]
const [first, second, ...restArray] = numbers 
console.log(first, second, restArray) // 1 2 [ 3, 4, 5 ]

// REST OBJECT
const person = {
	firstName: 'alex',
	lastName: 'galhardo',
	age: 24,
	address: {
		rua: 'logo ali',
		number: 42
	}
}

const { firstName, ...restPerson } = person
console.log(firstName, restPerson) 
/*
alex {
  lastName: 'galhardo',
  age: 24,
  address: { rua: 'logo ali', number: 42 }
}
*/

// REST FUNCTIONS
const sum = (...numbers) => numbers.reduce((total, next) => total+next) // 30

console.log(sum(5, 5, 10, 10))


// SPREAD = "espalhar"

// SPREAD ARRAYS
const numbers1 = [1, 2, 3, 4, 5]
const numbers2 = [6, 7, 8, 9, 10]

const allNumbers = [...numbers1, ...numbers2]
console.log(allNumbers) // [1, 2, 3, 4,  5,6, 7, 8, 9, 10]

// SPREAD OBJECTS
const customer = {
	firstName: 'alex',
	lastName: 'galhardo',
	age: 24,
	company: 'Microsoft'
}

const newCustomer = {
	...customer,
	company: 'Google'
}

console.log(customer, newCustomer)