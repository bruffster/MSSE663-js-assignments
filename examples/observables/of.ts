import { of } from 'rxjs';

export const sourceValue = 10;
export const stream = of(sourceValue);

stream.subscribe(val => {
	console.log(val);
});
