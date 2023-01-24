import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url }) => {
  return {
    props: {
      userId: url.searchParams.get("id"),
    }
  };
};
