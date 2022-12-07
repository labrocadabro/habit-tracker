import { Habit } from "../Habit/Habit";

export const buildHabits = (habitData: Habit[]) => {
	let habits: Habit[] = [];
	if (habitData.length) {
		habitData.forEach((data) => {
			const habit = new Habit(data.name, data.dates);
			habits.push(habit);
		});
	}
	return habits;
};

export const loadHabits = (habits: Habit[], habitContainer: HTMLDivElement) => {
	if (!habits.length) return;
	habits.forEach((habit) => {
		const habitEl = `
			<h2>${habit.name}</h2>
			<div class="habit" id="habit-${habit.id}">
			</div>`;
		habitContainer.innerHTML += habitEl;
	});
};

export const getDates = () => {
	// This needs to be changed
	const today = new Date();
	const dates = [];
	for (let i = 0; i < 10; i++) {}
};

export const addHabit = (
	habitName: string,
	habits: Habit[],
	habitContainer: HTMLDivElement
) => {
	const habit = new Habit(habitName);
	if (habits.find((h) => h.isDuplicate(habitName))) {
		// TODO: add error message to DOM
		document.getElementById("message")!.innerText =
			"This habit already exists.";
		return;
	}
	if (habitName.length) {
		const newHabit = `
			<h2>${habit.name}</h2>
			<div class="habit" id="${habit.id}">
			</div>`;
		habits.push(habit);
		localStorage.setItem("habits", JSON.stringify(habits));
		habitContainer.innerHTML += newHabit;
	}
};
