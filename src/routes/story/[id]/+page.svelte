<script lang="ts">
  import Comment from "$lib/components/comment.svelte";
  import { getComments, getStory } from "$lib/api";
  import { useQuery } from "@sveltestack/svelte-query";
  import type { PageData } from "./$types";
  import dayjs from "dayjs";
  import type { Story } from "$lib/types";

  export let data: PageData = {
    id: ""
  };

  let storyQuery = useQuery<Story>("story", () => getStory(+data.id));
  let commentsQuery = useQuery<Story[]>("comments", () => getComments(+data.id));
</script>

<div class="mx-4 py-6 flex flex-col gap-4">
  {#if $storyQuery.isLoading}
    <div class="mx-4 font-medium text-gray-800 dark:text-gray-200">Loading...</div>
  {/if}

  {#if $storyQuery.data}
    <div class="mx-4 text-gray-800 dark:text-gray-200">
      <div class="flex gap-4 items-top">
        {#if $storyQuery.data.title}
          <a href={$storyQuery.data.url || "#"} class="text-xl font-medium md:text-2xl"
            >{$storyQuery.data.title}</a
          >
        {/if}
      </div>

      <div class="text-gray-600 dark:text-gray-400">
        <div class="items-center text-sm mt-3 text-base">
          {#if $storyQuery.data.points}
            <span>{$storyQuery.data.score}</span>
            <span>Points</span>
            <span>•</span>
          {/if}

          <span>By</span>
          <span>{$storyQuery.data.by}</span>
          <span>•</span>

          <span>{dayjs($storyQuery.data.time * 1000).format("DD MMM YYYY")}</span>
          {#if $storyQuery.data.descendants}
            <span>•</span>
            <span>{$storyQuery.data.descendants}</span>
            <span>Comments</span>
          {/if}
        </div>
      </div>

      {#if $storyQuery.data.text}
        <div class="prose max-w-none mt-3 text-base text-gray-700 dark:text-gray-300 md:text-lg">
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
