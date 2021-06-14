import { expect } from 'chai';
import 'mocha';

import { filterApplied, mappedThings } from './higher-order-funcs';

describe('Higher Order Function tests', () => {
  it("#1 should produce the expected result `[{ id: 1, name: 'thing1' }, { id: 2, name: 'thing2' }]` after hoisting", () => {
    //if it should be thing1 and thing2
    expect(mappedThings).to.eql([{ id: 1, name: 'thing1' }, { id: 2, name: 'thing2' }]);

    //test for if last character is sliced
    //expect(mappedThings).to.eql([{ id: 1, name: 'thing' }, { id: 2, name: 'thing' }]);
  });

  it('#2 should return a single thing from array of things objects after hoisting and currying', () => {
    expect(filterApplied('2')).to.eql({ id: 2, name: 'thing2' });
  });
});
