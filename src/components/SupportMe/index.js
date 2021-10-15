import React from 'react';
import { string } from 'prop-types';
import { KOFIT_CONFIG } from '../../setup/kofit';
import { SupportMeFrame } from './styles';

const SupportMe = ({ mode }) => {
  const { hidefeed, widget, embed, preview, title } = KOFIT_CONFIG;
  return (
    <SupportMeFrame
      id="kofiframe"
      src={`https://ko-fi.com/annabranco/?hidefeed=${hidefeed}&widget=${widget}&embed=${embed}&preview=${preview}`}
      title={title}
      mode={mode}
    />
  );
};

SupportMe.propTypes = {
  mode: string
};

SupportMe.defaultProps = {
  mode: null
};

export default SupportMe;
