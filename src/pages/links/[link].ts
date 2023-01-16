import type { APIRoute } from "astro";

export const get: APIRoute = async ({ params, redirect }) => {
  return redirect(
    `https://linkfree.eddiehub.io/api/users/${
      import.meta.env.LINKFREE_USERNAME
    }/links/${encodeURIComponent(params.link)}`,
    301
  );
};
