import { useEffect } from 'react';
import isRecipeFavorite from '../service/isRecipeFavorite';

export default function useIsFavorite(setFavorite, recipe, type) {
  useEffect(() => {
    const isFavorite = () => {
      setFavorite(isRecipeFavorite(recipe, type));
    };
    isFavorite();
  }, [setFavorite, recipe, type]);
}
