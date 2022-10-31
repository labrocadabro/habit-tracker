var days = document.querySelectorAll('.day');
var form = document.getElementById('new-habit-form');
var habitContainer = document.getElementById('tracker');
var today = "4";
form.addEventListener('submit', addHabit);
habitContainer.addEventListener('click', updateDay);
var habits = JSON.parse(localStorage.getItem('habits') || "{}");
if (Object.keys(habits).length) {
    Object.keys(habits).forEach(function (key) {
        var habit = document.getElementById(key);
        if (habit) {
            var days_1 = Array.from(habit.children);
            days_1.forEach(function (day) {
                if (habits[key].includes(day.dataset.day))
                    day.classList.add('done');
            });
        }
    });
}
else {
    habits = { "habit1": [], "habit2": [], "habit3": [] };
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
    var habit = day.parentElement.id;
    var dates = habits[habit];
    console.log(day.parentElement);
    if (dates.includes(date)) {
        var index = dates.indexOf(date);
        dates.splice(index, 1);
    }
    else {
        dates.push(date);
    }
    localStorage.setItem('habits', JSON.stringify(habits));
    day.classList.toggle('done');
}
function addHabit(e) {
    e.preventDefault();
    var habitName = document.getElementById('new-habit-name').value;
    if (habitName.length) {
        var habitId = habitName.toLowerCase().split(" ").join("-");
        var newHabit = "\n\t\t\t<h2>".concat(habitName, "</h2>\t\t\n\t\t\t<div class=\"habit\" id=\"habit-").concat(habitId, "\">\n\t\t\t\t<div class=\"day day1\" data-day=\"1\"></div>\n\t\t\t\t<div class=\"day day2\" data-day=\"2\"></div>\n\t\t\t\t<div class=\"day day3\" data-day=\"3\"></div>\n\t\t\t\t<div class=\"day day4\" data-day=\"4\"></div>\n\t\t\t\t<div class=\"day day5\" data-day=\"5\"></div>\n\t\t\t</div>");
        habits["habit-".concat(habitId)] = [];
        localStorage.setItem('habits', JSON.stringify(habits));
        habitContainer.innerHTML += newHabit;
    }
}
