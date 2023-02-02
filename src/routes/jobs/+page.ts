import type { PageLoad } from "./$types";
import { getStories } from "$lib/api";

export const load = (() => {
  return { stories: getStories("jobs") };
}) satisfies PageLoad;
