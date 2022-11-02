import { Habit } from './habit';

export const buildHabits = (habitData: Habit[]) => {
	let habits: Habit[] = [];
	if (habitData.length) {
		habitData.forEach(data => {
			const habit = new Habit (data.name, data.dates);
			habits.push(habit);
		})
	}
	return habits;
}

export const loadHabits = (habits: Habit[], habitContainer: HTMLDivElement) => {
	if (!habits.length) return;
	habits.forEach(habit => {
		const habitEl = `
			<h2>${habit.name}</h2>		
			<div class="habit" id="habit-${habit.id}">
				<div class="day day1 ${habit.dates.includes("1") ? "done" : ""}" data-day="1"></div>
				<div class="day day2 ${habit.dates.includes("2") ? "done" : ""}" data-day="2"></div>
				<div class="day day3 ${habit.dates.includes("3") ? "done" : ""}" data-day="3"></div>
				<div class="day day4 ${habit.dates.includes("4") ? "done" : ""}" data-day="4"></div>
				<div class="day day5 ${habit.dates.includes("5") ? "done" : ""}" data-day="5"></div>
			</div>`;
		habitContainer.innerHTML += habitEl;
	});
}

export const addHabit = (e: Event, habits: Habit[], habitContainer: HTMLDivElement) => {
	e.preventDefault();
	const habitName = (document.getElementById('new-habit-name') as HTMLInputElement).value;
	const habit = new Habit(habitName);
	if (habitName.length) {
		const newHabit = `
			<h2>${habit.name}</h2>		
			<div class="habit" id="${habit.id}">
				<div class="day day1" data-day="1"></div>
				<div class="day day2" data-day="2"></div>
				<div class="day day3" data-day="3"></div>
				<div class="day day4" data-day="4"></div>
				<div class="day day5" data-day="5"></div>
			</div>`;
		habits.push(habit);
		localStorage.setItem('habits', JSON.stringify(habits));
		habitContainer.innerHTML += newHabit;
	}
}