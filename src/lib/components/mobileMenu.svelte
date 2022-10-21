<script lang="ts">
  import { isOpen, toggleTheme, theme } from "$lib/store";
  import { onDestroy } from 'svelte';

  let currentTheme = "light";
  let open = false;

  const unsubscribeTheme = theme.subscribe((val) => {
    currentTheme = val;
  });

  const unsusbscribeOpen = isOpen.subscribe((val) => {
    open = val;
  });

  const links = {
    Top: "/",
    New: "/new",
    Show: "/show",
    Ask: "/ask",
    Jobs: "/jobs"
  };

  function isActive(href: string) {
    if (typeof window === "undefined"){
      return;
    }

    return href === window.location.pathname;
  }

  onDestroy(unsubscribeTheme);
  onDestroy(unsusbscribeOpen);
</script>

{#if open}
  <div>
    <div class="space-y-1 px-2 pt-2 pb-3">
      {#each Object.entries(links) as [name, href]}
        <a
          {href}
          class="text-gray-800 hover:bg-gray-700 hover:text-gray-100 dark:text-gray-200 block px-3 py-2 rounded-xl text-base font-medium"
          class:bg-gray-800 = {isActive(href)}
          class:text-gray-100 = {isActive(href)}
        >
          {name}
        </a>
      {/each}

      <button class="btn btn-dark w-full" on:click={toggleTheme}>
        <div class="gg-moon" />

        {#if currentTheme === "dark"}
          <span class="ml-2">Light</span>
        {:else}
          <span class="ml-2">Dark</span>
        {/if}
      </button>
    </div>
  </div>
{/if}
