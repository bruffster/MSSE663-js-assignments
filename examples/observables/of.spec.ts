import { stream, sourceValue } from './of';
import { expect } from 'chai';
import 'mocha';

describe('Observable tests', () => {
	it('should ouput source stream value of `10`', () => {
		stream.subscribe(val => {
			expect(val).to.equal(sourceValue);
		});
	});
});
