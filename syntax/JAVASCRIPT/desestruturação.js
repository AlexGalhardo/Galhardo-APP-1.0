// ARRAYS
const fruits = ['laranjas', 'morango', 'maça']

// const [fruit0, fruit1] = fruits
// console.log(fruit0, fruit1) // laranjas, morango

const [fruit0, ,fruit2] = fruits
console.log(fruit0, fruit2) // laranjas, maça


// OBJECTS
const person = {
	firstName: 'alex',
	lastName: 'galhardo',
	age: 24,
	address: {
		rua: 'logo ali',
		number: 42
	}
}

const {firstName, lastName, address: {rua} } = person

console.log(firstName, lastName, rua)


// FUNCTIONS
const showFullName = ({firstName, lastName}) => console.log(`${firstName} ${lastName}`)

showFullName(person)