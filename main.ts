const days = document.querySelectorAll('.day') as NodeListOf<HTMLDivElement>;
const form = document.getElementById('new-habit-form') as HTMLFormElement;
const habitContainer = document.getElementById('tracker') as HTMLDivElement;

const today = "4";

form.addEventListener('submit', addHabit);
habitContainer.addEventListener('click', updateDay)

interface Habit {
	[key: string]: string[];
}
let habits: Habit = JSON.parse(localStorage.getItem('habits') || "{}");
if (Object.keys(habits).length) {
	Object.keys(habits).forEach(key => {
	const habit = document.getElementById(key);
	if (habit) {
		const days = Array.from(habit.children) as HTMLDivElement[];
		days.forEach(day => {
			if (habits[key].includes(day.dataset.day!)) day.classList.add('done');
		})
	}
});
} else {
	habits = {"habit1": [], "habit2": [], "habit3": []}
}


days.forEach(day => {
	const date = day.dataset.day!;
	if (parseInt(date) <= parseInt(today)) {
		day.classList.add("today");
	} else {
		day.style.background = '#ccc';
	}
});


function updateDay(e: Event) {
	const day = e.target as HTMLDivElement;
	const date = day.dataset.day || "";
	if (!day.classList.contains("day")) return;
	const habit: string = day.parentElement!.id;
	const dates = habits[habit];
	console.log(day.parentElement)
	if (dates.includes(date)) {
		const index = dates.indexOf(date);
		dates.splice(index, 1);
	} else {
		dates.push(date);
	}
	localStorage.setItem('habits', JSON.stringify(habits));
	day.classList.toggle('done');
}

function addHabit(e: Event) {
	e.preventDefault();
	const habitName = (document.getElementById('new-habit-name') as HTMLInputElement).value;
	if (habitName.length) {
		const habitId = habitName.toLowerCase().split(" ").join("-");
		const newHabit = `
			<h2>${habitName}</h2>		
			<div class="habit" id="habit-${habitId}">
				<div class="day day1" data-day="1"></div>
				<div class="day day2" data-day="2"></div>
				<div class="day day3" data-day="3"></div>
				<div class="day day4" data-day="4"></div>
				<div class="day day5" data-day="5"></div>
			</div>`;
		habits[`habit-${habitId}`] = [];
		localStorage.setItem('habits', JSON.stringify(habits));
		habitContainer.innerHTML += newHabit;
	}
}