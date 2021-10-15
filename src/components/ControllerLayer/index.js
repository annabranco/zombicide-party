import React from 'react';
import Logo from '../../assets/images/logo.png';
import { MainTitle, ZombicideLogo } from '../Home/styles';
import { Screen } from './styles';

const ControllerLayer = () => (
  <Screen>
    <ZombicideLogo src={Logo} blockedScreen />
    <MainTitle blockedScreen>PARTY</MainTitle>
  </Screen>
);

export default ControllerLayer;
