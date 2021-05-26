// #1 Array copying
export const numbers = [1, 2, 3, 4, 5];

export const originalNumbers = numbers.map(number => number);
console.log(originalNumbers);

// refactor here
export const numbers2 = [...numbers];
console.log(numbers2.map(num => num));

// #2 Combining arrays
export const winners = ['first'];
export const runnerUps = ['second', 'third', 'fourth', 'fifth'];

// refactor here
export const finishers = [...winners, ...runnerUps];
console.log(finishers);
// #3 Combining objects
export const bob = {
  man: 'Bob'
};

export const kyle = {
  boy: 'Kyle'
};

export const originalPersons = Object.assign(bob, kyle);

// refactor here
export const people = {
  ...bob,
  ...kyle
}

console.log(originalPersons);
console.log(people);


// #4 Modifying values in arrays of objects
export const data = [
  {
    id: 0,
    task: 'Do the thing'
  },
  {
    id: 1,
    task: 'Do the other thing'
  },
  {
    id: 2,
    task: 'Do the last thing'
  }
];
console.log('Data array prior to manipulation:');
console.log(data);
export const update = {
  id: 1,
  task: 'Do the other thing... again'
};

export const originalUpdates = data.map(task => {
  if (task.id === update.id) {
    return Object.assign(task, update);
  }
  return task;
});

// refactor here
const newUpdates = data.map((task): object => {
  if(task.id === update.id) {
    return {...task, ...update};
  }
  return task;
});

console.log('data');
console.log(data);
console.log('Morgan\'s stuff');
console.log(originalUpdates)
console.log('my stuff');
console.log(newUpdates);
console.log('data');
console.log(data);

