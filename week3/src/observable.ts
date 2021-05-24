// Source code here
import { of } from 'rxjs';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

// #1 - Create an observable stream of an array (utilizing the `of` keyword).
export function obsArray(arr: number[]): Observable<number[]>{
  let obsArray$ = of(arr);

  return obsArray$;
}

// #2 - Map over the values in the array.
export function manipulateArray(arr: number[], factor: number): Observable<number[]>{
  let mappedArr$ = obsArray(arr)
  .pipe(map((num: number[]) => num.map(data => data * factor)));

  return mappedArr$;
}

// #3 - Subscribe and ouput values to the concole.
export function subscribeOutputArray(arr: number[], factor: number) {
  manipulateArray(arr, factor).subscribe(val => console.log(val));
}

// executing all 3 above
let arr: number[] = [1, 2, 3, 4, 5];
subscribeOutputArray(arr, 23);
