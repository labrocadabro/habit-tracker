const { Habit } = require("../dist/habit.js");
const diff = require('jest-diff');

describe("Habits", () => {
	test('addDate should add date to array"', () => {
		const habit = new Habit ('Habit', 'habit');
		habit.addDate('2022-03-19');
		expect(habit.dates).toEqual(['2022-03-19']);
	});

	test('addDate should not add duplicate dates"', () => {
		const habit = new Habit ('Habit', 'habit', ['2022-03-19']);
		habit.addDate('2022-03-19');
		expect(habit.dates).toEqual(['2022-03-19']);
	});

	test('addDate should add dates to non-empty array"', () => {
		const habit = new Habit ('Habit', 'habit', ['2022-03-19']);
		habit.addDate('2022-05-31');
		expect(habit.dates).toEqual(['2022-03-19', '2022-05-31']);
	});

	test('removeDate should remove date from array"', () => {
		const habit = new Habit ('Habit', 'habit', ['2022-03-19', '2022-05-31']);
		habit.removeDate('2022-05-31');
		expect(habit.dates).toEqual(['2022-03-19']);
	});

	test('removeDate should ignore dates if they are not in the array"', () => {
		const habit = new Habit ('Habit', 'habit', ['2022-03-19', '2022-05-31']);
		habit.removeDate('2022-05-31');
		expect(habit.dates).toEqual(['2022-03-19']);
	});

	test('addDate should add dates in sorted order (insert new earliest date)"', () => {
		const habit = new Habit ('Habit', 'habit', ['2022-03-19']);
		habit.addDate('2021-03-19');
		expect(habit.dates).toEqual(['2021-03-19', '2022-03-19']);
	});

	test('addDate should add dates in sorted order (insert between existing dates)"', () => {
		const habit = new Habit ('Habit', 'habit', ['2022-03-19', '2022-09-01']);
		habit.addDate('2022-05-31');
		expect(habit.dates).toEqual(['2022-03-19', '2022-05-31', '2022-09-01']);
	});

	test('dates must be in format YYYY-MM-DD"', () => {
		const habit = new Habit ('Habit', 'habit');
		expect(() => habit.addDate('5')).toThrow('Invalid date');
		expect(() => habit.addDate('hello')).toThrow('Invalid date');
		expect(() => habit.addDate('2021-54-324')).toThrow('Invalid date');
	});
});