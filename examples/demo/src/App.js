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

	// 	<ul>
	// 	<li>
	// 		<a onClick={() => play(1)} {...from(1, "move")} href="#1">
	// 			One
	// 		</a>
	// 	</li>
	// 	<li>
	// 		<a onClick={() => play(2)} {...from(2, "move")} href="#2">
	// 			Two
	// 		</a>
	// 	</li>
	// </ul>
	// <a
	// 	onClick={() => play(3)}
	// 	{...from(3, "move")}
	// 	href="#3"
	// 	className="accelerated"
	// />

	// <div
	// 	className="modal"
	// 	{...hiddenProps}
	// 	style={{ position: "relative" }}
	// >
	// 	<img
	// 		className="accelerated"
	// 		style={{ position: "absolute" }}
	// 		{...to(3)}
	// 		src="http://ginetta.cockpit.rocks/frontendtf/api/cockpit/image?token=5e7be6f3bba4c820bb79f11c430a69&d=1&src=filmcoopi.jpg&w=1024&o=1"
	// 		alt="thumb"
	// 	/>

	// 	<div>
	// 		<h1>
	// 			<a {...to(1)} href="#back">
	// 				One
	// 			</a>
	// 		</h1>
	// 		{/* <p {...to(1)}> */}
	// 		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
	// 	</div>

	// 	<div>
	// 		<h1>
	// 			<a {...to(2)} href="#back">
	// 				Two
	// 			</a>
	// 		</h1>
	// 		{/* <p {...to(2, "fade")}> */}
	// 		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
	// 	</div>
	// </div>

	// render() {
	// 	return (
	// 		<div className="App">
	// 			<header className="App-header">
	// 				<img src={logo} className="App-logo" alt="logo" />
	// 				<h1 className="App-title">Welcome to React</h1>
	// 			</header>

	// 			<button
	// 				onClick={() => this.spring.updateConfig({
	// 					toValue: 1000 * Math.random(),
	// 					damping: 100 * Math.random(),
	// 					stiffness: 1000 * Math.random()
	// 				}).start()}
	// 			>
	// 				Update
	// 			</button>

	// 			<p {...this.init} className="App-intro">
	// 				To get started, edit <code>src/App.js</code> and save to reload.
	// 			</p>
	// 		</div>
	// 	);
	// }
}

export default App;
