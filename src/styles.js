import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const globalStyles = css`
  html,
  body,
  div,
  span,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  img,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  main,
  nav,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article,
  aside,
  details,
  div,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section {
    display: block;
    box-sizing: border-box;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  #root {
    width: 100vw;
  }
  body {
    background: #232222;
  }
  h1,
  h2,
  h3,
  h4 {
    font-family: 'Grandstander', cursive;
  }
  p. label {
    font-family: 'Cairo', sans-serif;
  }
`;

export const activeImage = css`
  filter: brightness(1.3);
`;

export const inactiveImage = css`
  filter: sepia(1) opacity(0.3);

  &:hover {
    filter: sepia(0.3) brightness(1.8) opacity(0.4) contrast(1.1) saturate(2);
  }
`;

export const activeZombie = css`
  filter: brightness(1);
`;

export const inactiveZombie = css`
  filter: sepia(1) opacity(0.3);

  &:hover {
    filter: sepia(0.3) brightness(1.6) opacity(0.6) contrast(1.1);
  }
`;
