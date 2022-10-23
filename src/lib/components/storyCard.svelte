<script lang="ts">
  import { toTitleCase, trimUrl } from "$lib/utils";
  import Container from "./card/container.svelte";
  import Header from "./card/header.svelte";
  import { useQuery } from "@sveltestack/svelte-query";
  import { getStory } from "$lib/api";
  import type { Story } from "$lib/types";
  import dayjs from "dayjs";

  export let index: number;
  export let id: number;

  let storyQuery = useQuery<Story>(["story", id], () => getStory(id));
</script>

{#if $storyQuery.isSuccess}
  <Container url={$storyQuery.data.url}>
    <Header {index} />

    <a href={`/story/${$storyQuery.data.id}`}>
      <h1 class="text-md break-all font-medium text-gray-800 dark:text-gray-200 md:text-lg">
        {#if $storyQuery.data.title}
          {toTitleCase($storyQuery.data.title)}
        {:else}
          {@html $storyQuery.data.text || "[dead]"}
        {/if}

        {#if $storyQuery.data.url}
          <span class="font-normal text-gray-600 dark:text-gray-400"
            >{trimUrl($storyQuery.data.url)}</span
          >
        {/if}
      </h1>

      <div class="mt-1 flex gap-2 text-xs text-gray-500 dark:text-gray-300 md:text-sm">
        {#if $storyQuery.data.score}
          <p>{$storyQuery.data.score} Points</p>
          <p>•</p>
        {/if}

        <p>{toTitleCase(dayjs($storyQuery.data.time * 1000).fromNow(true))} Ago</p>
        <p class="hidden md:inline">•</p>

        <p class="hidden md:inline">{$storyQuery.data.descendants || 0} Comments</p>
        <p class="hidden md:inline">•</p>

        <a href="/{$storyQuery.data.by}" class="hidden md:inline">
          By {$storyQuery.data.by}
        </a>
        {#if $storyQuery.data.parent}
          <p class="hidden md:inline">•</p>
          <a href="/story/{$storyQuery.data.parent}" class="hidden md:inline"> Reply to </a>
        {/if}
      </div>
    </a>
  </Container>
{/if}
