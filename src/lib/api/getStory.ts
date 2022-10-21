import { STORY_URL } from "$lib/constants";
import type { Story } from "$lib/types";
import axios from "axios";

export async function getStory(id: number) {
  const story = await axios.get<Story>(`${STORY_URL}${id}.json`);
  return story.data;
}

