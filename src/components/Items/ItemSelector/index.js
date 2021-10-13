import React from 'react';
import { bool, func, number, string } from 'prop-types';
import {
  Block,
  PlayIcon,
  PlayImageButton,
  PlayText
} from '../../SoundBlock/styles';
import { SELECTION } from '../../../constants';

const SelectionItem = ({
  disabled,
  img,
  label,
  name,
  onHover,
  onSelect,
  tourMode,
  type
}) => (
  <Block
    tourMode={
      (tourMode === 15 && name === 'Crowbar') ||
      (tourMode === 18 && name === 'Fire Axe') ||
      (tourMode === 21 && name === 'Pistol') ||
      (tourMode === 34 && name === 'SubMG')
    }
  >
    <PlayImageButton
      disabled={disabled}
      onClick={disabled ? () => null : () => onSelect(name)}
      slotType={SELECTION}
    >
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

SelectionItem.propTypes = {
  disabled: bool,
  img: string,
  label: string,
  name: string.isRequired,
  onHover: func,
  onSelect: func.isRequired,
  tourMode: number,
  type: string.isRequired
};

SelectionItem.defaultProps = {
  disabled: false,
  img: null,
  label: null,
  onHover: () => null,
  tourMode: null
};

export default SelectionItem;
