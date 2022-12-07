import type { Habit } from "./Habit/Habit";
import * as utils from "./Tracker/Tracker";
import "./style.css";

const app = document.getElementById("app") as HTMLDivElement;
// don't need this anymore
// app.innerHTML = baseHTML;

// const days = document.querySelectorAll('.day') as NodeListOf<HTMLDivElement>;
const form = document.getElementById("new-habit-form") as HTMLFormElement;
const habitContainer = document.getElementById("tracker") as HTMLDivElement;

// const today = new DateWT();

// we have to use the stringified data to rebuild the objects so we get back Habit's methods
const habitData: Habit[] = JSON.parse(localStorage.getItem("habits") || "[]");
let habits: Habit[] = utils.buildHabits(habitData);

window.addEventListener("DOMContentLoaded", () =>
	utils.loadHabits(habits, habitContainer)
);

form.addEventListener("submit", (e: Event) => {
	e.preventDefault();
	const habitName = (
		document.getElementById("new-habit-name") as HTMLInputElement
	).value;
	utils.addHabit(habitName, habits, habitContainer);
});

// function addHabit(e: Event) {
// 	e.preventDefault();
// 	console.log(today)
// }

// habitContainer.addEventListener('click', updateDay)

//
// i

// days.forEach(day => {
// 	const date = day.dataset.day!;
// 	if (parseInt(date) <= parseInt(today)) {
// 		day.classList.add("today");
// 	} else {
// 		day.style.background = '#ccc';
// 	}
// });

// function updateDay(e: Event) {
// 	const day = e.target as HTMLDivElement;
// 	const date = day.dataset.day || "";
// 	if (!day.classList.contains("day")) return;
// 	const habitId: string = day.parentElement!.id;
// 	console.log(habits)
// 	const habit = habits.find(habit =>{
// 		console.log(habit.id, habitId)
// 		return habit.id === habitId
// 	});
// 	let dates: string[] = [];
// 	if (habit) dates = habit.dates;
// 	console.log(habit)
// 	console.log(day.parentElement)
// 	if (dates.includes(date)) {
// 		const index = dates.indexOf(date);
// 		dates.splice(index, 1);
// 	} else {
// 		dates.push(date);
// 	}
// 	console.log(dates, habit!.dates)
// 	localStorage.setItem('habits', JSON.stringify(habits));
// 	day.classList.toggle('done');
// }

// function addHabit(e: Event) {
// 	e.preventDefault();
// 	const habitName = (document.getElementById('new-habit-name') as HTMLInputElement).value;
// 	if (habitName.length) {
// 		const habitId = habitName.toLowerCase().split(" ").join("-");
// 		const newHabit = `
// 			<h2>${habitName}</h2>
// 			<div class="habit" id="habit-${habitId}">
// 				<div class="day day1" data-day="1"></div>
// 				<div class="day day2" data-day="2"></div>
// 				<div class="day day3" data-day="3"></div>
// 				<div class="day day4" data-day="4"></div>
// 				<div class="day day5" data-day="5"></div>
// 			</div>`;
// 		habits.push({name: habitName, id: `habit-${habitId}`, dates: []});
// 		localStorage.setItem('habits', JSON.stringify(habits));
// 		habitContainer.innerHTML += newHabit;
// 	}
// }
