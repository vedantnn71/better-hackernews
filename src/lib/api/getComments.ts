import type { Story } from "$lib/types";
import { STORY_URL } from "$lib/constants";
import axios, { type AxiosResponse } from "axios";

export async function getComments(id: number) {
  const story: AxiosResponse<Story> = await axios.get(`${STORY_URL}${id}.json`);

  if (!story.data.kids) {
    return [story.data];
  }

  let comments: Story[] = [];

  for (const commentId of story.data.kids) {
    const comment: AxiosResponse<Story> = await axios.get(`${STORY_URL}${commentId}.json`);
    comments.push(comment.data);
  }

  return comments;
}
