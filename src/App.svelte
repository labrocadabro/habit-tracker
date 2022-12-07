<script lang="ts">
  import Message from './components/Message/Message.svelte';
  import Tracker from './components/Tracker/Tracker.svelte';
let message: string;
let habit = "";
$: habitNames = [];
function addHabit() {
  if (habit === "") return false;
  habitNames = [...habitNames, habit];
  habit = "";
  return true;
}
</script>

<main>
  {#if message}<Message>{message}</Message>{/if}
<h1>Habit Tracker</h1>
<form id="new-habit-form" on:submit|preventDefault={addHabit}>
	<label for="new-habit-name">Habit Name</label>
	<input type="text" id="new-habit-name" class="border border-black" bind:value={habit} />
	<button id="new-habit" class="border border-black">Add Habit</button>
</form>

<Tracker {habitNames} />
</main>

<style>

</style>
