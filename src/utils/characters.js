/* eslint-disable no-param-reassign */
import { LOCAL_STORAGE_KEY } from '../constants';
import { ALL_ABILITIES } from '../setup/abilities';

/* This util is necessary as localStorage ignores object methods (effects of promotions) */

let loadedGame;

const updatePromotion = promo => {
  const originalPromo = Object.values(ALL_ABILITIES).find(
    abil =>
      abil.name === promo.name ||
      promo.name.includes(abil.name.substring(0, 12))
  );
  return originalPromo || promo;
};

export const loadSavedGame = () => {
  if (!loadedGame) {
    const savedGame = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (savedGame && savedGame.length > 0) {
      savedGame.forEach(character => {
        character.promotions.blue = updatePromotion(character.promotions.blue);
        character.promotions.yellow = updatePromotion(
          character.promotions.yellow
        );
        character.promotions.orange[0] = updatePromotion(
          character.promotions.orange[0]
        );
        character.promotions.orange[1] = updatePromotion(
          character.promotions.orange[1]
        );
        character.promotions.red[0] = updatePromotion(
          character.promotions.red[0]
        );
        character.promotions.red[1] = updatePromotion(
          character.promotions.red[1]
        );
        character.promotions.red[2] = updatePromotion(
          character.promotions.red[2]
        );
      });
    }
    if (savedGame) {
      loadedGame = savedGame;
    }
    return savedGame;
  }
  return loadedGame;
};
