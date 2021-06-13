// #1 Convert this javascript function to a curried function
export function curryMe(string1: string, string2: string, string3: string): string {
  return string1 + ' ' + string2 + ' ' + string3;
}

// source code here
export const curriedStringBuilder = (string1: string) => (string2: string) => (string3: string) =>  (string1 + ' ' + string2 + ' ' + string3);
export const curriedString = (string1: string) => (string2: string) => (string3: string) => curriedStringBuilder(string1)(string2)(string3);
export const curriedStringResult = curriedString('bob')('chad')('karen');
//console.log(curriedStringResult);

// #2 Hoist and convert nested functions to curried functions
export function doMath(a: number) {
  return function add(b: number) {
    return function subtract(c: number) {
      return a + b - c;
    };
  };
}

// source code here
export const curriedMathHoist = (a: number) => (b: number) => (c: number) => (a + b - c);
export const curriedMath = (a: number) => (b: number) => (c: number) => curriedMathHoist(a)(b)(c);
export const curriedMathResult = curriedMath(5)(6)(7);
//console.log(curriedMathResult);


// #3 Write a curried function that returns an array containing the ninjas who have a black belt
export const ninjasOne = [
  { name: 'Michelangelo', belt: 'white' },
  { name: 'Donatello', belt: 'green' },
  { name: 'Raphael', belt: 'black' },
  { name: 'Leonardo', belt: 'black' },
  { name: 'Mr. Miyagi', belt: 'black' },
  { name: 'Rocky', belt: 'black' },
  { name: 'Colt', belt: 'green' },
  { name: 'Tum Tum', belt: 'white' },
  { name: 'Haru', belt: 'white' },
  { name: 'The Bride', belt: 'black' },
  { name: 'Cammy', belt: 'black' },
  { name: 'Wong Fei-hung', belt: 'green' }
];

export const ninjasTwo = [
  { name: 'Michelangelo', belt: 'white' },
  { name: 'Donatello', belt: 'green' },
  { name: 'Raphael', belt: 'black' },
  { name: 'Jim', belt: 'black' },
  { name: 'The Rat', belt: 'black' }
];

// source code here
export interface NinjaInterface {
  name: string;
  belt: string;
}

export enum BELT_COLORS {
  WHITE = 'white',
  GREEN = 'green',
  BLACK = 'black'
}

export const filterArrayHoist = (ninjaArr1: NinjaInterface[]) => (ninjaArr2: NinjaInterface[]) => (filter: BELT_COLORS) => [...ninjaArr1,...ninjaArr2].filter(beltColor => beltColor.belt === filter);
export const filterArray = (ninjaArr1: NinjaInterface[]) => (ninjaArr2: NinjaInterface[]) => (filter: BELT_COLORS) => filterArrayHoist(ninjaArr1)(ninjaArr2)(filter);
export const filterArrayResult = filterArray(ninjasOne)(ninjasTwo)(BELT_COLORS.BLACK);
//console.log(filterArrayResult);

/**
 * #4 Write a curried function that returns a new array of ninja objects with "status" added to each object.
 * The status should be the value of whatever key in the status object matches the ninja's belt.
 *
 * @example { name: 'Colt', belt: 'green', status: 'warrior' }
 */

export const statusTypes: TypeSet = {
  white: 'grasshopper',
  green: 'warrior',
  black: 'sensei'
};

export const gamerStatusTypes: TypeSet = {
  white: 'Noob',
  green: 'Choob',
  black: 'Legend'
};

// source code here
export interface TypeSet {
  white: string;
  green: string;
  black: string;
}

export const ninjaWithStatusHoist = (ninjaArr1: NinjaInterface[]) => (ninjaArr2: NinjaInterface[]) => (typeSet: TypeSet) =>  [...ninjaArr1,...ninjaArr2].map(
  (ninja: NinjaInterface) => {
    if (ninja.belt === 'white') {
      return  {...ninja, status: typeSet['white']};
    }
    if (ninja.belt === 'green') {
      return  {...ninja, status: typeSet['green']};
    }
    if (ninja.belt === 'black') {
      return  {...ninja, status: typeSet['black']};
    }
  }
);

export const ninjaWithStatus = (ninjaArr1: NinjaInterface[]) => (ninjaArr2: NinjaInterface[]) => (typeSet: TypeSet) =>  ninjaWithStatusHoist(ninjaArr1)(ninjaArr2)(typeSet);

export const defaultStatusTypeResult = ninjaWithStatus(ninjasOne)(ninjasTwo)(statusTypes);
export const gamerStatusTypeResult = ninjaWithStatus(ninjasOne)(ninjasTwo)(gamerStatusTypes);

//console.log(defaultStatusTypeResult);
//console.log(gamerStatusTypeResult);
