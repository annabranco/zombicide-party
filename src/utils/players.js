import { CHARACTERS } from '../setup/characters';

export const updatePlayerObject = (player, inHand, inBackpack) => {
  return {
    ...player,
    inHand,
    inBackpack
  };
};

export const getCharacterColor = name => {
  const character = CHARACTERS.find(char => char.name === name);
  return character && character.color;
};
