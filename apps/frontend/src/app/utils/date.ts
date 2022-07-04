import moment from 'moment';

export function getFormattedDateTime(date: string) {
  return moment(date).format('DD.MM.yyyy HH:mm');
}
