import React, { useState } from 'react';
import './travel.css';
import { useMorph, useMorphs, useFade } from 'react-morph/';
import { createEaseIn } from 'react-morph/easings';
import presets from 'react-morph/presets';

const strongerEase = createEaseIn(2);

const faces = [
  {
    username: 'brunnolou',
    src: 'https://avatars1.githubusercontent.com/u/2729225?s=460&v=4',
  },
  {
    username: 'lucalanca',
    src: 'https://avatars3.githubusercontent.com/u/389459?s=460&v=4',
  },
  {
    username: 'florianginetta',
    src: 'https://avatars3.githubusercontent.com/u/30113109?s=460&v=4',
  },
  {
    username: 'lejoe',
    src: 'https://avatars3.githubusercontent.com/u/1759?s=460&v=4',
  },
];

const spring = presets.noWobble;

const Travel = () => {
  const [toggle, go] = useState(false);
  const contentPlaceholderMorph = useMorph({
    spring,
    zIndex: 1,
    isReversed: !toggle,
    easings: strongerEase,
  });
  const coverMorph = useMorph({ spring, zIndex: 2 });
  const sepFade = useFade({ spring, isInitial: !toggle, zIndex: 4 });
  const titleMorph = useMorph({ spring, zIndex: 4 });
  const leftMorph = useMorph({ spring, zIndex: 4 });
  const rightMorph = useMorph({ spring, zIndex: 4 });
  const facesMorphs = useMorphs(faces, { spring, zIndex: 3 });
  const facesFades = faces.map(() =>
    useFade({ spring, isInitial: toggle, zIndex: 4 }),
  );

  return (
    <div className="container">
      <button onClick={() => go(!toggle)}>Toggle</button>
      {!toggle && (
        <a className="card" onClick={() => go(true)}>
          <div>
            <h1 className="card-title" {...titleMorph}>
              Zurich
            </h1>
          </div>
          <div
            {...coverMorph({
              style: { backgroundImage: 'url("/public/zurich.jpg")' },
            })}
            className="card-image"
          />

          <div className="card-footer">
            <span {...leftMorph}>
              <small className="c-white">Grossmünster</small>
            </span>
            <span {...rightMorph}>
              <small className="c-white">47.3769° N, 8.5417° E</small>
            </span>
          </div>
        </a>
      )}

      {!toggle && (
        <div className="card-content">
          <div
            className="card-content-placeholder"
            {...contentPlaceholderMorph}
          />
          <div />
          <div className="p1">
            <div {...sepFade}>
              <p className="separator t-left">
                Panorama Grossmünster limmat river
              </p>
            </div>

            <ul className="users">
              {faces.map(({ src, username }, index) => (
                <li className="users-item" key={`card-${username}`}>
                  <img
                    className="users-image"
                    src={src}
                    alt={username}
                    {...facesMorphs[index]}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {toggle && (
        <div className="details" onClick={() => go(false)}>
          <div
            className="details-image"
            role="img"
            {...coverMorph({
              style: { backgroundImage: 'url("/public/zurich.jpg")' },
            })}
          />

          <div className="details-title">
            <div className="details-toolbar card-footer">
              <small className="c-white" {...leftMorph}>
                Grossmünster
              </small>
              <small className="c-white" {...rightMorph}>
                47.3769° N, 8.5417° E
              </small>
            </div>

            <h1 className="card-title title-large" {...titleMorph}>
              Zurich
            </h1>
          </div>

          <div className="details-content">
            <div
              className="details-content-placeholder"
              {...contentPlaceholderMorph}
            />

            <ul>
              {faces.map(({ src, username }, index) => (
                <li className="users-item" key={`details-${username}`}>
                  <div className="m1">
                    <img
                      className="users-image users-image--lg"
                      src={src}
                      alt={username}
                      {...facesMorphs[index]}
                    />
                  </div>

                  <span key={`user-${username}`} {...facesFades[index]}>
                    {username}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Travel;
