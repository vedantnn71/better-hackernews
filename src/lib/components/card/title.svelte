<script lang="ts">
  import { toTitleCase, trimUrl } from "$lib/utils";

  export let title: string | undefined;
  export let text: string | undefined;
  export let url: string | undefined;
</script>

<h1 class="text-md break-all font-medium text-gray-800 dark:text-gray-200 md:text-lg">
  {#if title}
    {toTitleCase(title)}
  {:else}
    {@html text || "[dead]"}
  {/if}

  {#if url}
    <span class="font-normal text-gray-600 dark:text-gray-400">{trimUrl(url)}</span>
  {/if}
</h1>
