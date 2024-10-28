import { defineAction } from 'astro:actions';

import { ApiService } from '@/services/fetchData';
import type { ISeasonAnime } from '@/interface/my-anime-list/seasons/season-anime.interface';

export const GetSeasonList = defineAction({
  accept: 'json',
  handler: async (): Promise<ISeasonAnime> => {
    const apiService = new ApiService();
    const data = await apiService.get('/seasons');
    return data;
  },
});
