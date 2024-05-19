import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const TodayDateTime = () => {
  const today = new Date();
  const formattedDateTime = format(today, "d MMMM, yyyy HH:mm", { locale: fr });

  return formattedDateTime;
};

export {
    TodayDateTime
}