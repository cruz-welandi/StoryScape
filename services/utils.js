import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useState } from 'react';

function LocalStorage(key, initialValue) {
  // État pour stocker notre valeur
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Obtenir de localStorage par clé
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      // Analyser l'élément stocké ou si aucun retourne initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Si une erreur retourne également initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Retourne une version enveloppée de la fonction de définition de useState qui...
  // ... persiste la nouvelle valeur dans localStorage.
  const setValue = value => {
    try {
      // Permet à la valeur d'être une fonction afin que nous ayons la même API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Enregistrer l'état
      setStoredValue(valueToStore);
      // Enregistrer dans localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // Une implémentation plus avancée gérerait le cas d'erreur
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

const TodayDateTime = () => {
  const today = new Date();
  const formattedDateTime = format(today, "d MMMM, yyyy HH:mm", { locale: fr });

  return formattedDateTime;
};

const isEmpty = (obj) => {
    return obj && typeof obj === 'object' && Object.keys(obj).length === 0;
  };

export {
    TodayDateTime,
    isEmpty,
    LocalStorage
}