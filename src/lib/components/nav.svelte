<script lang="ts">
  import Logo from "./logo.svelte";
  import MobileMenu from "./mobileMenu.svelte";
  import { isOpen } from "$lib/store";

  const links = {
    Top: "/top",
    New: "/new",
    Show: "/show",
    Ask: "/ask",
    Jobs: "/jobs"
  };
</script>

<div class="flex items-center w-full py-4 px-8 border-b border-gray-300">
  <Logo />

  <div class="hidden md:flex justify-center items-center ml-auto gap-8">
    {#each Object.entries(links) as [name, href]}
      <a {href} class="hover:text-gray-700 text-gray-800">{name}</a>
    {/each}

    <div class="h-4 w-px bg-gray-300" />

    <button class="btn btn-dark py-3 px-5">
      <div class="gg-moon" />
      Light Mode
    </button>
  </div>

  <button class="ml-auto md:hidden outline-none h-8" on:click={() => isOpen.update((val) => !val)}>
    <div class="gg-menu" />
  </button>
</div>

<MobileMenu />
