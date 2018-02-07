import React from 'react';

const Component = () => (
  <div>
    <Morphos>
      {({ fade, move, scale, hiddenProps, play }) => (
        <div>
          <ul>
            <li ref={scale(1).from}>
              <a onClick={() => play(1)} ref={move(1).from} href="#1">
                One
              </a>
            </li>
            <li ref={scale(1).from}>
              <a onClick={() => play(1)} ref={move(2).from} href="#2">
                Two
              </a>
            </li>
          </ul>

          <div className="modal" {...hiddenProps}>
            <div ref={scale(1).to}>
              <h1 ref={move(1).to}>One</h1>
              <p ref={fade(1).to}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>

            <div ref={scale(2).to}>
              <h1 ref={move(2).to}>Two</h1>
              <p ref={fade(2).to}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </div>
      )}
    </Morphos>
  </div>
);

export default Component;
