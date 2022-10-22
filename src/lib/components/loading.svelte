<script lang="ts">
  import Logo from "$lib/components/logo.svelte";
  import { fade } from "svelte/transition";
</script>

<div
  class="fixed top-0 left-0 grid h-screen min-h-screen w-screen place-items-center bg-gray-100 dark:bg-gray-900"
  transition:fade
>
  <div>
    <Logo />
  </div>
</div>
