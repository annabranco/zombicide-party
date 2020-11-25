import { CHARACTERS } from '../setup/characters';

export const getCharacterColor = name => {
  const character = CHARACTERS.find(char => char.name === name);
  return character && character.color;
};

export const updatePlayerObject = (player, inHand, inBackpack) => {
  return {
    ...player,
    inHand,
    inBackpack
  };
};
