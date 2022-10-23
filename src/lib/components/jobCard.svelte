<script lang="ts">
  import { toTitleCase, trimUrl } from "$lib/utils";
  import Container from "./card/container.svelte";
  import Header from "./card/header.svelte";
  import { useQuery } from "@sveltestack/svelte-query";
  import { fly } from "svelte/transition";
  import { getStory } from "$lib/api";
  import type { Story } from "$lib/types";
  import dayjs from "dayjs";

  export let index: number;
  export let id: number;

  let jobsQuery = useQuery<Story>(["jobs", id], () => getStory(id));
</script>

{#if $jobsQuery.isSuccess}
  <Container url={$jobsQuery.data.url}>
    <Header {index} />
    <div>
      <h1 class="text-md font-medium text-gray-800 dark:text-gray-200 md:text-lg">
        {$jobsQuery.data.title}

        {#if $jobsQuery.data.url}
          <span class="font-normal text-gray-600 dark:text-gray-400"
            >{trimUrl($jobsQuery.data.url)}</span
          >
        {/if}
      </h1>

      <div class="mt-1 flex gap-2 text-xs text-gray-500 dark:text-gray-300 md:text-sm">
        <p>{$jobsQuery.data.score} Points</p>
        <p>•</p>

        <p>{toTitleCase(dayjs($jobsQuery.data.time * 1000).fromNow(true))} Ago</p>
        <p class="hidden md:inline">•</p>

        <p class="hidden md:inline">By {$jobsQuery.data.by}</p>
      </div>
    </div>
  </Container>
{/if}
