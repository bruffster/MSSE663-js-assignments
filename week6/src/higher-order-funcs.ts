/**
 * #1 Higher order things.
 *
 * - Map the values to produce the result:
 *
 * [{ id: 1, name: 'thing' }, { id: 2, name: 'thing' }]
 *
 * - Then Hoist the callback function.
 *
 */
const things = ['thing1', 'thing2'];

// create callback here

// callback for if thing should actually be 'thing1' and 'thing2' in the pseduo code
//export const callback = (thing: string, id: number) => ({id: Number(thing.slice(-1).valueOf()), name: thing});

// callback for if thing should be 'thing' and 'thing' in the mapped result, .slice(0,-1) removes the last character from the string, .slice(-1) gets last character which is used as the id
export const callback = (thing: string) => ({id: Number(thing.slice(-1)), name: thing.slice(0,-1)});

// create map here
export const mappedThings = things.map(callback);
//console.log(mappedThings);

/**
 * #2 Higher order then curry.
 *
 * - Write a function that accepts a key as a string.
 * - Filter the results from #1 to return a single `thing` object.
 * - Hoist that filter callback and curry all functions.
 */

// create function here

export interface ThingInterface {
  id: number;
  name: string;
}

export const filterCallback = (key: string) => (thingToSearch: ThingInterface) => (thingToSearch.id === Number(key) || thingToSearch.name === key);

export const baseFilter = (key: string) => filterCallback(key);

export const filterApplied = (key: string) => mappedThings.filter(baseFilter(key))[0];

export const searchedThing = filterApplied('2');

//console.log(searchedThing);