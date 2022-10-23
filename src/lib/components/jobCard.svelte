<script lang="ts">
  import Container from "./card/container.svelte";
  import Header from "./card/header.svelte";
  import Title from "./card/title.svelte";
  import Time from "./card/time.svelte";
  import { useQuery } from "@sveltestack/svelte-query";
  import { getStory } from "$lib/api";
  import type { Story } from "$lib/types";

  export let index: number;
  export let id: number;

  let jobsQuery = useQuery<Story>(["jobs", id], () => getStory(id));
</script>

{#if $jobsQuery.isSuccess}
  <Container url={$jobsQuery.data.url}>
    <Header {index} />
    <div>
      <Title title={$jobsQuery.data.title} text={$jobsQuery.data.text} url={$jobsQuery.data.url} />

      <div class="mt-1 flex gap-2 text-xs text-gray-500 dark:text-gray-300 md:text-sm">
        <p>{$jobsQuery.data.score} Points</p>
        <p>•</p>
        <Time time={$jobsQuery.data.time} />
        <p class="hidden md:inline">• By {$jobsQuery.data.by}</p>
      </div>
    </div>
  </Container>
{/if}
