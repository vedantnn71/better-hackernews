export type User = {
  id: string;
  karma: number;
  created: number;
  submitted?: number[];
  about?: string;
  delay?: number;
};
