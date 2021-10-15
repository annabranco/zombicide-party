import React from 'react';
import { func } from 'prop-types';
import { TourButton, TourButtonIcon } from './styles';
import ZombieFace from '../../assets/images/zombieFace.png';

const TakeATourButton = ({ goToNextTourStep }) => {
  return (
    <TourButton onClick={() => goToNextTourStep(0)}>
      <TourButtonIcon src={ZombieFace} /> Take A Tour
    </TourButton>
  );
};

TakeATourButton.propTypes = {
  goToNextTourStep: func.isRequired
};

export default TakeATourButton;
