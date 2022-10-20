<script>
  import cx from "classnames";
  import { isOpen } from "$lib/store";

  let open = false;

  const links = {
    Top: "/top",
    New: "/new",
    Show: "/show",
    Ask: "/ask",
    Jobs: "/jobs"
  };

  isOpen.subscribe((val) => {
    open = val;
  });
</script>

{#if open}
  <div>
    <div class="space-y-1 px-2 pt-2 pb-3">
      {#each Object.entries(links) as [name, href]}
        <a
          {href}
          class={cx(
            "text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-xl text-base font-medium",
            href === (typeof window !== "undefined" ? window.location.pathname : false) &&
              "bg-gray-800 text-white"
          )}
        >
          {name}
        </a>
      {/each}

      <button class="btn btn-dark w-full">
        <div class="gg-moon" />
        Light Mode
      </button>
    </div>
  </div>
{/if}
