import { z } from 'astro:content';
import { defineAction } from 'astro:actions';

import { ApiService } from '@/services/fetchData';
import type { IAnime } from '@/interface';

export const GetAnimeById = defineAction({
  accept: 'json',
  input: z.object({
    idAnime: z.number(),
  }),
  handler: async ({ idAnime }): Promise<IAnime> => {
    const apiService = new ApiService();

    return await apiService.get(`/anime/${idAnime}`);
  },
});
