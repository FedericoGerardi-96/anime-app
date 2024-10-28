import type { APIRoute } from 'astro';
import { actions } from 'astro:actions';

export const GET: APIRoute = async () => {
  const { error, data } = await actions.GetSeasonList();

  if (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({
      status: 200,
      data: data,
    })
  );
};
