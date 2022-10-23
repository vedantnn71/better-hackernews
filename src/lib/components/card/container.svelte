<script lang="ts">
  export let url: string | undefined;
</script>

<a
  href={url}
  rel="noopener noreferrer"
  target="_blank"
  class="flex items-start gap-4 rounded-2xl border border-gray-300 bg-gray-100 px-5 py-4 dark:border-gray-800 dark:bg-gray-900 md:mx-4"
>
  <slot />
</a>
