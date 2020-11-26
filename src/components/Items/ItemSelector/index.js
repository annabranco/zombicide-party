import React from 'react';
import { func, string } from 'prop-types';
import {
  Block,
  PlayIcon,
  PlayImageButton,
  PlayText
} from '../../SoundBlock/styles';

const SelectionItem = ({ type, onSelect, onHover, name, label, img }) => {
  return (
    <Block>
      <PlayImageButton onClick={() => onSelect(name)}>
        {img ? (
          <PlayIcon
            src={img}
            type={type}
            onMouseOver={() => onHover(label || name)}
            onMouseOut={() => onHover()}
          />
        ) : (
          <PlayText>{label || name}</PlayText>
        )}
      </PlayImageButton>
    </Block>
  );
};

SelectionItem.propTypes = {
  img: string,
  label: string,
  name: string.isRequired,
  onHover: func,
  onSelect: func.isRequired,
  type: string.isRequired
};

SelectionItem.defaultProps = {
  img: null,
  label: null,
  onHover: () => null
};

export default SelectionItem;
