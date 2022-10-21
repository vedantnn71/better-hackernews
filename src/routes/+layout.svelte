<script>
  import Nav from "$lib/components/nav.svelte";
  import { theme } from "$lib/store";
  import { onDestroy } from 'svelte';
  import relativeTime from "dayjs/plugin/relativeTime";
  import dayjs from "dayjs";
  import "../styles/globals.css";
  import "../styles/fonts.css";

  const unsubscribeTheme = theme.subscribe((currentTheme) => {
    if (typeof window !== "undefined") {
      const html = document.querySelector("html");
      
      if (currentTheme === "dark") {
        html?.classList.add("dark");
      }

      if (currentTheme === "light") {
        html?.classList.remove("dark");
      }
    }
  });
  
  onDestroy(unsubscribeTheme);
  dayjs.extend(relativeTime);
</script>


<div class="bg-gray-100 dark:bg-gray-900 min-h-screen">
  <Nav />
  <slot />
</div>
