// ARRAY FOR EACH
// update original array
const numbers = [1, 2, 3, 4, 5]
numbers.forEach((number, index) => numbers[index] = number+1)
console.log('FOREACH: ', numbers) // [2, 3, 4, 5, 6]


// ARRAY MAP
// return a new array
const newArray = numbers.map((number, index) => numbers[index] = number+2)
console.log('\n\nMAP: ', newArray) // [4, 5, 6, 7, 8]


// ARRAY REDUCE
// reduce return to only a integer, boolean, array, obj, etc
const total = numbers.reduce((total, next) => total + next)
console.log('\n\nREDUCE: ', total) // 30


// ARRAY FILTER
// return a new array where each loop condition is true
const todos = [
    {text: 'lavar louça', done: false},
    {text: 'lavar roupa', done: true},
    {text: 'fazer janta', done: false}
]
const doneTodos = todos.filter((todo) => todo.done)
console.log('\n\nFILTER: ', doneTodos) // [{text: 'lavar roupa', done: true}]



// ARRAY FIND
// return only obect
const find = todos.find(function(todo){
    return todo.text === 'fazer janta'
})
console.log('\n\nFIND: ', find) // {text: 'fazer janta', done: false}


// ARRAY FIND INDEX
const index = todos.findIndex(function(todo){
    return todo.text === 'lavar louça'
})
console.log('\n\nINDEX: ', index) // 0


// ARRAY HAS SOME
cars = ['fusca', 'hb20', 'ferrari']
const hasFusca = cars.some((car) => car === 'fusca')
console.log('\n\nSOME: ', hasFusca) // true