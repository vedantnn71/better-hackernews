import type { PageLoad } from "./$types";

export type Story = {
  id: number;
  title: string;
  url: string;
  by: string;
  time: number;
  score: number;
  descendants: number;
  text?: string;
  type?: string;
  kids?: number[];
}

export interface TopPageLoad extends PageLoad {
  stories: Story[];
}

