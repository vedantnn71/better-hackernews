<script lang="ts">
  import StoryCard from "$lib/components/storyCard.svelte";
  import type { PageData } from "./$types";
  import { fly, fade } from "svelte/transition";
  import { useQuery } from "@sveltestack/svelte-query";
  import { getUser } from "$lib/api";
  import dayjs from "dayjs";

  export let data: PageData;

  let userId = data.props.userId;

  const userQuery = useQuery(["user", userId], () => getUser(userId));

  let submitted: number[] | undefined = [];
  let showSubmittedTill = 5;

  $: if ($userQuery.isSuccess) {
    if ($userQuery.data?.submitted) {
      submitted = $userQuery.data.submitted.slice(0, showSubmittedTill);
    }
  }
</script>

<svelte:head>
  <title>Hacker News − @{$userQuery.data?.id || "loading ..."}</title>
</svelte:head>

<div class="m-6 flex flex-col gap-4 text-gray-700 dark:text-gray-300 md:mx-8" transition:fade>
  {#if $userQuery.isLoading}
    Loading...
  {/if}

  {#if $userQuery.isError}
    Error: {$userQuery.error}
  {/if}

  {#if $userQuery.isSuccess}
    {#if $userQuery.data === null}
      <div class="grid w-full place-items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-12 w-12"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
          />
        </svg>

        <h1 class="text-center text-lg md:text-xl">
          Whooopsis.. seems like user {userId} does not exists (on this planet)
        </h1>
      </div>
    {:else}
      <div transition:fade={{ duration: 500 }}>
        <h1 class="text-lg font-semibold text-gray-900 dark:text-gray-100 md:text-xl">
          @{$userQuery.data.id}
        </h1>

        <div class="flex items-center gap-4 font-medium">
          <div class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5 md:h-6 md:w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>
            <span>{$userQuery.data.karma}</span>
          </div>

          <div class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5 md:h-6 md:w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>

            <span>Joined {dayjs($userQuery.data.created * 1000).format("MMM DD, YYYY")}</span>
          </div>
        </div>

        <div
          class="prose-lg prose prose-gray break-words font-normal text-gray-700 dark:text-gray-300"
        >
          {#if $userQuery.data.about}
            {@html $userQuery.data.about}
          {:else}
            There is not much to say about this user :(
          {/if}
        </div>

        {#if submitted}
          <div class="flex flex-col gap-4" transition:fade={{ duration: 1000 }}>
            <h2 class="text-base font-semibold md:text-lg">Recent Submissions and Comments</h2>

            {#each submitted as submission, index}
              <div class="md:-mx-4">
                <StoryCard id={submission} {index} />
              </div>
            {/each}

            <button
              class="btn btn-light justify-center"
              on:click={() => (showSubmittedTill += 5)}
              transition:fly={{ x: 0, duration: 500, delay: 100 }}
            >
              Show more
            </button>
          </div>
        {/if}
      </div>
    {/if}
  {/if}
</div>
