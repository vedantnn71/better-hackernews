<script lang="ts">
  import Logo from "./logo.svelte";
  import MobileMenu from "./mobileMenu.svelte";
  import { isOpen, toggleTheme, theme } from "$lib/store";
  import { onDestroy } from "svelte";

  let currentTheme = "light";

  const unsubscribeTheme = theme.subscribe((val) => {
    currentTheme = val;
  });

  const links = {
    Top: "/",
    New: "/new",
    Show: "/show",
    Ask: "/ask",
    Jobs: "/jobs"
  };

  onDestroy(unsubscribeTheme);
</script>

<div class="flex w-full items-center border-b border-gray-300 py-4 px-8 dark:border-gray-800">
  <a href="/">
    <Logo />
  </a>

  <div class="ml-auto hidden items-center justify-center gap-8 md:flex">
    {#each Object.entries(links) as [name, href]}
      <a
        {href}
        class="text-gray-800 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300"
        >{name}</a
      >
    {/each}

    <div class="h-4 w-px bg-gray-300 dark:bg-gray-600" />

    <button class="btn btn-dark py-3 px-5" on:click={toggleTheme}>
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

  <button
    class="ml-auto h-8 outline-none dark:text-gray-200 md:hidden"
    on:click={() => isOpen.update((val) => !val)}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="h-6 w-6"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
</div>

<MobileMenu />
