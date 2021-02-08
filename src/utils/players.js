export const getCharacterColor = (name, characters) => {
  const character = characters.find(char => char.name === name);
  return character && character.color;
};

export const updatePlayerObject = (player, inHand, inReserve) => {
  return {
    ...player,
    inHand,
    inReserve
  };
};
