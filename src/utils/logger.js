import {
  LOG_LEVEL_EXTENDED,
  LOG_TYPE_CORE,
  LOG_TYPE_ERROR,
  LOG_TYPE_EXTENDED,
  LOG_TYPE_INFO
} from '../constants/logs';

window.debuggerLog = [];

export const logger = (logType, message, ...args) => {
  const date = new Date();
  const formatDate = `${`00${date.getMonth() + 1}`.slice(
    -2
  )}/${`00${date.getDate()}`.slice(
    -2
  )}/${date.getFullYear()} ${`00${date.getHours()}`.slice(
    -2
  )}:${`00${date.getMinutes()}`.slice(-2)}:${`00${date.getSeconds()}`.slice(
    -2
  )}`;
  let level;
  let type;
  let color;

  switch (logType) {
    case LOG_TYPE_CORE:
      level = LOG_TYPE_INFO;
      type = LOG_TYPE_CORE;
      color = 'color: black; font-weight: bold;';
      break;

    case LOG_TYPE_EXTENDED:
      level = LOG_LEVEL_EXTENDED;
      type = LOG_TYPE_EXTENDED;
      color = 'color: teal; font-weight: bold;';
      break;

    case LOG_TYPE_ERROR:
      level = LOG_TYPE_ERROR;
      type = LOG_TYPE_ERROR;
      color = 'color: crimson; font-weight: bold;';
      break;

    default:
      level = LOG_TYPE_INFO;
      type = logType;
      color = 'color: rebeccapurple; font-weight: bold;';
      break;
  }

  window.debuggerLog.push(
    `[${type.toUpperCase()}] ${message}${
      args.length > 0
        ? `: ${args}`.replace(/\[object Object\]/g, '<>').replace(',', ', ')
        : ''
    } (${formatDate})`
  );

  if (window.gameDebug || logType === LOG_TYPE_CORE) {
    if (
      logType === LOG_TYPE_EXTENDED &&
      window.gameDebug !== LOG_TYPE_EXTENDED
    ) {
      return;
    }
    // eslint-disable-next-line no-console
    console[level](
      `%c[${type.toUpperCase()}] ${message} `,
      color,
      formatDate,
      ...args
    );
  }
};
