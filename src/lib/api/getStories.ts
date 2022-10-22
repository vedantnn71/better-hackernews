import {
  STORY_URL,
  ASK_STORIES_URL,
  NEW_STORIES_URL,
  TOP_STORIES_URL,
  JOB_STORIES_URL,
  SHOW_STORIES_URL
} from "$lib/constants";
import type { Story } from "$lib/types";
import axios from "axios";

type StoryType = "top" | "new" | "ask" | "show" | "jobs";

export async function getStories(storyType: StoryType = "top", pageParam: number = 1): Promise<number[]> {
  const url = getUrl(storyType);
  const resp = await axios.get<number[]>(url);
  const stories = resp.data.slice(0, pageParam);

  return stories;
}

function getUrl(storyType: StoryType) {
  switch (storyType) {
    case "top":
      return TOP_STORIES_URL;
    case "new":
      return NEW_STORIES_URL;
    case "ask":
      return ASK_STORIES_URL;
    case "show":
      return SHOW_STORIES_URL;
    case "jobs":
      return JOB_STORIES_URL;
  }
}
