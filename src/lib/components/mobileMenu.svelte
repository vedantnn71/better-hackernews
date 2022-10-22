<script lang="ts">
  import { isOpen, toggleTheme, theme } from "$lib/store";
  import { onDestroy } from "svelte";

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
    if (typeof window === "undefined") {
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
          class="block rounded-xl px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-gray-100 dark:text-gray-200"
          class:bg-gray-800={isActive(href)}
          class:text-gray-100={isActive(href)}
        >
          {name}
        </a>
      {/each}

      <button class="btn btn-dark w-full" on:click={toggleTheme}>
        {#if currentTheme === "dark"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
          <span class="ml-2">Light</span>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>

          <span class="ml-2">Dark</span>
        {/if}
      </button>
    </div>
  </div>
{/if}
