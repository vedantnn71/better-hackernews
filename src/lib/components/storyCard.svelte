<script lang="ts">
  import Container from "./card/container.svelte";
  import Bullet from "./card/bullet.svelte";
  import Header from "./card/header.svelte";
  import Title from "./card/title.svelte";
  import Time from "./card/time.svelte";
  import { useQuery } from "@sveltestack/svelte-query";
  import { getStory } from "$lib/api";
  import type { Story } from "$lib/types";

  export let index: number;
  export let id: number;

  let storyQuery = useQuery<Story>(["story", id], () => getStory(id));
</script>

{#if $storyQuery.isSuccess}
  <Container url={$storyQuery.data.url}>
    <Header {index} />

    <a href={`/item?id=${$storyQuery.data.id}`}>
      <Title
        title={$storyQuery.data.title}
        text={$storyQuery.data.text}
        url={$storyQuery.data.url}
      />

      <div class="mt-1 flex gap-2 text-xs text-gray-500 dark:text-gray-300 md:text-sm">
        {#if $storyQuery.data.score}
          <p>{$storyQuery.data.score} Points</p>
        {/if}

        <Bullet />
        <Time time={$storyQuery.data.time} />

        <Bullet hideOnMobile />
        <p class="hidden md:inline">{$storyQuery.data.descendants || 0} Comments</p>

        <Bullet hideOnMobile />
        <a href="/user?id={$storyQuery.data.by}" class="hidden md:inline">
          By {$storyQuery.data.by}
        </a>
        {#if $storyQuery.data.parent}
          <Bullet hideOnMobile />
          <a href="/item?id={$storyQuery.data.parent}" class="hidden md:inline">Reply to </a>
        {/if}
      </div>
    </a>
  </Container>
{/if}
