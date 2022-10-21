<script lang="ts">
  import Comment from "$lib/components/comment.svelte";
  import { getComments, getStory } from "$lib/api";
  import type { PageData } from "./$types";
  import dayjs from "dayjs";

  export let data: PageData = {
    id: ""
  };

  let story = getStory(+data.id);
  let comments = getComments(+data.id);
</script>

<div class="mx-4 py-6 flex flex-col gap-4">
  {#await story}
    <div class="mx-4 font-medium text-gray-800 dark:text-gray-200">Loading...</div>

  {:then story}
    <div class="mx-4 text-gray-800 dark:text-gray-200">
      <div class="flex gap-4 items-top">
        {#if story.title}
          <a href={story.url || "#"} class="text-xl font-medium md:text-2xl">{story.title}</a>
        {/if}
      </div>

      <div class="text-gray-600 dark:text-gray-400">
        <div class="items-center text-sm mt-3 text-base">
          {#if story.points}
            <span>{story.score}</span>
            <span>Points</span>
            <span>•</span>
          {/if}

          <span>By</span>
          <span>{story.by}</span>
          <span>•</span>

          <span>{dayjs(story.time * 1000).format("DD MMM YYYY")}</span>
          {#if story.descendants}
            <span>•</span>
            <span>{story.descendants}</span>
            <span>Comments</span>
          {/if}
        </div>
      </div>

      {#if story.text}
        <div class="prose max-w-none mt-3 text-base text-gray-700 dark:text-gray-300 md:text-lg">{@html story.text}</div>
      {/if}   
    </div>

  {:catch error}
    <div class="text-red-500">
      {error.message}
    </div>
  {/await}

  {#await comments}
    <div class="mx-4 font-medium text-gray-800 dark:text-gray-200">Loading...</div>
    
    {:then comments}
      {#if typeof comments !== 'undefined'}
        {#each comments as comment, index}
          <Comment 
            nextCommentId={comments[index + 1]?.id}
            prevCommentId={comments[index - 1]?.id}
            {comment}
          />
        {/each}
      {/if}

  {/await}
</div>

