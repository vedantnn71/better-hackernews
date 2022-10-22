<script>
  import Nav from "$lib/components/nav.svelte";
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";
  import { theme } from "$lib/store";
  import { onDestroy } from "svelte";
  import relativeTime from "dayjs/plugin/relativeTime";
  import dayjs from "dayjs";
  import "../styles/globals.css";
  import "../styles/fonts.css";

  const queryClient = new QueryClient();
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

  let title = "Hacker News";
  let url = "https://better-hackernews.vercel.app/";
  let description = "Better hacker news − hacker news, reimagined.";
  let image =
    "https://raw.githubusercontent.com/vedantnn71/better-hackernews/main/static/social.png";

  if (typeof window !== "undefined") {
    url = window.location.href;
  }
</script>

<svelte:head>
  <title>Hacker News</title>
  <meta property="og:title" content={title} />
  <meta property="og:site_name" content={title} />
  <meta property="og:url" content={url} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@vedantnn7" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
</svelte:head>

<QueryClientProvider client={queryClient}>
  <div class="min-h-screen bg-gray-100 pb-2 dark:bg-gray-900">
    <Nav />
    <slot />
  </div>
</QueryClientProvider>
