import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const { userId } = params;

  return {
    props: {
      userId
    }
  };
};
