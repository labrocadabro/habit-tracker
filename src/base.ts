export const baseHTML = `
<p id="message"></p>
<h1>Habit Tracker</h1>
<form id="new-habit-form">
	<label for="new-havit-name">Habit Name</label>
	<input type="text" id="new-habit-name" class="border border-black" />
	<button id="new-habit" class="border border-black">Add Habit</button>
</form>

<section id="tracker" class="inline-grid grid-cols-2 justify-center items-center gap-2">
	<h2></h2>
	<div id="datesHeader" class="habit">
	</div>
</section>
`
