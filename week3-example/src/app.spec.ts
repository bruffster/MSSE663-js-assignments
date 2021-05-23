import 'mocha';
import { expect } from 'chai';
import { Max } from './app';

describe('Tests for app.ts', () => {
  describe('Tests for Max', () => {
    const max = new Max(30, 'Construction', 'Welder')

    it('should output Max\'s name', () => {
      max.name.then((name: string) => {
        expect(name).to.equal('Max');
      });
    });
   
    it('should output Max\'s age', () => {
      expect(max.age).to.equal(30);
    });
  });
});
