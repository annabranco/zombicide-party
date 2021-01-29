import React, { useRef } from 'react';
import { string, func, bool } from 'prop-types';
import Blood from '../../assets/images/blood.png';
import { CharacterFaceWrapper, Wound, CharFace, FaceWrapper } from './styles';

const CharacterFace = ({ big, currentChar, onClick, played, src, wounded }) => {
  const variation = useRef(`${Math.floor(Math.random() * 45)}deg`);
  return (
    <CharacterFaceWrapper big={big}>
      <FaceWrapper onClick={onClick}>
        <CharFace
          big={big}
          currentChar={currentChar}
          played={played}
          src={src}
        />
        {wounded && <Wound degree={variation.current} src={Blood} />}
      </FaceWrapper>
    </CharacterFaceWrapper>
  );
};

CharacterFace.propTypes = {
  big: bool.isRequired,
  currentChar: string.isRequired,
  onClick: func.isRequired,
  played: bool.isRequired,
  src: string.isRequired,
  wounded: bool.isRequired
};

export default CharacterFace;
