<script>
  import Nav from "$lib/components/nav.svelte";
  import ProductHunt from "$lib/components/productHunt.svelte";
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
  let description = "Better Hacker News — Hacker News just got better.";
  let image =
    "https://raw.githubusercontent.com/vedantnn71/better-hackernews/main/static/social.png";

  if (typeof window !== "undefined") {
    url = window.location.href;
  }
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />

  <meta property="og:type" content="website" />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="/social.png" />

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={url} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content="/social.png" />

  <script defer src="https://usebud.vercel.app/track.js"></script>
</svelte:head>

<QueryClientProvider client={queryClient}>
  <div class="min-h-screen bg-gray-100 pb-2 dark:bg-gray-900">
    <Nav />
    <ProductHunt />
    <slot />
  </div>
</QueryClientProvider>

