import { expect } from 'chai';
import 'mocha';

import { filterApplied, mappedThings } from './higher-order-funcs';

describe('Higher Order Function tests', () => {
  it("#1 should produce the expected result `[{ id: 1, name: 'thing' }, { id: 2, name: 'thing' }]` after hoisting", () => {
    //commented out for if the thing should have the last character sliced
    //expect(mappedThings).to.eql([{ id: 1, name: 'thing1' }, { id: 2, name: 'thing2' }]);

    //test for if last character is sliced
    expect(mappedThings).to.eql([{ id: 1, name: 'thing' }, { id: 2, name: 'thing' }]);
  });

  it('#2 should return a single thing from array of things objects after hoisting and currying', () => {
    expect(filterApplied('2')).to.eql({ id: 2, name: 'thing' });
  });
});
