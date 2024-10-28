import { useCallback, useEffect, useMemo, useState } from 'react';
import { URL as Urlweb } from 'astro:env/client';

import Cookies from 'js-cookie';

import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from '@/components/ui';
import { getLangFromUrl, useTranslations } from '@/i18n/utils';
import type { ISeasonsList, SeasonData } from '@/interface';
import { getSeasonOfTheYear, translateSeason } from '@/utils';

const url = new URL(window.location.href);

export const SelectSeason = () => {
  const [seasonListApiData, setSeasonListApiData] = useState<ISeasonsList>();
  const [seasonsList, setSeasonsList] = useState<any[]>([]);

  const [year, setyYear] = useState(new Date().getFullYear());
  const [season, setSeason] = useState(getSeasonOfTheYear('en').toLowerCase());
  const lang = getLangFromUrl(url) as string;
  const t = useTranslations(lang);

  useEffect(() => {
    setyYear(Number(Cookies.get('year')) || new Date().getFullYear());
    setSeason(Cookies.get('season') || getSeasonOfTheYear('en').toLowerCase());
  }, []);

  useEffect(() => {
    const fetchSeasonList = async () => {
      const response = await fetch(`${Urlweb}/api/getSeasonList.json`);
      const { data } = await response.json();
      setSeasonListApiData(data);
    };
    fetchSeasonList();
  }, [setSeasonListApiData]);

  const options = useMemo<number[]>(() => {
    if (!seasonListApiData || !seasonListApiData.data) return [];
    const years = seasonListApiData?.data?.map((season) => season.year);
    return years;
  }, [seasonListApiData]);

  const onYearChange = (year: any) => {
    const seasonsOfTheSelectedYear = seasonListApiData?.data.filter((season) => season.year.toString() === year);

    if (seasonsOfTheSelectedYear) {
      setyYear(year);
      setSeasonsList(
        seasonsOfTheSelectedYear[0].seasons.map((season) => {
          const seasonTranslate = translateSeason(season, lang);
          return lang === 'es' ? seasonTranslate : season;
        })
      );
    }
  };

  const onSeasonChange = (season: any) => {
    setSeason(season);
  };

  const onClick = () => {
    debugger;
    Cookies.set('season', translateSeason(season, "en"));
    Cookies.set('year', year.toString());
    window.location.reload();
  };

  return (
    <div className='flex flex-col  gap-8'>
      <h1 className='text-4xl mb-8'>
        <span className='capitalize'> {year} </span>
        <span className='capitalize'>{translateSeason(season, lang)} </span> Animes:
      </h1>
      <h1 className='text-xl'>{t('anime.tittleFilter')}</h1>
      <div className='flex items-end gap-6'>
        <div>
          <Label htmlFor='select-season' className='block mb-4 text-2xl'>
            {t('anime.selectYear')}
          </Label>
          <Select onValueChange={onYearChange} name='select-season'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder={t('anime.selectYear')} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map((year) => {
                  return (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {seasonsList.length > 0 && (
          <div className='flex gap-4'>
            <Separator orientation='vertical' />
            <div>
              <Label htmlFor='select-season' className='block mb-4 text-2xl'>
                {t('anime.selectSeason')}
              </Label>
              <Select onValueChange={onSeasonChange} name='select-season'>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder={t('anime.selectSeason')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {seasonsList.map((season) => {
                      return (
                        <SelectItem key={season} value={season.toString()}>
                          {season}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        {seasonsList.length > 0 && <Button onClick={onClick}>{t('anime.filter')}</Button>}
      </div>
    </div>
  );
};
