import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { withStyles } from '@material-ui/core/styles';

import Switch from '@material-ui/core/Switch';

export const ConfigWrapper = styled.div`
  label: ConfigWrapper;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 90%;
`;
ConfigWrapper.displayName = 'ConfigWrapper';

export const ConfigSection = styled.div`
  label: ConfigSection;
  position: relative;
  background: yellow;
  width: 100%;
  margin: 0 20px;
  padding: 10px;
  border-radius: 10px;
  height: 50vh;
  background: hsla(0, 0%, 100%, 0.2) border-box;
  border-radius: 0.4em;
  box-shadow: 0 0 0 0.1em hsla(0, 0%, 100%, 0.1) inset;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    -webkit-filter: blur(40px);
    filter: blur(40px);
  }

  &:last-of-type {
    width: 200%;
  }
`;
ConfigSection.displayName = 'ConfigSection';

export const ConfigTitle = styled.h2`
  label: ConfigTitle;
  position: absolute;
  top: 20px;
  color: white;
  font-size: 2rem;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Grandstander', cursive;
`;
ConfigTitle.displayName = 'ConfigTitle';

export const Cover = styled.img`
  label: Cover;
  width: 80%;
  cursor: pointer;
  filter: sepia(1) contrast(2.5) brightness(0.5) opacity(0.5);

  ${({ medium }) =>
    medium &&
    css`
      width: 40%;
      margin: 0 20px;
    `};

  ${({ active }) =>
    active &&
    css`
      filter: saturate(1.2) brightness(1.2);
    `};
`;
Cover.displayName = 'Cover';

export const CoverLabel = styled.p`
  label: CoverLabel;
  position: absolute;
  bottom: 20px;
  color: white;
  font-size: 1.3rem;
  text-align: center;
  font-family: 'Cairo', sans-serif;
`;
CoverLabel.displayName = 'CoverLabel';

export const CoversWrapper = styled.div`
  label: CoversWrapper;
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
CoversWrapper.displayName = 'CoversWrapper';

export const RuleSwitch = withStyles({
  switchBase: {
    color: 'gray',
    '&$checked': {
      color: 'green'
    },
    '&$checked + $track': {
      backgroundColor: 'darkgreen'
    }
  },
  checked: {},
  track: {}
})(Switch);

export const RulesWrapper = styled.div`
  label: RulesWrapper;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  color: white;
  font-family: 'Grandstander', cursive;
`;
RulesWrapper.displayName = 'RulesWrapper';
