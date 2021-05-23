// Source code here
import { of } from 'rxjs';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

export function obsArray(arr: number[]): Observable<number[]>{
  let obsArray$ = of(arr);

  return obsArray$;
}

export function manipulateArray(arr: number[], factor: number): Observable<number[]>{
  let mappedArr$ = obsArray(arr)
  .pipe(map((num: number[]) => num.map(data => data * factor)));

  return mappedArr$;
}

export function subscribeOutputArray(arr: number[], factor: number) {
  manipulateArray(arr, factor).subscribe(val => console.log(val));
}


let arr: number[] = [1, 2, 3, 4, 5];
subscribeOutputArray(arr, 23);
