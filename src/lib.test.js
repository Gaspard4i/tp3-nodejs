import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { sayOK } from './lib.js';

describe('sayOK', () => {
	it('should return OK', () => {
		assert.strictEqual(sayOK(), 'OK');
	});
});
