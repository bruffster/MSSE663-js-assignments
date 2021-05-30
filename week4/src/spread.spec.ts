import { expect } from 'chai';
import 'mocha';
import { numbers, numbersCopy } from './spread' //copying
import { winners, runnerUps, finishers } from './spread' //combine
import { originalPersons, people } from './spread'
import { originalUpdates, newUpdates } from './spread'


describe('Tests for spread.ts', () => {
  describe('Test for copying an array', () => {
    it('should equal the contents of the array that was copied', () => { 
      expect(numbersCopy).to.eql(numbers);
    });
  });

  describe('Tests for combining arrays', () => {
    const combinedManual = ['first', 'second', 'third', 'fourth', 'fifth'];
    it('should equal the contents of an array that includes both arrays', () => {
      expect(finishers).to.eql(combinedManual);
    });

    const concatArr = winners.concat(runnerUps);
    it('should equal the contents of a concatenated array', () => {
      expect(finishers).to.eql(concatArr);
    });
  });

  describe('Tests for combining objects', () => {
    it('should match the same outcome as when using assign', () => {
      expect(people).to.eql(originalPersons);
    });

    it('should have the property man', () => {
      expect(people).to.have.property('man');
    });

    it('should have property boy', () => {
      expect(people).to.have.property('boy');
    });
  });

  describe('Tests for modifying values in an array of objects', () => {
    it('should match the same outcome as when using assign', () => {
      expect(originalUpdates).to.eql(newUpdates);
    });
  });

});