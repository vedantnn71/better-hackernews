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

type StoryType = "top" | "new" | "ask" | "show" | "job";

export async function getStories(storyType: StoryType = "top"): Promise<Story[]> {
  const url = getUrl(storyType);
  const storiesId = await axios.get(url);
  const fetchedStories = await Promise.all(
    storiesId.data.slice(0, 10).map((id: number) => axios.get(`${STORY_URL}${id}.json`))
  );
  const stories: Story[] = fetchedStories.map((story) => story.data);

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
    case "job":
      return JOB_STORIES_URL;
  }
}
