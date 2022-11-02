import { describe, it, expect } from 'vitest';

import { Habit } from "../src/Habit.js";

describe("Habits", () => {
	describe('addDate', () => {
		it('adds a date to an empty array"', () => {
			const habit = new Habit ('Habit');
			habit.addDate('2022-03-19');
			expect(habit.dates).toEqual(['2022-03-19']);
		});
		it('adds a date to a non-empty array"', () => {
			const habit = new Habit ('Habit', ['2022-03-19']);
			habit.addDate('2022-05-31');
			expect(habit.dates).toEqual(['2022-03-19', '2022-05-31']);
		});
		it('does not add duplicate dates"', () => {
			const habit = new Habit ('Habit', ['2022-03-19']);
			habit.addDate('2022-03-19');
			expect(habit.dates).toEqual(['2022-03-19']);
		});
		it('adds dates in sorted order (insert new earliest date)"', () => {
			const habit = new Habit ('Habit', ['2022-03-19']);
			habit.addDate('2021-03-19');
			expect(habit.dates).toEqual(['2021-03-19', '2022-03-19']);
		});
		it('adds dates in sorted order (insert between existing dates)"', () => {
			const habit = new Habit ('Habit', ['2022-03-19', '2022-09-01']);
			habit.addDate('2022-05-31');
			expect(habit.dates).toEqual(['2022-03-19', '2022-05-31', '2022-09-01']);
		});
		it('only adds dates in format YYYY-MM-DD"', () => {
			const habit = new Habit ('Habit');
			expect(() => habit.addDate('5')).toThrow('Invalid date');
			expect(() => habit.addDate('hello')).toThrow('Invalid date');
			expect(() => habit.addDate('2021-54-324')).toThrow('Invalid date');
		});
	});
	describe('removeDate', () => {
		it('removes date from array"', () => {
			const habit = new Habit ('Habit', ['2022-03-19', '2022-05-31']);
			habit.removeDate('2022-05-31');
			expect(habit.dates).toEqual(['2022-03-19']);
		});

		it('ignores dates if they are not in the array"', () => {
			const habit = new Habit ('Habit', ['2022-03-19', '2022-05-31']);
			habit.removeDate('2022-05-31');
			expect(habit.dates).toEqual(['2022-03-19']);
		});
	});
});