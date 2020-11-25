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

export const characterTypes = shape({
  abilities: arrayOf(string),
  color: string,
  experience: number,
  img: string,
  inBackpack: arrayOf(string),
  inHand: arrayOf(string),
  name: string,
  player: string,
  selector: string,
  voice: string
});
