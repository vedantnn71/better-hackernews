import { STORY_URL } from "$lib/constants";
import axios from "axios";

export async function getStory(id: number) {
  const story = await axios.get(`${STORY_URL}${id}.json`);
  return story.data;
}

