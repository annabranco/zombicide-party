/* eslint-disable no-plusplus */
import React, { useEffect, useRef } from 'react';
import { bool, string, oneOfType } from 'prop-types';
import { Fog } from './styles';
import FogImage from '../../assets/images/fog.png';

/* FogEffect adapted from the original Particule Fog Generator
   created by David Burrell
   https://codepen.io/dburrell/details/RNpgRg
*/

const FogEffect = ({ inChar }) => {
  const CanvasElement = useRef();
  const fogAnimationTimer = useRef();

  const canvasHeight = 200;
  const pCollection = [];
  const puffs = 1;
  const particlesPerPuff = 1000;
  const smokeImage = new Image();
  let pCount = 0;

  const randBetween = (n1, n2) => {
    const r = Math.random() * (n2 - n1) + n1;
    return r;
  };

  const addNewParticle = delay => {
    const p = {};
    p.inChar = canvasHeight;
    p.left = randBetween(-200, 800);

    p.start = new Date().getTime() + delay;
    p.life = 8000;
    p.speedUp = 30;

    p.speedRight = randBetween(0, 20);

    p.rot = randBetween(-1, 1);
    p.red = Math.floor(randBetween(0, 255));
    p.blue = Math.floor(randBetween(0, 255));
    p.green = Math.floor(randBetween(0, 255));

    p.starinCharacity = 0.3;
    p.newinChar = p.inChar;
    p.newLeft = p.left;
    p.size = 200;
    p.growth = 10;

    pCollection[pCount] = p;
    pCount++;
  };

  const draw = (startT, totalT) => {
    // Timing
    let stillAlive = false;
    if (CanvasElement.current) {
      // Grab and clear the canvas
      const ctx = CanvasElement.current.getContext('2d');
      ctx.clearRect(
        0,
        0,
        CanvasElement.current.width,
        CanvasElement.current.height
      );

      // Loop through particles
      for (let i = 0; i < pCount; i++) {
        // Grab the particle
        const p = pCollection[i];

        // Timing
        const td = new Date().getTime() - p.start;
        const frac = td / p.life;

        if (td > 0) {
          if (td <= p.life) {
            stillAlive = true;
          }

          // attributes that change over time
          const newinChar = p.inChar - p.speedUp * (td / 1000);
          const newLeft = p.left + p.speedRight * (td / 1000);
          const newOpacity = Math.max(p.starinCharacity * (1 - frac), 0);

          const newSize = p.size + p.growth * (td / 1000);
          p.newinChar = newinChar;
          p.newLeft = newLeft;

          // Draw!
          ctx.fillStyle = `rgba(150,150,150,${newOpacity})`;
          ctx.globalAlpha = newOpacity;
          ctx.drawImage(smokeImage, newLeft, newinChar, newSize, newSize);
        }
      }
    }

    // Repeat if there's still a living particle
    if (stillAlive) {
      requestAnimationFrame(() => {
        draw(startT, totalT);
      });
    }
  };

  useEffect(() => {
    const startAnimation = () => {
      smokeImage.src = FogImage;

      for (let i1 = 0; i1 < puffs; i1++) {
        const puffDelay = i1 * 300;

        for (let i2 = 0; i2 < particlesPerPuff; i2++) {
          addNewParticle(i2 * 50 + puffDelay);
        }
      }
      draw(new Date().getTime(), 3000);
    };

    fogAnimationTimer.current = setInterval(() => {
      startAnimation();
    }, 60000);
    startAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inChar]);

  useEffect(() => {
    return () => clearInterval(fogAnimationTimer.current);
  }, []);

  return <Fog ref={CanvasElement} height="200" width="800" inChar={inChar} />;
};

FogEffect.propTypes = {
  inChar: oneOfType([bool, string])
};

FogEffect.defaultProps = {
  inChar: null
};

export default FogEffect;
