import { describe, it, expect, vi } from 'vitest';
import { JSDOM } from 'jsdom';

import { Habit } from '../src/habit.js';
import { baseHTML } from '../src/base.js';
import { localStorageMock } from "./localstorage.js";
import * as utils from "../src/utils.js";


const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.window = window;
global.document = window.document;
Object.defineProperty(global, 'localStorage', {value: localStorageMock});


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
	describe("addHabit", () => {
		it('add a new habit to the DOM', () => {
			document.querySelector('body')!.innerHTML = baseHTML; 
			const habitContainer = document.getElementById('tracker') as HTMLDivElement;
			const habitName = "Test Habit";
			const habits: Habit[] = [];
			utils.addHabit(habitName, habits, habitContainer);

			expect(habits).toEqual([new Habit(habitName)]);
			expect(habitContainer).toContain(document.getElementById(`${habits[0].id}`));
			const newHabit: Habit = JSON.parse(localStorage.getItem('habits') || "")[0];
			expect(newHabit.name).toBe("Test Habit");
			localStorage.clear();
		});
		it('add a new habit when some already exist', () => {
			document.querySelector('body')!.innerHTML = baseHTML;
			const habitContainer = document.getElementById('tracker') as HTMLDivElement;
			const habitName = "Test Habit";
			const habits: Habit[] = [new Habit('First Habit')];
			utils.addHabit(habitName, habits, habitContainer);

			expect(habits).toEqual([new Habit("First Habit"), new Habit(habitName)]);
			expect(habitContainer).toContain(document.getElementById(`${habits[1].id}`));
			const newHabit: Habit = JSON.parse(localStorage.getItem('habits') || "")[1];
			expect(newHabit.name).toBe("Test Habit");
			localStorage.clear();
		});
		it('do not add a duplicate habit', () => {
			document.querySelector('body')!.innerHTML = baseHTML;
			const habitContainer = document.getElementById('tracker') as HTMLDivElement;
			const habitName = "Test Habit";
			const habits: Habit[] = [new Habit(habitName)];
			utils.addHabit(habitName, habits, habitContainer);
			expect(habits).toEqual([new Habit(habitName)]);
			expect(document.getElementById("message")!.innerText).toBe("This habit already exists.");
		});
	});
});

