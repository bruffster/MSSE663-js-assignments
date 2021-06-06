// #1 Variable swapping
export const fruits = ['apple', 'banana'];

// Currently, I would get the following:
console.log(fruits[0]); // 'apple'
console.log(fruits[1]); // 'banana'

// deconstruct here
export const [a, b] = fruits;

// Assign variables using ES6 so that we get (note, you cannot just make a completely new array):
console.log(a); // 'banana';
console.log(b); // 'apple';

// #2 Variables and Rest
export const food = ['apple', 'banana', 'chocolate', 'pears', 'oats', 'pizza'];


// deconstruct here
export const [,,...others] = food;  // a and b already deconstructed above so they can be skipped

// expected result:
console.log(a); // 'apple'
console.log(b); // 'banana'
console.log(others); // ['chocolate, 'pears', 'oats', 'pizza']

// #3 Array: Contruct a statement
export const [intro, name] = ['hello', 'taylor'];

// construct statement here
export const stmt = `${intro}, ${name}!`;
console.log(stmt);

// expected result: 'hello, taylor!'
