export function getSeasonOfTheYear(lang = 'es') {
  const hoy = new Date();
  const mes = hoy.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
  let epoca;

  if (mes >= 3 && mes <= 5) {
    epoca = lang === 'es' ? 'Primavera' : 'Spring';
  } else if (mes >= 6 && mes <= 8) {
    epoca = lang === 'es' ? 'Verano' : 'Summer';
  } else if (mes >= 9 && mes <= 11) {
    epoca = lang === 'es' ? 'Otoño' : 'Fall';
  } else {
    epoca = lang === 'es' ? 'Invierno' : 'Winter';
  }

  return epoca;
}

export function translateSeason(season: string, lang = 'es') {
  if (lang === 'en') return season;

  switch (season.toLocaleLowerCase()) {
    case 'spring':
      return 'Primavera';
    case 'summer':
      return 'Verano';
    case 'fall':
      return 'Otoño';
    case 'winter':
      return 'Invierno';
    default:
      return season;
  }
}
