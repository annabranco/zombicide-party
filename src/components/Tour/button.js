import React from 'react';
import { func } from 'prop-types';
import ZombieFace from '../../assets/images/zombieFace.png';
import { TourButton, TourButtonIcon } from './styles';

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
