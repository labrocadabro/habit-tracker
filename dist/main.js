"use strict";
const days = document.querySelectorAll('.day');
const form = document.getElementById('new-habit-form');
const habitContainer = document.getElementById('tracker');
const today = "4";
form.addEventListener('submit', addHabit);
habitContainer.addEventListener('click', updateDay);
let habits = JSON.parse(localStorage.getItem('habits') || "[]");
if (habits.length) {
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
days.forEach(day => {
    const date = day.dataset.day;
    if (parseInt(date) <= parseInt(today)) {
        day.classList.add("today");
    }
    else {
        day.style.background = '#ccc';
    }
});
function updateDay(e) {
    const day = e.target;
    const date = day.dataset.day || "";
    if (!day.classList.contains("day"))
        return;
    const habitId = day.parentElement.id;
    console.log(habits);
    const habit = habits.find(habit => {
        console.log(habit.id, habitId);
        return habit.id === habitId;
    });
    let dates = [];
    if (habit)
        dates = habit.dates;
    console.log(habit);
    console.log(day.parentElement);
    if (dates.includes(date)) {
        const index = dates.indexOf(date);
        dates.splice(index, 1);
    }
    else {
        dates.push(date);
    }
    console.log(dates, habit.dates);
    localStorage.setItem('habits', JSON.stringify(habits));
    day.classList.toggle('done');
}
function addHabit(e) {
    e.preventDefault();
    const habitName = document.getElementById('new-habit-name').value;
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
        habits.push({ name: habitName, id: `habit-${habitId}`, dates: [] });
        localStorage.setItem('habits', JSON.stringify(habits));
        habitContainer.innerHTML += newHabit;
    }
}
