export const getPlayerObject = (player, weapons) => {
  return {
    ...player,
    weapons
  };
};
