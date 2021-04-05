import React from 'react';
import { string, func, bool, oneOfType } from 'prop-types';

const CharacterFace = ({ big }) => {
  return <CharacterFaceWrapper big={big}>...</CharacterFaceWrapper>;
};

CharacterFace.propTypes = {
  big: bool
};

CharacterFace.defaultProps = {
  big: false
};

export default CharacterFace;
