const days = document.querySelectorAll('.day') as NodeListOf<HTMLDivElement>;
const today = "2";
days.forEach(day => {
	if (day.dataset.day === today) {
		day.classList.add("today");
		day.addEventListener('click', completeDay);
	} else {
		day.style.background = '#ccc';
	}
});


function completeDay() {
	if (this.dataset.day === today) {
		this.classList.toggle('done');
	}	
}