import { expect } from 'chai';
import 'mocha';
import { BELT_COLORS, curriedMath, curriedString, curryMe, doMath, filterArray, gamerStatusTypes, ninjasOne, ninjasTwo, ninjaWithStatus, statusTypes } from './currying';

describe('Currying tests', () => {
  it('#1 should output the same result as the original function', () => {
    const string1 = 'bob';
    const string2 = 'chad';
    const string3 = 'karen';

    expect(curriedString(string1)(string2)(string3)).to.equal(curryMe(string1,string2,string3));
  });

  it('#2 should output the same result as the original function', () => {
    const a = 4;
    const b = 5; 
    const c = 6;

    expect(curriedMath(a)(b)(c)).to.equal(doMath(a)(b)(c));
  });

  it('#3 should return an array containing the ninjas who have a black belt', () => {
    const blackBeltNinjaArray = [
      { name: 'Raphael', belt: 'black' },
      { name: 'Leonardo', belt: 'black' },
      { name: 'Mr. Miyagi', belt: 'black' },
      { name: 'Rocky', belt: 'black' },
      { name: 'The Bride', belt: 'black' },
      { name: 'Cammy', belt: 'black' },
      { name: 'Raphael', belt: 'black' },
      { name: 'Jim', belt: 'black' },
      { name: 'The Rat', belt: 'black' }
    ];

    expect(filterArray(ninjasOne)(ninjasTwo)(BELT_COLORS.BLACK)).to.eql(blackBeltNinjaArray);
  });

  it('#4 should return a new array of ninja objects with "status" added to each object', () => {
    const defaultStatusArray = [
      { name: 'Michelangelo', belt: 'white', status: 'grasshopper' },
      { name: 'Donatello', belt: 'green', status: 'warrior' },
      { name: 'Raphael', belt: 'black', status: 'sensei' },
      { name: 'Leonardo', belt: 'black', status: 'sensei' },
      { name: 'Mr. Miyagi', belt: 'black', status: 'sensei' },
      { name: 'Rocky', belt: 'black', status: 'sensei' },
      { name: 'Colt', belt: 'green', status: 'warrior' },
      { name: 'Tum Tum', belt: 'white', status: 'grasshopper' },
      { name: 'Haru', belt: 'white', status: 'grasshopper' },
      { name: 'The Bride', belt: 'black', status: 'sensei' },
      { name: 'Cammy', belt: 'black', status: 'sensei' },
      { name: 'Wong Fei-hung', belt: 'green', status: 'warrior' },
      { name: 'Michelangelo', belt: 'white', status: 'grasshopper' },
      { name: 'Donatello', belt: 'green', status: 'warrior' },
      { name: 'Raphael', belt: 'black', status: 'sensei' },
      { name: 'Jim', belt: 'black', status: 'sensei' },
      { name: 'The Rat', belt: 'black', status: 'sensei' }
    ];
    const gamerStatusArray = [
      { name: 'Michelangelo', belt: 'white', status: 'Noob' },
      { name: 'Donatello', belt: 'green', status: 'Choob' },
      { name: 'Raphael', belt: 'black', status: 'Legend' },
      { name: 'Leonardo', belt: 'black', status: 'Legend' },
      { name: 'Mr. Miyagi', belt: 'black', status: 'Legend' },
      { name: 'Rocky', belt: 'black', status: 'Legend' },
      { name: 'Colt', belt: 'green', status: 'Choob' },
      { name: 'Tum Tum', belt: 'white', status: 'Noob' },
      { name: 'Haru', belt: 'white', status: 'Noob' },
      { name: 'The Bride', belt: 'black', status: 'Legend' },
      { name: 'Cammy', belt: 'black', status: 'Legend' },
      { name: 'Wong Fei-hung', belt: 'green', status: 'Choob' },
      { name: 'Michelangelo', belt: 'white', status: 'Noob' },
      { name: 'Donatello', belt: 'green', status: 'Choob' },
      { name: 'Raphael', belt: 'black', status: 'Legend' },
      { name: 'Jim', belt: 'black', status: 'Legend' },
      { name: 'The Rat', belt: 'black', status: 'Legend' }
    ];

    expect(ninjaWithStatus(ninjasOne)(ninjasTwo)(statusTypes)).to.eql(defaultStatusArray);
    expect(ninjaWithStatus(ninjasOne)(ninjasTwo)(gamerStatusTypes)).to.eql(gamerStatusArray);
  });
});
