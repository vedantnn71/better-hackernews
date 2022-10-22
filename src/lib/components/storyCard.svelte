<script lang="ts">
  import { toTitleCase, trimUrl } from "$lib/utils";
  import type { Story } from "$lib/types";
  import dayjs from "dayjs";
    import { useQuery } from "@sveltestack/svelte-query";
    import { getStory } from "$lib/api";

  export let index: number;
  export let id: number;

  let storyQuery = useQuery<Story>(["story", id], () => getStory(id));
  let story = $storyQuery.data;
</script>


{#if $storyQuery.isSuccess}
  <a
    href={$storyQuery.data.url}
    rel="noopener noreferrer"
    target="_blank"
    class="p-5 flex items-start gap-4 border border-gray-300 dark:border-gray-800 rounded-2xl"
  >
    <div class="mt-px gap-2 flex font-medium text-gray-800 dark:text-gray-300 items-center">
      <h3>
        {index + 1}
      </h3>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="10"
        viewBox="0 0 14 10"
        fill="none"
      >
        <path d="M7 9H1L7 1L13 9H7Z" fill="#F97316" />
        <path
          d="M1 9L0.6 8.7C0.486368 8.85151 0.46809 9.05421 0.552786 9.22361C0.637482 9.393 0.810614 9.5 1 9.5V9ZM13 9V9.5C13.1894 9.5 13.3625 9.393 13.4472 9.22361C13.5319 9.05421 13.5136 8.85151 13.4 8.7L13 9ZM7 1L7.4 0.7C7.30557 0.574097 7.15738 0.5 7 0.5C6.84262 0.5 6.69443 0.574097 6.6 0.7L7 1ZM1 9.5H7V8.5H1V9.5ZM7 9.5H13V8.5H7V9.5ZM7.5 9V1H6.5V9H7.5ZM6.6 0.7L0.6 8.7L1.4 9.3L7.4 1.3L6.6 0.7ZM13.4 8.7L7.4 0.7L6.6 1.3L12.6 9.3L13.4 8.7Z"
          fill="#F97316"
        />
      </svg>
    </div>

    <a href={`/story/${$storyQuery.data.id}`}>
      <h1 class="font-medium text-md text-gray-800 dark:text-gray-200 md:text-lg">
        {$storyQuery.data.title}

        {#if $storyQuery.data.url}
          <span class="font-normal text-gray-400">{trimUrl($storyQuery.data.url)}</span>
        {/if}
      </h1>

      <div class="flex gap-2 text-xs text-gray-500 dark:text-gray-300 mt-1 md:text-sm">
        <p>{$storyQuery.data.score} Points</p>
        <p>•</p>

        <p>{toTitleCase(dayjs($storyQuery.data.time * 1000).fromNow(true))} Ago</p>
        <p class="hidden md:inline">•</p>

        <p class="hidden md:inline">{$storyQuery.data.descendants} Comments</p>
        <p class="hidden md:inline">•</p>

        <p class="hidden md:inline">By {$storyQuery.data.by}</p>
      </div>
    </a>
  </a>
{/if}

