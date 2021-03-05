import { func, string, number, shape, arrayOf } from 'prop-types';

export const CharacterType = shape({
  abilities: arrayOf(string),
  color: string,
  experience: number,
  img: string,
  inReserve: arrayOf(string),
  inHand: arrayOf(string),
  name: string,
  player: string,
  selector: string,
  voice: string
});

export const errorTextsPropType = shape({
  errorLine1: string.isRequired,
  errorLine2: string.isRequired,
  notifyMe: string.isRequired,
  title: string.isRequired
});

const ModalButtonType = shape({
  text: string.isRequired,
  onClick: func,
  type: string.isRequired
});

export const ModalContentType = shape({
  title: string,
  text: string,
  buttons: arrayOf(ModalButtonType)
});

export const BonusDiceType = shape({
  combat: number.isRequired,
  melee: number.isRequired,
  ranged: number.isRequired
});
