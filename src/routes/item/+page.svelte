<script lang="ts">
  import Comment from "$lib/components/comment.svelte";
  import Loading from "$lib/components/loading.svelte";
  import { getComments, getStory } from "$lib/api";
  import { useQuery } from "@sveltestack/svelte-query";
  import { showReplies } from "$lib/store";
  import type { PageData } from "./$types";
  import dayjs from "dayjs";
  import type { Story } from "$lib/types";

  export let data: PageData = {
    id: ""
  };

  let storyQuery = useQuery<Story>("story", () => getStory(+data.id));
  let commentsQuery = useQuery<Story[]>("comments", () => getComments(+data.id));

  function toggleReplies() {
    $showReplies = !$showReplies;
  }
</script>

<svelte:head>
  {#if $storyQuery.isSuccess}
    <title>Hacker News − {$storyQuery.data.title || data.id}</title>
    <meta property="og:title" content="Hacker News − {$storyQuery.data.title || data.id}" />
    <meta property="og:image" content="/story/og/{data.id}" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="Hacker News − {$storyQuery.data.title || data.id}" />
    <meta property="twitter:image" content="/story/og/{data.id}" />
  {/if}
</svelte:head>

<div class="mx-4 flex flex-col gap-4 py-6">
  {#if $storyQuery.isLoading || $commentsQuery.isLoading}
    <Loading />
  {/if}

  {#if $storyQuery.isSuccess}
    <div class="mx-4 text-gray-800 dark:text-gray-200">
      <div class="items-top flex gap-4">
        {#if $storyQuery.data.title}
          <a href={$storyQuery.data.url || "#"} class="text-xl font-medium md:text-2xl"
            >{$storyQuery.data.title}</a
          >
        {/if}
      </div>

      <div class="text-gray-600 dark:text-gray-400">
        <div class="mt-3 items-center text-sm text-base">
          {#if $storyQuery.data.points}
            <span>{$storyQuery.data.score}</span>
            <span>Points</span>
            <span>•</span>
          {/if}

          <span>By</span>
          <a href="/user?id={$storyQuery.data.by}">{$storyQuery.data.by}</a>
          <span>•</span>

          <span>{dayjs($storyQuery.data.time * 1000).format("DD MMM YYYY")}</span>
          {#if $storyQuery.data.descendants}
            <span>•</span>
            <span>{$storyQuery.data.descendants}</span>
            <span>Comments</span>

            <span>•</span>
            <button on:click={toggleReplies}>
              {$showReplies ? "Hide" : "Expand"} Replies
            </button>
          {/if}
        </div>
      </div>

      {#if $storyQuery.data.text}
        <div class="prose mt-3 max-w-none text-base text-gray-700 dark:text-gray-300 md:text-lg">
          {@html $storyQuery.data.text}
        </div>
      {/if}
    </div>

    {#if $commentsQuery.isLoading}
      <div class="mx-4 font-medium text-gray-800 dark:text-gray-200">Loading...</div>
    {/if}

    {#if $commentsQuery}
      {#if typeof $commentsQuery.data !== "undefined"}
        {#each $commentsQuery.data as comment, index}
          <Comment
            nextCommentId={$commentsQuery.data[index + 1]?.id}
            prevCommentId={$commentsQuery.data[index - 1]?.id}
            {comment}
          />
        {/each}
      {/if}
    {/if}
  {/if}
</div>
