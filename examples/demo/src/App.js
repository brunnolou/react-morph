import React, { Component } from "react";
import ReactMorph from "./Morph";
import "./App.css";

// Create a new spring
class App extends Component {
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
			<div>
				<ReactMorph>
					{({
						from,
						to,
						fadeIn,
						fadeOut,
						hiddenProps,
						go,
						init,
						seek
					}) => (
						<div className="container">
							<a className="card" onClick={() => init(1)}>
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
									<small className="c-white" {...from("left", { zIndex: 4 })}>
										Grossmünster
									</small>
									<small className="c-white" {...from("right", { zIndex: 4 })}>
										47.3769° N, 8.5417° E
									</small>
								</div>
							</a>

							<div className="card-content">
								<div
									className="card-content-placeholder"
									{...from("content-placeholder", { zIndex: 1 })}
								/>
								<div />
								<div className="p1">
									<p className="separator" {...fadeOut()}>
										Panorama Grossmünster limmat river
									</p>

									<ul className="users">
										{this.faces.map(({ src, username }) => (
											<li className="users-item" key={`card-${username}`}>
												<img
													className="users-image"
													src={src}
													alt={username}
													{...from("user-" + username, { zIndex: 3 })}
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
									role="picture"
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
									<ul>
										{this.faces.map(({ src, username }) => (
											<li className="users-item" key={`details-${username}`}>
												<img
													className="users-image users-image--lg"
													src={src}
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
								style={{ position: "absolute", zIndex: 999999, bottom: 0 }}
							/>
						</div>
					)}
				</ReactMorph>
			</div>
		);
	}
}

export default App;
