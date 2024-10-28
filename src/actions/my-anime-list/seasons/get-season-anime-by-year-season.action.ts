import { z } from 'astro:content';
import { defineAction } from 'astro:actions';

import { ApiService } from '@/services/fetchData';
import type { ISeasonAnime } from '@/interface/my-anime-list/seasons/season-anime.interface';

export const GetSeasonAnimeByYearAndSeason = defineAction({
  accept: 'json',
  input: z.object({
    year: z.number().optional().default(new Date().getFullYear()),
    season: z.string().optional(),
    page: z.number().optional().default(1),
    size: z.number().optional().default(10),
  }),
  handler: async ({ year, season, page, size }): Promise<ISeasonAnime> => {
    const apiService = new ApiService();

    if (!season) return await apiService.get(`/seasons/now?page=${page}&limit=${size}`);

    return await apiService.get(`/seasons/${year}/${season}`);
  },
});
