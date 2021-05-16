/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-tabs */
/* eslint-disable prefer-const */

// #1 Take an array of numbers and make them strings
// eslint-disable-next-line require-jsdoc
function stringItUp(arr) {
  // your code here
  let numToStr = arr.map((value) => {
    return value.toString();
  });
  return numToStr;
}

console.log(stringItUp([2, 5, 100]));
// output: ["2", "5", "100"]

// #2 Make an array of strings of the names
function namesOnly(arr) {
  // your code here
  let namesOnlyArr = arr.map((value) => {
    return value.name;
  });
  return namesOnlyArr;
}

console.log(
    namesOnly([
      {
        name: 'Angelina Jolie',
        age: 80,
      },
      {
        name: 'Eric Jones',
        age: 2,
      },
      {
        name: 'Paris Hilton',
        age: 5,
      },
      {
        name: 'Kayne West',
        age: 16,
      },
      {
        name: 'Bob Ziroll',
        age: 100,
      },
    ]),
);
// output: ["Angelina Jolie", "Eric Jones", "Paris Hilton", "Kayne West", "Bob Ziroll"]

// #3 Filter the output array from #2.
function oldOnesOnly(arr) {
  // your code here

  // Build new array with filtering data for age >= 65, and then only map the age to the new array
  let oldOnlyArr = arr.filter((old) => old.age >= 65).map((value) => {
    return value.age;
  });
  return oldOnlyArr;
}
console.log(
    oldOnesOnly([
      {
        name: 'Angelina Jolie',
        age: 80,
      },
      {
        name: 'Eric Jones',
        age: 2,
      },
      {
        name: 'Paris Hilton',
        age: 5,
      },
      {
        name: 'Kayne West',
        age: 16,
      },
      {
        name: 'Bob Ziroll',
        age: 100,
      },
    ]),
);
// output: [80, 100]
