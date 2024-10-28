import { registerUser, loginUser, logout, loginWithGoogle } from './auth';
import { InsertUserFirestore, InsertUserFirestoreGoogle } from './user';
import { GetAnimeById, GetSeasonAnimeByYearAndSeason, GetSeasonList } from './my-anime-list';

export const server = {
  // auth
  registerUser,
  loginUser,
  logout,
  loginWithGoogle,
  // user
  InsertUserFirestore,
  InsertUserFirestoreGoogle,

  // my-anime-list
  // seasons
  GetSeasonAnimeByYearAndSeason,
  GetSeasonList,
  // anime
  GetAnimeById,
};
