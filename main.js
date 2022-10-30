var days = document.querySelectorAll('.day');
var today = "4";
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
        day.addEventListener('click', completeDay);
    }
    else {
        day.style.background = '#ccc';
    }
});
function completeDay() {
    var habit = this.parentNode.id;
    var dates = habits[habit];
    if (dates.includes(this.dataset.day)) {
        var index = dates.indexOf(this.dataset.day);
        dates.splice(index, 1);
    }
    else {
        dates.push(this.dataset.day);
    }
    localStorage.setItem('habits', JSON.stringify(habits));
    this.classList.toggle('done');
}
