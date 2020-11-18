import { CHARACTERS } from '../setup/characters';

export const getPlayerObject = (player, weapons) => {
  return {
    ...player,
    weapons
  };
};

export const getCharacterColor = name => {
  let color;
  const character = CHARACTERS.find(char => char.name === name);
  // CHARACTERS.forEach(char => {
  //   console.log('$$$ char.name, name', char.name, name, char.name === name);

  //   if (char.mame === name) {
  //     console.log('$$$ char.color', char.color);
  //     color = char.color;
  //   }
  // });
  // console.log('$$$ color', color);
  // return color;
  console.log('$$$ character', character);
  return character && character.color;
};
