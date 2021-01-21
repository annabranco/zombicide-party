import { css, keyframes } from '@emotion/core';

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
    font-family: Crackhouse, 'Grandstander', cursive;
  }
  p. label {
    font-family: 'Cairo', sans-serif;
  }
  &::-webkit-scrollbar {
    width: 10px;
    background: red;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background: linear-gradient(90deg, #434343, #434343 1px, #111 0, #111);
  }
  ::-webkit-scrollbar-thumb {
    background: #434343;
    border-radius: 16px;
    box-shadow: inset 2px 2px 2px hsla(0, 0%, 100%, 0.25),
      inset -2px -2px 2px rgba(0, 0, 0, 0.25);
  }
`;

export const activeImage = css`
  filter: brightness(1.3) opacity(1);
`;

export const inactiveImage = css`
  filter: sepia(1) opacity(0.6);

  &:hover {
    filter: sepia(0.3) brightness(1.5) opacity(0.7) contrast(1.2) saturate(2);
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

export const Appear = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
