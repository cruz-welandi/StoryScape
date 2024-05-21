import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const TodayDateTime = () => {
  const today = new Date();
  const formattedDateTime = format(today, "d MMMM, yyyy", { locale: fr });

  return formattedDateTime;
};

const isEmpty = (obj) => {
    return obj && typeof obj === 'object' && Object.keys(obj).length === 0;
  };

export {
    TodayDateTime,
    isEmpty,
}