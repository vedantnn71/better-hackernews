<script lang="ts">
  import StoryCard from "$lib/components/storyCard.svelte";
  import Loading from "$lib/components/loading.svelte";
  import { onMount } from "svelte";
  import { getStories } from "$lib/api";
  import { useInfiniteQuery } from "@sveltestack/svelte-query";

  let prevId = 0;
  let stories: number[] = [];

  const storiesQuery = useInfiniteQuery(
    "job-stories",
    ({ pageParam = 10 }) => getStories("jobs", pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.length + 10;
      }
    }
  );

  $: if ($storiesQuery.isSuccess) {
    stories = [...stories, ...$storiesQuery.data.pages.flat()];
  }

  onMount(() => {
    document.addEventListener("scroll", () => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        $storiesQuery.fetchNextPage();
      }
    });
  });
</script>

<svelte:head>
  <title>Hacker News − Jobs</title>
  <meta property="og:title" content="Hacker News − Jobs" />
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
      <StoryCard index={prevId + index} id={story} />
    {/each}
  {/if}

  {#if $storiesQuery.isFetchingNextPage}
    <div class="flex justify-center mt-2">
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
