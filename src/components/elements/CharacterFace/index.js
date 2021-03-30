import React, { useRef } from 'react';
import { string, func, bool, oneOfType } from 'prop-types';
import Blood from '../../../assets/images/blood.png';
import { CharacterFaceWrapper, Wound, CharFace, FaceWrapper } from './styles';

const CharacterFace = ({
  big,
  currentChar,
  damageMode,
  onClick,
  played,
  src,
  wounded
}) => {
  const variation = useRef(`${Math.floor(Math.random() * 45)}deg`);

  return (
    <CharacterFaceWrapper big={big}>
      <FaceWrapper onClick={onClick}>
        <CharFace
          big={big}
          currentChar={currentChar}
          damageMode={damageMode}
          played={played}
          src={src}
        />
        {wounded && <Wound degree={variation.current} src={Blood} />}
      </FaceWrapper>
    </CharacterFaceWrapper>
  );
};

CharacterFace.propTypes = {
  big: bool,
  currentChar: bool,
  damageMode: oneOfType([string, bool]),
  onClick: func.isRequired,
  played: bool,
  src: string.isRequired,
  wounded: bool.isRequired
};

CharacterFace.defaultProps = {
  big: false,
  currentChar: false,
  damageMode: false,
  played: null
};

export default CharacterFace;
