import { expect } from 'chai';
import 'mocha';
import { manipulateArray, obsArray } from './observable'



describe('Tests for observable.ts', () => {
    it('should equal the contents of the array', () => { 
      const arr = [1, 2, 3, 4, 5];    
      const arr$ = obsArray(arr);
      let index = 0;
      arr$.subscribe((num: number[]) => {
        expect(num[index]).to.equal(arr[index]);
        index++;
      });
    });

    
    it('should equal the contents of the mapped array [5,10,15,20,25]', () => {
      const arrInit = [1,2,3,4,5];
      const arrFinal = [5,10,15,20,25];
      const arrMap$ = manipulateArray(arrInit, 5);
      let index = 0;
      arrMap$.subscribe(val => {
        expect(val[index]).to.equal(arrFinal[index]);
        index++;
      });
    });

    it('should equal the contents of the mapped array [23,46,69,92,115]', () => {
      const arrInit = [1,2,3,4,5];
      const arrFinal = [23,46,69,92,115];
      const arrMap$ = manipulateArray(arrInit, 23);
      let index = 0;
      arrMap$.subscribe(val => {
        expect(val[index]).to.equal(arrFinal[index]);
        index++;
      });
    });
});