import React from 'react';
import { func } from 'prop-types';
import { TourButton, TourButtonIcon } from './styles';
import ZombieFace from '../../assets/images/zombieFace.png';

const TakeATourButton = ({ onClickTakeATour }) => {
  return (
    <TourButton onClick={onClickTakeATour}>
      <TourButtonIcon src={ZombieFace} /> Take A Tour
    </TourButton>
  );
};

TakeATourButton.propTypes = {
  onClickTakeATour: func.isRequired
};

export default TakeATourButton;
