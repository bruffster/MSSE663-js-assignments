// #1 Array copying
export const numbers = [1, 2, 3, 4, 5];

export const originalNumbers = numbers.map(number => number);
console.log(originalNumbers);

// refactor here
export const numbersCopy = [...numbers];

console.log('Refactor #1:');
console.log(numbersCopy);
console.log('\n\n')



// #2 Combining arrays
export const winners = ['first'];
export const runnerUps = ['second', 'third', 'fourth', 'fifth'];

// refactor here
export const finishers = [...winners, ...runnerUps];

console.log('Refactor #2:')
console.log(finishers);
console.log('\n\n');
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

console.log('Original #3:');
console.log(originalPersons);
console.log('Refactored #3:');
console.log(people);
console.log('\n\n');


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
export const newUpdates = data.map((task): object => {
  if(task.id === update.id) {
    return {...task, ...update};
  }
  return task;
});

console.log('Original #4:');
console.log(originalUpdates);
console.log('Refactored #4');
console.log(newUpdates);


