<script>
  import "../styles/globals.css";
  import "../styles/fonts.css";
  import relativeTime from "dayjs/plugin/relativeTime";
  import dayjs from "dayjs";

  dayjs.extend(relativeTime);
</script>

<slot />
