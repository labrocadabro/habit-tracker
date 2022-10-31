var days = document.querySelectorAll('.day');
var form = document.getElementById('new-habit-form');
var habitContainer = document.getElementById('tracker');
var today = "4";
form.addEventListener('submit', addHabit);
habitContainer.addEventListener('click', updateDay);
var habits = JSON.parse(localStorage.getItem('habits') || "[]");
if (habits.length) {
    habits.forEach(function (habit) {
        var habitEl = "\n\t\t\t<h2>".concat(habit.name, "</h2>\t\t\n\t\t\t<div class=\"habit\" id=\"habit-").concat(habit.id, "\">\n\t\t\t\t<div class=\"day day1 ").concat(habit.dates.includes("1") ? "done" : "", "\" data-day=\"1\"></div>\n\t\t\t\t<div class=\"day day2 ").concat(habit.dates.includes("2") ? "done" : "", "\" data-day=\"2\"></div>\n\t\t\t\t<div class=\"day day3 ").concat(habit.dates.includes("3") ? "done" : "", "\" data-day=\"3\"></div>\n\t\t\t\t<div class=\"day day4 ").concat(habit.dates.includes("4") ? "done" : "", "\" data-day=\"4\"></div>\n\t\t\t\t<div class=\"day day5 ").concat(habit.dates.includes("5") ? "done" : "", "\" data-day=\"5\"></div>\n\t\t\t</div>");
        habitContainer.innerHTML += habitEl;
    });
}
days.forEach(function (day) {
    var date = day.dataset.day;
    if (parseInt(date) <= parseInt(today)) {
        day.classList.add("today");
    }
    else {
        day.style.background = '#ccc';
    }
});
function updateDay(e) {
    var day = e.target;
    var date = day.dataset.day || "";
    if (!day.classList.contains("day"))
        return;
    var habitId = day.parentElement.id;
    console.log(habits);
    var habit = habits.find(function (habit) {
        console.log(habit.id, habitId);
        return habit.id === habitId;
    });
    var dates = [];
    if (habit)
        dates = habit.dates;
    console.log(habit);
    console.log(day.parentElement);
    if (dates.includes(date)) {
        var index = dates.indexOf(date);
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
    var habitName = document.getElementById('new-habit-name').value;
    if (habitName.length) {
        var habitId = habitName.toLowerCase().split(" ").join("-");
        var newHabit = "\n\t\t\t<h2>".concat(habitName, "</h2>\t\t\n\t\t\t<div class=\"habit\" id=\"habit-").concat(habitId, "\">\n\t\t\t\t<div class=\"day day1\" data-day=\"1\"></div>\n\t\t\t\t<div class=\"day day2\" data-day=\"2\"></div>\n\t\t\t\t<div class=\"day day3\" data-day=\"3\"></div>\n\t\t\t\t<div class=\"day day4\" data-day=\"4\"></div>\n\t\t\t\t<div class=\"day day5\" data-day=\"5\"></div>\n\t\t\t</div>");
        habits.push({ name: habitName, id: "habit-".concat(habitId), dates: [] });
        localStorage.setItem('habits', JSON.stringify(habits));
        habitContainer.innerHTML += newHabit;
    }
}
