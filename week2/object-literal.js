/**
 * #1 Create an object literal named `monkey`
 * #2 Give it 3 unique properties
 * #3 Give it at least 2 behaviours/methods of your choice
 * #4 Calls the object's method(s) and output a result of your choice to the console.
 * #5 Convert the object literal to an Class
 * #6 Then call its method and output to the console.
 */

let monkey =  {
  species: 'capuchin',
  color: 'brown',
  diet: ['fruit','insects','leaves', 'small birds'],
  displayDiet: function () {
    str = `The ${this.color} ${this.species} eats `;
    var i = 0;
    for (let food of this.diet) {
      if (i === this.diet.length - 1) {
        str += 'and ' + food + '.';
      } else {
        str += food + ', ';
      }
      i++;
    }
    return str;
  },
  addToDiet: function (food) {
    this.diet.push(food);
  },
}

monkey.addToDiet('apples');
monkey.addToDiet('lizards');
console.log(monkey.displayDiet());

/*
function Monkey(species, color, diet) {
  this.species = species;
  this.color = color;
  this.diet = diet; 
}

Monkey.prototype.displayDiet = function () {

}*/

class Monkey {
  constructor(species, color, diet) {
    this.species = species;
    this.color = color;
    this.diet = diet;
  }

  displayDiet() {
    str = `The ${this.color} ${this.species} eats `;
    var i = 0;
    for (let food of this.diet) {
      if (i === this.diet.length - 1) {
        str += 'and ' + food + '.';
      } else {
        str += food + ', ';
      }
      i++;
    }
    return str;
  }
}

let monk = new Monkey('capuchin', 'brown', ['fruit', 'insects', 'leaves', 'small birds']);

console.log(monk.displayDiet());