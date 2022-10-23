import type { User } from "$lib/types";
import { USER_URL } from "$lib/constants";
import axios from "axios";

export async function getUser(userId: string): Promise<User> {
  const resp = await axios.get<User>(`${USER_URL}${userId}.json`);
  return resp.data;
}
