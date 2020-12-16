export const getActionColor = action => {
  switch (action) {
    case 'free move':
      return '#33cc33';
    case 'free attack':
      return '#ff0000';
    case 'free search':
      return '#ffa100';
    default:
      return '#00a9ff';
  }
};

export const checkIfHasAnyActionLeft = actionsArray =>
  actionsArray.reduce((a, b) => a + b, 0) > 0;
