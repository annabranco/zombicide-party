import React from 'react';
import {
  Bulb,
  InnerLight,
  LightBar,
  NightShiftOverlay,
  StrobeLight,
  CarImage,
  CruiserLight
} from './styles';
import Car from '../../../assets/images/car.png';

const NightShiftIntro = () => (
  <NightShiftOverlay>
    <CarImage src={Car} />
    <CruiserLight side="left" />
    <CruiserLight side="right" />
    <CruiserLight side="left" />
    <CruiserLight side="right" />
    <LightBar>
      {[...Array(3).keys()].map(order => (
        <StrobeLight color="blue" key={`blueLight${order}`}>
          <InnerLight />
          {[...Array(18).keys()].map(bulbOrder => (
            <Bulb key={`blueBulb${bulbOrder}`} />
          ))}
        </StrobeLight>
      ))}
      {[...Array(3).keys()].map(order => (
        <StrobeLight color="red" key={`redLight${order}`}>
          <InnerLight delay />
          {[...Array(18).keys()].map(bulbOrder => (
            <Bulb delay key={`redBulb${bulbOrder}`} />
          ))}
        </StrobeLight>
      ))}
    </LightBar>
  </NightShiftOverlay>
);

export default NightShiftIntro;
