<script lang="ts">
  import type { Story } from "$lib/types";
  import type { PageData } from "./$types";
  import StoryCard from "$lib/components/storyCard.svelte";

  import { onMount } from "svelte";
  import { getStories } from "$lib/api";
  import { toTitleCase } from "$lib/utils";

  export let data: PageData;
  let lastStory: number = 10;

  onMount(() => {
    window.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        lastStory += 5;
      }
    });
  });

  $: stories = data.stories.slice(0, lastStory) as Story[];

  let title = "Hacker News − Show";
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
</svelte:head>

<div class="m-4 flex flex-col gap-4">
  {#each stories as story, index}
    <StoryCard {index} id={story} />
  {/each}
</div>
