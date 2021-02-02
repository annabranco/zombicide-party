import {
  oneOf,
  func,
  string,
  number,
  bool,
  shape,
  arrayOf,
  oneOfType
} from 'prop-types';

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

export const BonusDicesType = shape({
  combat: number.isRequired,
  melee: number.isRequired,
  ranged: number.isRequired
});
