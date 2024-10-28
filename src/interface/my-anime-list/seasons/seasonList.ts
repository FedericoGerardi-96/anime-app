export interface ISeasonsList {
  pagination: Pagination;
  data: seasonListData[];
}

export interface seasonListData {
  year: number;
  seasons: SeasonData[];
}

export enum SeasonData {
  Fall = 'fall',
  Spring = 'spring',
  Summer = 'summer',
  Winter = 'winter',
  
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
}
