import { DESKTOP, MOBILE, TABLET } from '../constants';

export const getMediaQuery = () => {
  if (typeof window !== 'undefined' && window.document) {
    if (window.innerWidth < 768) {
      return MOBILE;
    }
    if (window.innerWidth < 1200) {
      return TABLET;
    }
  }
  return DESKTOP;
};
