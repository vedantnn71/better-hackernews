import type { Story } from "$lib/types";
import { STORY_URL } from "$lib/constants";
import axios, { type AxiosResponse } from "axios";

export async function getComments(id: number) {
  const story: AxiosResponse<Story> = await axios.get(`${STORY_URL}${id}.json`);

  if (!story.data.kids) {
    return [story.data];
  }

  const comments = await Promise.all(
    story.data.kids.map(async (id) => {
      const comment = await axios.get(`${STORY_URL}${id}.json`);
      return comment.data;
    })
  );

  return comments;
}
