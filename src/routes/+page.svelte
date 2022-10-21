<script lang="ts">
  import Nav from "$lib/components/nav.svelte";
  import StoryCard from "$lib/components/storyCard.svelte";
  import type { TopPageLoad } from "./types";

  export let data: TopPageLoad;

  let stories = data.stories;
</script>

<Nav />

<div class="m-4 flex flex-col gap-4">
  {#each stories as story, index}
    <StoryCard {story} {index} />
  {/each}
</div>
