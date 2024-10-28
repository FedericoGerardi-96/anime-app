export const translateSpanishDayOfWeek = (day: string) => {
  switch (day.toLowerCase()) {
    case 'sundays':
      return 'Domingo';
    case 'mondays':
      return 'Lunes';
    case 'tuesdays':
      return 'Martes';
    case 'wednesdays':
      return 'Miércoles';
    case 'thursdays':
      return 'Jueves';
    case 'fridays':
      return 'Viernes';
    case 'saturdays':
      return 'Sábado';
    default:
      return 'Invalid day';
  }
};
