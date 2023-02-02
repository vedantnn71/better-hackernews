import {
  ASK_STORIES_URL,
  NEW_STORIES_URL,
  TOP_STORIES_URL,
  JOB_STORIES_URL,
  SHOW_STORIES_URL
} from "$lib/constants";
import type { StoryKey } from "$lib/types";
import axios from "axios";

export async function getStories(storyKey: StoryKey = "top"): Promise<number[]> {
  const url = getUrl(storyKey);
  const resp = await axios.get<number[]>(url);

  return resp.data;
}

function getUrl(storyType: StoryKey) {
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
