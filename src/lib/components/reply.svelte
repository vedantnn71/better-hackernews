<script lang="ts">
  import Comment from "./comment.svelte";
  import { getComments } from "$lib/api";

  export let replyId: number;

  let replies = getComments(replyId);
</script>

{#await replies}
  <div class="ml-4 font-medium text-gray-800 dark:text-gray-200">Loading...</div>

{:then replies}
  {#if replies.length}
    {#each replies as comment}
      <div class="mt-4 flex flex-col">
        <Comment {comment} />
      </div>
    {/each}
  {/if}

{:catch error}
  <div class="text-red-500">
    {error.message}
  </div>
{/await}
