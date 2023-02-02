<script lang="ts">
  import type { Story, StoryKey } from "$lib/types";
  import StoryCard from "$lib/components/storyCard.svelte";
  import JobCard from "$lib/components/jobCard.svelte";
  import Loading from "$lib/components/loading.svelte";
  import { onMount } from "svelte";
  import { getStories } from "$lib/api";
  import { toTitleCase } from "$lib/utils";
  import { useQuery } from "@sveltestack/svelte-query";

  export let key: StoryKey;

  let lastStory: number = 0;

  const storiesQuery = useQuery<Story[]>(
    ["stories", key],
    () => getStories(key),
  );
  
  let stories: Story[] = ($storiesQuery.data ?? []).slice(0, 10);

  onMount(() => {
    window.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        stories = $storiesQuery.data.slice(0, lastStory += 10);
      }
    });
  });

  let title = `Hacker News − ${toTitleCase(key)}`;
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
</svelte:head>

<div class="m-4 flex flex-col gap-4">
  {#if $storiesQuery.isLoading}
    <Loading />
  {/if}

  {#if $storiesQuery.isError}
    <div class="mx-4 font-medium text-gray-800 dark:text-gray-200">
      Error: {$storiesQuery.error}
    </div>
  {/if}

  {#if $storiesQuery.isSuccess}
    {#each stories as story, index}
      {#if key === "jobs"}
        <JobCard index={index} id={story} />
      {:else}
        <StoryCard index={index} id={story} />
      {/if}
    {/each}
  {/if}

  {#if $storiesQuery.isLoading}
    <div class="mt-2 flex justify-center">
      <svg
        class="-ml-1 mr-3 h-5 w-5 animate-spin text-gray-800 dark:text-gray-200"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  {/if}
</div>
