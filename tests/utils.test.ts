import { describe, it, expect } from 'vitest';
import { Habit } from '../src/habit.js';

import * as utils from "../src/utils.js";

describe('utils', () => {
	describe("buildHabits", () => {
		it('create single habit from localStorage data', () => {
			const storage: Habit[] = JSON.parse("[{\"_id\":\"habit-test\",\"_streak\":0,\"name\":\"test\",\"_dates\":[]}]");
			expect(utils.buildHabits(storage)).toEqual([new Habit(storage[0].name, storage[0].dates)]);
		}); 
		it('create multiple habits from localStorage data', () => {
			const storage: Habit[] = JSON.parse("[{\"_id\":\"habit-test\",\"_streak\":0,\"name\":\"test\",\"_dates\":[]},{\"_id\":\"habit-habit\",\"_streak\":0,\"name\":\"Habit\",\"_dates\":[]}]");
			expect(utils.buildHabits(storage)).toEqual([new Habit(storage[0].name, storage[0].dates), new Habit(storage[1].name, storage[1].dates)]);
		}); 
		it('handle empty/missing localStorage data', () => {
			const storage: Habit[] = JSON.parse("[]");
			expect(utils.buildHabits(storage)).toEqual([]);
		}); 

	}); 
});