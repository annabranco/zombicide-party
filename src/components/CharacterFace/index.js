import React, { useRef } from 'react';
import { string, func, bool, number, oneOfType } from 'prop-types';
import Blood from '../../assets/images/blood.png';
import { CharFace, CharacterFaceWrapper, FaceWrapper, Wound } from './styles';

const CharacterFace = ({
  big,
  charName,
  currentChar,
  damageMode,
  disabled,
  onClick,
  played,
  src,
  tourMode,
  wounded
}) => {
  const variation = useRef(`${Math.floor(Math.random() * 45)}deg`);

  return (
    <CharacterFaceWrapper
      big={big}
      tourMode={
        (tourMode === 16 && charName === 'Doug') ||
        (tourMode === 19 && charName === 'Wanda')
      }
    >
      <FaceWrapper onClick={disabled ? () => null : onClick}>
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
  charName: string.isRequired,
  currentChar: bool,
  damageMode: oneOfType([string, bool]),
  disabled: bool,
  onClick: func.isRequired,
  played: bool,
  src: string.isRequired,
  tourMode: number,
  wounded: bool.isRequired
};

CharacterFace.defaultProps = {
  big: false,
  currentChar: false,
  damageMode: false,
  disabled: false,
  played: null,
  tourMode: null
};

export default CharacterFace;
