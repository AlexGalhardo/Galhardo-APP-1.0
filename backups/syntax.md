```js
// ARRAY FOR EACH
// update original array
numbers = [1, 2, 3, 4, 5]
numbers.forEach((number, index) => numbers[index] = number+1)
console.log(numbers) // 2, 3, 4, 5, 6


// ARRAY MAP
// return a new array
const newArray = numbers.map((number, index) => numbers[index] = number+2)
console.log(newArray) // 3, 4, 5, 6, 7


// ARRAY REDUCE
// reduce return to only a integer, boolean, array, obj, etc
const numbers = [1, 2, 3, 4]
const total = numbers.reduce((total, next) => return total + next)
console.log(total) // 10


// ARRAY FILTER
// return a new array where each loop condition is true
const todos = {
    {text: 'lavar louça', done: false},
    {text: 'lavar roupa', done: true},
    {text: 'fazer janta', done: false},
}
const doneTodos = todos.filter((todo) => todo.done)
console.log(doneTodos) // [{text: 'lavar roupa', done: true}]



// ARRAY FIND
// return only obect
const find = todos.find(function(todo){
    return todo.text === 'fazer janta'
})
console.log(find) // {text: 'fazer janta', done: false}


// ARRAY FIND INDEX
const index = todos.findIndex(function(todo){
    return todo.text === 'lavar louça'
})
console.log(index) // 0


// ARRAY HAS SOME
cars = ['fusca', 'hb20', 'ferrari']
const hasFusca = cars.some((car) => return car === 'fusca')
console.log(hasFusca) // true

```
