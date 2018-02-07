import React, { Component } from "react";
import { easing, keyframes, tween, css } from "popmotion";

const { createExpoIn } = easing;
const strongerEaseIn = createExpoIn(5);

const hiddenStyle = {
	visibility: "hidden"
};

const onceDifferent = (func, value) => {
	let memo = value;

	return newVal => {
		if (memo === newVal) return memo;

		func(newVal);

		memo = newVal;

		return memo;
	};
};

const diffRect = (a, b) => ({
	translateY: a.top - b.top,
	translateX: a.left - b.left,
	scaleY: a.height / b.height,
	scaleX: a.width / b.width
});

const invert = obj =>
	Object.keys(obj).reduce(
		(acc, curr) => ({ [curr]: obj[curr] * -1, ...acc }),
		{}
	);

class Morph extends Component {
	state = { objects: [] };
	elementFrom = {};
	elementTo = {};

	fadeInElements = [];
	fadeOutElements = [];

	fadeIn = options => ({
		ref: element => {
			element.style.willChange = "opacity";
			element.style.opacity = 0;
			this.fadeInElements.push({ element, options });
		}
	});

	fadeOut = options => ({
		ref: element => {
			element.style.willChange = "opacity";
			this.fadeOutElements.push({ element, options });
		}
	});

	from = (key, type) => ({
		ref: element => {
			element.style.willChange = "transform";
			this.elementFrom[key] = { element, type };
		}
	});

	to = (key, type) => ({
		ref: element => {
			element.style.visibility = "hidden";
			element.style.opacity = 0;
			element.style.willChange = "transform";
			this.elementTo[key] = { element, type };
		}
	});

	hiddenProps = () => {};
	play = index => {
		const duration = 600 * index;
		Object.keys(this.elementFrom).forEach(key => {
			const { element: original } = this.elementFrom[key];
			const { element: target } = this.elementTo[key];

			const originalRect = original.getBoundingClientRect();
			const targetRect = target.getBoundingClientRect();
			const clone = document.createElement("div");
			const originalClone = original.cloneNode(false);

			clone.appendChild(originalClone);

			const originalStyler = css(original);
			const cloneStyler = css(clone);
			const targetStyler = css(target);

			cloneStyler.set({
				position: "absolute",
				"transform-origin": "top left",
				top: originalRect.top,
				left: originalRect.left,
				width: originalRect.width,
				height: originalRect.height
			});

			document.body.appendChild(clone);

			originalStyler.set(hiddenStyle);

			const diffStyle = diffRect(targetRect, originalRect);

			const translateIn = keyframes({
				values: [
					{ translateX: 0, translateY: 0, scaleX: 1, scaleY: 1 },
					diffStyle
				],
				duration,
				easings: [easing.easeInOut]
			});

			const fadeOut = keyframes({
				values: [{ opacity: 1 }, { opacity: 0 }],
				duration: duration / 2,
				easings: [easing.linear],
				times: [0.8, 0.9]
			});

			targetStyler.set({
				"transform-origin": "top left",
				visibility: "visible"
			});

			// const translateFrom = keyframes({
			// 	values: [
				// 		{ ...diffRect(originalRect, targetRect) },
			// 		{ translateX: 0, translateY: 0, scaleX: 1, scaleY: 1}
			// 	],
			// 	duration,
			// 	easings: [easing.easeInOut]
			// });

			const fadeIn = keyframes({
				values: [{ opacity: 0 }, { opacity: 1 }],
				duration: duration / 2,
				easings: [easing.linear],
				// times: [0.8, 1]
			});

			// Clone.
			translateIn.start(cloneStyler.set);

			const fadeInOnce = onceDifferent((s) => {
				console.log('s: ', s);
				fadeIn.start(targetStyler.set);
				fadeOut.start(cloneStyler.set);
			});

			// Image bg fix.
			tween({
				from: diffStyle.scaleX,
				to: 1,
				easings: [easing.easeInOut],
				duration
			}).start(s => {
				originalClone.style.backgroundSize = `${s * 100}% 100%`;
				if (s === 1) return fadeInOnce(s);
			});

			// Target.
			// translateFrom.start(targetStyler.set);
		});

		this.fadeOutElements.map(({ element, options = {} }) => {
			tween({
				from: 1,
				to: 0,
				ease: easing.easeOut,
				duration,
				...options
			}).start(v => (element.style.opacity = v));
		});

		this.fadeInElements.map(({ element, options = {} }) => {
			tween({
				from: 0,
				to: 1,
				ease: easing.easeIn,
				duration,
				...options
			}).start(v => (element.style.opacity = v));
		});
	};

	render() {
		const renderedChildren = this.props.children({
			from: this.from,
			to: this.to,

			fadeIn: this.fadeIn,
			fadeOut: this.fadeOut,

			hiddenProps: this.hiddenProps,
			play: this.play
		});

		return renderedChildren && React.Children.only(renderedChildren);
	}
}

export default Morph;

