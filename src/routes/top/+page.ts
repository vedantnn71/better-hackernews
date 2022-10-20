import { TOP_STORIES_URL, STORY_URL } from "$lib/constants";
import axios from "axios";

type Story = {
  id: number;
  title: string;
  url: string;
  by: string;
  time: number;
  score: number;
  descendants: number;
  text?: string;
  type?: string;
}

type Stories = Story[];

type PageLoad = {
  props: {
    stories: Stories;
  };
};

export async function load(): Promise<PageLoad> {
  const storiesId = await axios.get(TOP_STORIES_URL);
  const fetchedStories = await Promise.all(
    storiesId
      .data
      .slice(0, 10)
      .map((id: number) => axios.get(`${STORY_URL}${id}.json`)
  ));
  const stories = fetchedStories.map((story) => story.data);

  return {
    props: {
      stories,
    },
  };
}

