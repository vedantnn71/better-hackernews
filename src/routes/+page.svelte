<script lang="ts">
  import StoryCard from "$lib/components/storyCard.svelte";
  import Loading from "$lib/components/loading.svelte";
  import { getStories } from "$lib/api";
  import { useQuery } from "@sveltestack/svelte-query";

  const storiesQuery = useQuery("top-stories", () => getStories());
</script>

<div class="m-4 flex flex-col gap-4">
  {#if $storiesQuery.isLoading}
    <Loading />
  {/if}

  {#if $storiesQuery.isError}
    <div class="mx-4 font-medium text-gray-800 dark:text-gray-200">Error: {$storiesQuery.error}</div>
  {/if}

  {#if $storiesQuery.isSuccess}
    {#each $storiesQuery.data as story, index}
      <StoryCard {story} {index} />
    {/each}
  {/if}
</div>
