import { TOP_STORIES_URL, STORY_URL } from "$lib/constants";
import axios from "axios";
import type { TopPageLoad, Story } from "./types";

export const load: TopPageLoad = async () => {
  const storiesId = await axios.get(TOP_STORIES_URL);
  const fetchedStories = await Promise.all(
    storiesId
      .data
      .slice(0, 10)
      .map((id: number) => axios.get(`${STORY_URL}${id}.json`)
  ));
  const stories: Story[] = fetchedStories.map((story) => story.data);

  return {
    stories,
  };
}

