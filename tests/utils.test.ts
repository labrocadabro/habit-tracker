import { describe, it, expect } from 'vitest';
import { Habit } from '../src/habit.js';

import * as utils from "../src/utils.js";

describe('utils', () => {
	describe("buildHabits", () => {
		it('creates habit from localStorage data', () => {
			const storage: Habit[] = JSON.parse("[{\"_id\":\"habit-test\",\"_streak\":0,\"name\":\"test\",\"_dates\":[]}]");
			console.log(storage)
			expect(utils.buildHabits(storage)).toEqual([new Habit(storage[0].name, storage[0].dates)]);
			
		}); 

	}); 
});