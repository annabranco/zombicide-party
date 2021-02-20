import React from 'react';
import Car from '../../../assets/images/car.png';
import {
  Bulb,
  CarImage,
  CruiserLight,
  InnerLight,
  LightBar,
  NightShiftOverlay,
  StrobeLight
} from './styles';

const NightShiftIntro = () => (
  <NightShiftOverlay>
    <CarImage src={Car} />
    <CruiserLight side="left" />
    <CruiserLight side="right" />
    <CruiserLight side="left" />
    <CruiserLight side="right" />
    <LightBar>
      {[...Array(3).keys()].map(order => (
        <StrobeLight color="blue" key={`blueLight${order}`} order={order}>
          <InnerLight />
          {[...Array(8).keys()].map(bulbOrder => (
            <Bulb color="blue" key={`blueBulb${bulbOrder}`} order={order} />
          ))}
        </StrobeLight>
      ))}
      {[...Array(2).keys()].map(order => (
        <StrobeLight color="white" key={`whiteLight${order}`}>
          <InnerLight delay />
          {[...Array(8).keys()].map(bulbOrder => (
            <Bulb center delay key={`whiteBulb${bulbOrder}`} />
          ))}
        </StrobeLight>
      ))}
      {[...Array(3).keys()].map(order => (
        <StrobeLight color="red" key={`redLight${order}`} order={order}>
          <InnerLight delay />
          {[...Array(8).keys()].map(bulbOrder => (
            <Bulb delay key={`redBulb${bulbOrder}`} order={order} />
          ))}
        </StrobeLight>
      ))}
    </LightBar>
  </NightShiftOverlay>
);

export default NightShiftIntro;
