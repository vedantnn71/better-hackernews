<script lang="ts" context="module">
  import Logo from "./logo.svelte";
</script>

<div class="flex justify-between items-center w-full py-4 px-8 border-b border-gray-300">
  <Logo />
  
  <div class="flex gap-8">
    <a href="/top" class="hover:text-gray-700 text-gray-800">Top</a>
    <a href="/new" class="hover:text-gray-700 text-gray-800">New</a>
    <a href="/show" class="hover:text-gray-700 text-gray-800">Show</a>
    <a href="/ask" class="hover:text-gray-700 text-gray-800">Ask</a>
    <a href="/jobs" class="hover:text-gray-700 text-gray-800">Jobs</a>
  </div>
</div>

