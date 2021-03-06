import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';

// Police Lights adapted from the original of Sébastien THIBAUD
// https://codepen.io/DrSeb/pen/wzrQqp

const ANIMATION_SPEED = 500;
const LIGHTS_SIZE = 32;

const bulbGradient =
  'linear-gradient(155deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.14) 25%, rgba(255, 255, 255, 0.18) 49%, rgba(0, 0, 0, 0) 78%, rgba(0, 0, 0, 0.8) 100%)';

const bulbDimShadow = '0px 0px 3px  #222';
const bulbLitShadow = '0px 0px 10px 2px #fff';
const bulbLitShadowCenter = '0px 0px 10px 2px rgba(255,255,255,0.35)';

const LightsOff = css`
  background-color: #222;
  box-shadow: 0px 0px 0px 0px #000;
  border: 1px solid #111;
  opacity: 0;
`;

const LightsOn = (border, bg, shadow) => css`
  border: 1px solid ${border};
  background-color: ${bg};
  box-shadow: 0px 0px 60px 25px ${shadow};
  opacity: 1;
`;

const LightsOnCenter = (border, bg, shadow) => css`
  border: 1px solid ${border};
  background-color: ${bg};
  box-shadow: 0px 0px 50px 15px ${shadow};
  opacity: 1;
`;

const Strobe = (border, bg, shadow, center) => keyframes`
 0%, 25%    {
    ${LightsOff};
  }
  28%, 50%   {
    ${
      center ? LightsOnCenter(border, bg, shadow) : LightsOn(border, bg, shadow)
    };
    }
  52%, 55%º   {
    ${LightsOff};
  }
  57%, 69%   {
    ${
      center ? LightsOnCenter(border, bg, shadow) : LightsOn(border, bg, shadow)
    };
  }
  70%, 71%   {
    ${LightsOff};
  }
  72%, 75%   {
    ${
      center ? LightsOnCenter(border, bg, shadow) : LightsOn(border, bg, shadow)
    };
  }
  77%, 100%  {
    ${LightsOff};
  }
`;

const StrobeBulb = keyframes`
  0%, 25%    {
    background: ${bulbGradient};  box-shadow: ${bulbDimShadow}
  }
  28%, 50%   {
    background: white; box-shadow: ${bulbLitShadow}
  }
  52%, 55%   {
    background: ${bulbGradient}; box-shadow: ${bulbDimShadow}
  }
  57%, 69%   {
    background: white; box-shadow: ${bulbLitShadow}
  }
  70%, 71%   {
    background: ${bulbGradient}; box-shadow: ${bulbDimShadow}
  }
  72%, 75%   {
    background: white; box-shadow: ${bulbLitShadow}
  }
  77%, 100%  {
    background: ${bulbGradient}; box-shadow: ${bulbDimShadow}
  }
`;

const StrobeBulbCenter = keyframes`
  0%, 25%    {
    background: ${bulbGradient};  box-shadow: ${bulbDimShadow}
  }
  28%, 50%   {
    background: rgba(255,255,255,0.35); box-shadow: ${bulbLitShadowCenter}
  }
  52%, 55%   {
    background: ${bulbGradient}; box-shadow: ${bulbDimShadow}
  }
  57%, 69%   {
    background: rgba(255,255,255,0.35); box-shadow: ${bulbLitShadowCenter}
  }
  70%, 71%   {
    background: ${bulbGradient}; box-shadow: ${bulbDimShadow}
  }
  72%, 75%   {
    background: rgba(255,255,255,0.35); box-shadow: ${bulbLitShadowCenter}
  }
  77%, 100%  {
    background: ${bulbGradient}; box-shadow: ${bulbDimShadow}
  }
`;

export const BottomLight = styled.div`
  label: BottomLight;
  position: absolute;
  top: 235px;
`;
BottomLight.displayName = 'BottomLight';

export const Bulb = styled.span`
  label: Bulb;
  display: inline-block;
  position: relative;
  box-shadow: 0px 0px 3px #222;
  border-radius: 50%;
  line-height: 0.2;
  height: ${`${LIGHTS_SIZE / 20}px`};
  width: ${`${LIGHTS_SIZE / 20}px`};
  z-index: 999;
  animation-duration: ${`${ANIMATION_SPEED + 80}ms`};
  animation-iteration-count: infinite;
  background: ${bulbGradient};

  ${({ delay }) =>
    delay &&
    css`
      animation-delay: ${`${ANIMATION_SPEED / 2 + 40}ms`};
    `}

  ${({ center }) =>
    center &&
    css`
      animation: none;
      background: rgba(255, 255, 255, 0.5);
      box-shadow: 0px 0px 20px 8px rgba(255, 255, 255, 0.5);
    `}

  ${({ order }) => {
    if (order === 0) {
      return css`
        animation-name: ${StrobeBulb};
      `;
    }
    if (order === 1) {
      return css`
        animation-name: ${StrobeBulbCenter};
      `;
    }
    if (order === 2) {
      return css`
        animation-name: ${StrobeBulb};
      `;
    }
    return null;
  }}

  @media all and (min-width: 701px) {
    height: ${`${LIGHTS_SIZE / 5}px`};
    width: ${`${LIGHTS_SIZE / 5}px`};
    animation-duration: ${`${ANIMATION_SPEED}ms`};

    ${({ delay }) =>
      delay &&
      css`
        animation-delay: ${`${ANIMATION_SPEED / 2}ms`};
      `}
  }

  ${({ order }) => {
    if (order === 0) {
      return css`
        z-index: 12;
      `;
    }
    if (order === 1) {
      return css`
        animation-name: ${StrobeBulbCenter};
        z-index: 12;
      `;
    }
    if (order === 2) {
      return css`
        z-index: 12;
      `;
    }
    return null;
  }}
`;
Bulb.displayName = 'Bulb';

export const CarImage = styled.img`
  label: CarImage;
  display: none;
  width: 30%;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translate(-50%, 0);
  filter: brightness(0.5);

  @media all and (min-width: 1200px) {
    display: block;
  }

  @media all and (min-width: 1400px) {
    width: 480px;
  }
`;
CarImage.displayName = 'CarImage';

export const CruiserLight = styled.div`
  label: CruiserLight;
  height: 27px;
  width: 45px;
  position: absolute;
  top: 135px;
  left: 50%;
  transform: translate(-50%, 0) rotate(13deg);
  margin-left: -80px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 240, 0.85);
  box-shadow: 0px 0px 70px 45px rgba(255, 255, 240, 0.85);
  opacity: 0.8;
  z-index: 10;
  filter: blur(5px) opacity(0.8);

  ${({ side }) =>
    side === 'right' &&
    css`
      margin-left: 80px;
      transform: translate(-50%, 0) rotate(-13deg);
    `}

  @media all and (min-width: 701px) {
    top: 235px;
    height: 45px;
    width: 90px;
    margin-left: -160px;

    ${({ side }) =>
      side === 'right' &&
      css`
        margin-left: 160px;
        transform: translate(-50%, 0) rotate(-13deg);
      `}
  }

  @media all and (min-width: 1200px) {
    top: 195px;

    margin-left: -110px;

    ${({ side }) =>
      side === 'right' &&
      css`
        margin-left: 110px;
        transform: translate(-50%, 0) rotate(-13deg);
      `}
  }

  @media all and (min-width: 1400px) {
    top: 235px;
    margin-left: -160px;

    ${({ side }) =>
      side === 'right' &&
      css`
        margin-left: 160px;
        transform: translate(-50%, 0) rotate(-13deg);
      `}
  }
`;
CruiserLight.displayName = 'CruiserLight';

export const InnerLight = styled.div`
  label: InnerLight;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;
  top: -1px;
  left: -1px;
  border-radius: 6px;
  border: 1px solid transparent;
  opacity: 0;

  ${({ delay }) =>
    delay &&
    css`
      animation-delay: ${`${ANIMATION_SPEED / 2 + 40}ms`};
    `}

  @media all and (min-width: 701px) {
    ${({ delay }) =>
      delay &&
      css`
        animation-delay: ${`${ANIMATION_SPEED / 2}ms`};
      `}
  }
`;
InnerLight.displayName = 'InnerLight';

export const LightBar = styled.div`
  label: LightBar;
  position: absolute;
  padding: 2px 5px;
  top: 50px;
  margin: 0 auto;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &:after {
    top: 0;
    left: 0;
    position: absolute;
    z-index: 10000;
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 3px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.24) 0%,
      rgba(255, 255, 255, 0.24) 1%,
      rgba(255, 255, 255, 0.14) 43%,
      rgba(255, 255, 255, 0) 58%,
      rgba(255, 255, 255, 0) 100%
    );
  }
`;
LightBar.displayName = 'LightBar';

export const NightShiftOverlay = styled.div`
  label: NightShiftOverlay;
  position: relative;
  height: 100%;
  width: 100%;
  background: none;
  border: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
NightShiftOverlay.displayName = 'NightShiftOverlay';

export const StrobeLight = styled.div`
  label: StrobeLight;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: ${LIGHTS_SIZE > 150 && `${LIGHTS_SIZE / 25}px`};
  width: ${`${LIGHTS_SIZE / 1.6}px`};
  height: ${`${LIGHTS_SIZE / 4}px`};
  line-height: ${`${LIGHTS_SIZE / 12}px`};
  background-color: #222;
  border-top: 2px solid #111;
  border-right: 1px solid #333;
  border-bottom: 1px solid #333;
  border-left: 2px solid #111;
  border-radius: 6px;
  animation-duration: ${`${ANIMATION_SPEED + 80}ms`};
  animation-name: light;
  animation-iteration-count: infinite;
  display: inline-block;

  ${({ color }) => {
    if (color === 'red') {
      return css`
        animation-name: ${Strobe('#ee2819', '#ff3c2d', '#ff4444')};
        animation-delay: ${`${ANIMATION_SPEED + 40}ms`};
      `;
    }
    if (color === 'blue') {
      return css`
        animation-name: ${Strobe('#139eff', '#66d2ff', '#0078ff')};
      `;
    }
    if (color === 'white') {
      return css`
        animation: none;
      `;
    }
    return null;
  }}

  ${({ color, order }) => {
    if (order === 0) {
      return css`
        z-index: 11;
      `;
    }
    if (order === 1) {
      if (color === 'red') {
        return css`
          animation-name: ${Strobe('#ee2819', '#ff3c2d', '#ff4444', 'center')};
          z-index: 12;
        `;
      }
      return css`
        animation-name: ${Strobe('#139eff', '#66d2ff', '#0078ff', 'center')};
        z-index: 12;
      `;
    }
    if (order === 2) {
      return css`
        z-index: 11;
      `;
    }
    return null;
  }}

  @media all and (min-width: 701px) {
    padding-top: ${LIGHTS_SIZE > 150 && `${LIGHTS_SIZE / 25}px`};
    width: ${`${LIGHTS_SIZE}px`};
    height: ${`${LIGHTS_SIZE / 1.6}px`};
    line-height: ${`${LIGHTS_SIZE / 6}px`};
    animation-duration: ${`${ANIMATION_SPEED}ms`};
    animation-delay: ${({ color }) =>
      color === 'red' && `${ANIMATION_SPEED / 2}ms`};
  }
`;
StrobeLight.displayName = 'StrobeLight';
