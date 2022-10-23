<script lang="ts">
  import { toTitleCase } from "$lib/utils";
  import dayjs from "dayjs";

  export let time: number;
</script>

<p>{toTitleCase(dayjs(time * 1000).fromNow(true))} Ago</p>
