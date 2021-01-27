import React from 'react';
import { string } from 'prop-types';
import Logo from '../../assets/images/logo.png';
import { MainTitle, ZombicideLogo } from '../MainMenu/styles';
import { Screen } from './styles';

const ControllerLayer = ({ key }) => {
  return (
    <Screen>
      <ZombicideLogo src={Logo} blockedScreen />
      <MainTitle blockedScreen>PARTY</MainTitle>
    </Screen>
  );
};

ControllerLayer.propTypes = {
  key: string
};

ControllerLayer.defaultProps = {
  key: undefined
};

export default ControllerLayer;
