<script lang="ts">
  import HabitContainer from "../Habit/HabitConatiner.svelte";

export let habitNames: string[];
</script>

<section id="tracker" class="inline-grid grid-cols-2 justify-center items-center gap-2">
	<div id="datesHeader" class="habit"></div>
	{#each habitNames as habit (habit)}
	<HabitContainer {habit} />
	{/each}
</section>
