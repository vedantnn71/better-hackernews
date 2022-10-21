<script lang="ts">
  import StoryCard from "$lib/components/storyCard.svelte";
  import { getTopStories } from "$lib/api";

  let stories = getTopStories();
</script>

<div class="m-4 flex flex-col gap-4">
  {#await stories}
    <div class="mx-4 font-medium text-gray-800 dark:text-gray-200">Loading...</div>

  {:then stories}
    {#each stories as story, index}
      <StoryCard {story} {index} />
    {/each}

  {:catch error}
    <div class="text-red-500">
      {error.message}
    </div>
  {/await}
</div>
