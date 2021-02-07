import React from 'react';
import { func, string } from 'prop-types';
import {
  Block,
  PlayIcon,
  PlayImageButton,
  PlayText
} from '../../SoundBlock/styles';
import { SELECTION } from '../../../constants';

const SelectionItem = ({ img, label, name, onHover, onSelect, type }) => {
  return (
    <Block>
      <PlayImageButton onClick={() => onSelect(name)} slotType={SELECTION}>
        {img ? (
          <PlayIcon
            onMouseOut={() => onHover()}
            onMouseOver={() => onHover(label || name)}
            src={img}
            type={type}
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
