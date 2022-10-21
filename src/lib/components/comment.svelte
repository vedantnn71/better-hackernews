<script lang="ts">
  import Reply from "./reply.svelte";
  import type { Story } from "$lib/types";
  import dayjs from "dayjs";

  export let comment: Story;
  export let nextCommentId: number | undefined;
  export let prevCommentId: number | undefined;

  let showReplies = false;
  let href = `https://news.ycombinator.com/item?id=${comment.id}`;

  function toggleReplies() {
    showReplies = !showReplies;
  }
</script>

<div>
  <div
    class="flex items-start gap-4 border border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 rounded-2xl mx-4 py-3 px-5"
    id={comment.id.toString()}
  >
    <a
      {href}
      rel="noopener noreferrer"
      target="_blank"
      class="mt-2 gap-2 flex font-medium text-gray-800 dark:text-gray-300 items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="10"
        viewBox="0 0 14 10"
        fill="none"
        class="scale-[110%]"
      >
        <path d="M7 9H1L7 1L13 9H7Z" fill="#F97316" />
        <path
          d="M1 9L0.6 8.7C0.486368 8.85151 0.46809 9.05421 0.552786 9.22361C0.637482 9.393 0.810614 9.5 1 9.5V9ZM13 9V9.5C13.1894 9.5 13.3625 9.393 13.4472 9.22361C13.5319 9.05421 13.5136 8.85151 13.4 8.7L13 9ZM7 1L7.4 0.7C7.30557 0.574097 7.15738 0.5 7 0.5C6.84262 0.5 6.69443 0.574097 6.6 0.7L7 1ZM1 9.5H7V8.5H1V9.5ZM7 9.5H13V8.5H7V9.5ZM7.5 9V1H6.5V9H7.5ZM6.6 0.7L0.6 8.7L1.4 9.3L7.4 1.3L6.6 0.7ZM13.4 8.7L7.4 0.7L6.6 1.3L12.6 9.3L13.4 8.7Z"
          fill="#F97316"
        />
      </svg>
    </a>

    <div class="w-full">
      <div
        class="flex flex-col md:flex-row gap-2 text-xs text-gray-600 dark:text-gray-400 mt-1 md:text-sm mb-2"
      >
        <p>{comment.by} on {dayjs(comment.time * 1000).format("DD MMM YYYY")}</p>

        {#if nextCommentId}
          <p class="hidden md:inline-block">•</p>
          <a
            class="hidden md:inline-block text-gray-600 dark:text-gray-400"
            href={`#${nextCommentId}`}>next</a
          >
        {/if}

        {#if prevCommentId}
          <p class="hidden md:inline-block hidden md:inline-block">•</p>
          <a
            class="text-gray-600 dark:text-gray-400 hidden md:inline-block"
            href={`#${prevCommentId}`}>prev</a
          >
        {/if}

        {#if comment.kids}
          <p class="hidden md:inline-block">•</p>
          <button class="mb-auto max-w-fit" on:click={toggleReplies}>
            {showReplies ? "hide" : "show"}
            {comment.kids.length} replies
          </button>
        {/if}
      </div>

      <div
        class="prose prose-gray max-w-none prose-a:no-underline prose-a:break-all prose-a:text-orange-600 text-base text-gray-700 dark:text-gray-300 gap-4"
      >
        {#if comment.text}
          {@html comment.text}
        {:else}
          <p>[dead]</p>
        {/if}
      </div>
    </div>
  </div>

  {#if comment.kids && showReplies}
    <div class="flex flex-col ml-4">
      {#each comment.kids as replyId}
        <Reply {replyId} />
      {/each}
    </div>
  {/if}
</div>
