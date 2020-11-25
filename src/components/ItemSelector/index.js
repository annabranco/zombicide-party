import React from 'react';
import { string, func } from 'prop-types';
import { Block, PlayImage, PlayIcon, PlayText } from '../areas/styles';

const SelectionItem = ({ img, label, name, onHover, onSelect, type }) => {
  return (
    <Block>
      <PlayImage onClick={() => onSelect(name)}>
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
      </PlayImage>
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
