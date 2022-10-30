const days = document.querySelectorAll('.day') as NodeListOf<HTMLDivElement>;
const today = "4";
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
		day.addEventListener('click', completeDay);
	} else {
		day.style.background = '#ccc';
	}
});


function completeDay() {
	const habit: string = this.parentNode.id;
	const dates = habits[habit];
	if (dates.includes(this.dataset.day)) {
		const index = dates.indexOf(this.dataset.day);
		dates.splice(index, 1);
	} else {
		dates.push(this.dataset.day);
	}
	localStorage.setItem('habits', JSON.stringify(habits));
	this.classList.toggle('done');
}