import {
  FIRST_TIME,
  LOCAL_STORAGE_TOUR_KEY,
  NO_THANKS,
  START_TOUR,
  TAKE_A_TOUR,
  TAKE_IT_ANYWAY,
  TOUR_WARNING,
  WANNA_LEARN,
  WARNING_TITLE
} from '../../constants';

export const FIRST_TIME_MODAL = {
  title: FIRST_TIME,
  message: WANNA_LEARN,
  primaryButton: TAKE_A_TOUR,
  secondaryButton: NO_THANKS,
  onClickPrimary: () => {
    localStorage.setItem(LOCAL_STORAGE_TOUR_KEY, NO_THANKS);
    return START_TOUR;
  },
  onClickSecondary: () =>
    localStorage.setItem(LOCAL_STORAGE_TOUR_KEY, NO_THANKS)
};

export const TOUR_WARNING_MODAL = onClick => ({
  title: WARNING_TITLE,
  message: TOUR_WARNING,
  messageSpan: 80,
  primaryButton: TAKE_IT_ANYWAY,
  primaryButtonType: 'go-on',
  onClickPrimary: onClick,
  closeWhenClickOutside: true
});
