import React, { Component } from "react";
import ReactMorph from "./lib";
import "./App.css";
import { easing } from "popmotion";

const { createExpoIn, easeIn } = easing;

const strongerEase = createExpoIn(3);

// Create a new spring
class App extends Component {
  state = { simple: true };
  faces = [
    {
      username: "brunnolou",
      src: "https://avatars1.githubusercontent.com/u/2729225?s=460&v=4"
    },
    {
      username: "lucalanca",
      src: "https://avatars3.githubusercontent.com/u/389459?s=460&v=4"
    },
    {
      username: "florianginetta",
      src: "https://avatars3.githubusercontent.com/u/30113109?s=460&v=4"
    },
    {
      username: "lejoe",
      src: "https://avatars3.githubusercontent.com/u/1759?s=460&v=4"
    }
  ];

  render() {
    return (
      <ReactMorph spring={{ stiffness: 170, damping: 26 }}>
        {({
          state,
          fadeIn,
          fadeOut,
          from,
          go,
          hiddenProps,
          hide,
          progress,
          seek,
          to
        }) => (
          <div className="container">
            <a className="card" {...hide()} onClick={() => go(1)}>
              <div>
                <h1 className="card-title" {...from("title", { zIndex: 4 })}>
                  Zurich
                </h1>
              </div>
              <div
                {...from("cover", { zIndex: 2 })}
                className="card-image"
                style={{ backgroundImage: 'url("./zurich.jpg")' }}
                alt="Zurich landscape"
              />

              <div className="card-footer">
                <span {...from("left", { zIndex: 4 })}>
                  <small className="c-white">Grossmünster</small>
                </span>
                <span {...from("right", { zIndex: 4 })}>
                  <small className="c-white">47.3769° N, 8.5417° E</small>
                </span>
              </div>
            </a>

            <div className="card-content">
              <div
                className="card-content-placeholder"
                {...from("content-placeholder", {
                  zIndex: 1,
                  easing: strongerEase
                })}
              />
              <div />
              <div className="p1">
                <p className="separator t-left" {...from("sep", { zIndex: 3 })}>
                  Panorama Grossmünster limmat river
                </p>

                <ul className="users">
                  {this.faces.map(({ src, username }) => (
                    <li className="users-item" key={`card-${username}`}>
                      <img
                        className="users-image"
                        src={src || "./brunnolou.jpg"}
                        alt={username}
                        {...from("user-" + username, {
                          zIndex: 3,
                          getMargins: false,
                          easing: easeIn
                        })}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="details" onClick={() => go(0)}>
              <div
                className="details-image"
                style={{ backgroundImage: 'url("./zurich.jpg")' }}
                role="img"
                alt="Zurich landscape"
                {...to("cover")}
              />

              <div className="details-title">
                <div className="details-toolbar card-footer">
                  <small {...to("left")}>Grossmünster</small>
                  <small {...to("right")}>47.3769° N, 8.5417° E</small>
                </div>

                <h1 className="card-title" {...to("title")}>
                  Zurich
                </h1>
              </div>

              <div className="details-content">
                <div
                  className="details-content-placeholder"
                  {...to("content-placeholder")}
                />
                <div className="center l-flex">
                  <span {...to("sep")}> </span>
                </div>

                <ul>
                  {this.faces.map(({ src, username }, index) => (
                    <li className="users-item" key={`details-${username}`}>
                      <img
                        className="users-image users-image--lg"
                        src={src || "./brunnolou.jpg"}
                        alt={username}
                        {...to("user-" + username)}
                      />

                      <span {...fadeIn()}>{username}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <input
              type="range"
              defaultValue="100"
              onChange={({ target: { value } }) => go(value / 100)}
              step="0.01"
              style={{
                position: "absolute",
                zIndex: 9999,
                bottom: 10,
                width: "90%"
              }}
            />
          </div>
        )}
      </ReactMorph>
    );
  }
}

export default App;
