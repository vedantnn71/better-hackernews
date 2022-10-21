<script lang="ts">
  import JobCard from "$lib/components/jobCard.svelte";
  import Loading from "$lib/components/loading.svelte";
  import { getStories } from "$lib/api";
  import { useQuery } from "@sveltestack/svelte-query";

  const jobsQuery = useQuery("jobs", () => getStories("jobs"));
</script>

<div class="m-4 flex flex-col gap-4">
  {#if $jobsQuery.isLoading}
    <Loading />
  {/if}

  {#if $jobsQuery.isError}
    <div class="mx-4 font-medium text-gray-800 dark:text-gray-200">Error: {$jobsQuery.error}</div>
  {/if}

  {#if $jobsQuery.isSuccess}
    {#each $jobsQuery.data as story, index}
      <JobCard {story} {index} />
    {/each}
  {/if}
</div>

