import React from 'react';

export const H1Block = () => (
  <h1
    style={{
      border: '3px dotted red',
    }}
  >
    This is an h1
  </h1>
);

export const H1Inline = () => (
  <h1
    style={{
      border: '3px dotted red',
			display: 'inline-block',
    }}
  >
    This is an h1
  </h1>
);
