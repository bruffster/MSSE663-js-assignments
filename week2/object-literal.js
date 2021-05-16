/* eslint-disable require-jsdoc */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/**
 * #1 Create an object literal named `monkey`
 * #2 Give it 3 unique properties
 * #3 Give it at least 2 behaviours/methods of your choice
 * #4 Calls the object's method(s) and output a result of your choice to the console.
 * #5 Convert the object literal to an Class
 * #6 Then call its method and output to the console.
 */

let monkey = {
  species: 'capuchin',
  color: 'dark brown',
  diet: ['fruit', 'insects'],
  displayDiet: function() {
    str = `The ${this.color} ${this.species} eats `;
    let i = 0;
    for (let food of this.diet) {
      if (this.diet.length === 1) {
        str += food + '.';
      } else {
        if (i === this.diet.length - 1) {
          str += 'and ' + food + '.';
        } else {
          str += food + ', ';
        }
        i++;
      }
    }
    return str;
  },
  addToDiet: function(food) {
    for (let item of food) {
      this.diet.push(item);
    }
    console.log(`Adding the following items to the ${this.species}'s diet: ${food}`);
  },
};

// Output and use for Object Literal
console.log('\nOutput from Object Literal:\n');
console.log(monkey.displayDiet());
monkey.addToDiet(['leaves', 'small birds']);
console.log(monkey.displayDiet());


// Class Version 1

function Monkey1(species, color, diet) {
  this.species = species;
  this.color = color;
  this.diet = diet;
}

Monkey1.prototype.displayDiet = function() {
  str = `The ${this.color} ${this.species} eats `;
  let i = 0;
  for (let food of this.diet) {
    if (this.diet.length === 1) {
      str += food + '.';
    } else {
      if (i === this.diet.length - 1) {
        str += 'and ' + food + '.';
      } else {
        str += food + ', ';
      }
      i++;
    }
  }
  return str;
};

Monkey1.prototype.addToDiet = function(food) {
  for (let item of food) {
    this.diet.push(item);
  }
  console.log(`Adding the following items to the ${this.species}'s diet: ${food}`);
};

// Output and use for Class Version 1
let monkeyOne = new Monkey1('Pygmy Marmoset', 'orange-brown', ['sap', 'gum']);

console.log('\n\nOutput from Class 1\n');
console.log(monkeyOne.displayDiet());
monkeyOne.addToDiet(['plants', 'fruit', 'insects']);
console.log(monkeyOne.displayDiet());


// Class Version 2
class Monkey {
  constructor(species, color, diet) {
    this.species = species;
    this.color = color;
    this.diet = diet;
  }

  // Methods
  displayDiet() {
    str = `The ${this.color} ${this.species} eats `;
    let i = 0;
    for (let food of this.diet) {
      if (this.diet.length === 1) {
        str += food + '.';
      } else {
        if (i === this.diet.length - 1) {
          str += 'and ' + food + '.';
        } else {
          str += food + ', ';
        }
        i++;
      }
    }
    return str;
  }

  addToDiet(food) {
    for (let item of food) {
      this.diet.push(item);
    }
    console.log(`Adding the following items to the ${this.species}'s diet: ${food}`);
  }
}

let monkeyTwo = new Monkey('Spider Monkey', 'brown', ['fruit']);

console.log('\n\nOutput from Class 2\n');
console.log(monkeyTwo.displayDiet());
monkeyTwo.addToDiet(['sap', 'bark']);
console.log(monkeyTwo.displayDiet());
