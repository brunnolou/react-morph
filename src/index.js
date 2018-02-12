import React, { Component } from 'react';
import { spring, easing, value, keyframes, tween, css } from 'popmotion';

const { createExpoIn } = easing;
const strongerEaseIn = createExpoIn(5);

const hiddenStyle = {
  visibility: 'hidden',
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
  scaleX: a.width / b.width,
});

const invert = obj =>
  Object.keys(obj).reduce(
    (acc, curr) => ({ [curr]: obj[curr] * -1, ...acc }),
    {},
  );

class Morph extends Component {
  state = { objects: [] };
  elementFrom = {};
  elementTo = {};

  fadeInElements = [];
  fadeOutElements = [];

  fadeIn = options => ({
    ref: element => {
      element.style.willChange = 'opacity';
      element.style.opacity = 0;
      this.fadeInElements.push({ element, options });
    },
  });

  fadeOut = options => ({
    ref: element => {
      element.style.willChange = 'opacity';
      this.fadeOutElements.push({ element, options });
    },
  });

  from = (key, options) => ({
    ref: element => {
      element.style.willChange = 'transform';
      this.elementFrom[key] = { element, options };
    },
  });

  to = (key, options) => ({
    ref: element => {
      element.style.visibility = 'hidden';
      element.style.opacity = 0;
      element.style.willChange = 'transform';
      this.elementTo[key] = { element, options };
    },
  });

  isPlaying = false;
  timeline = [];

  hiddenProps = () => {};

  progress = value(0, this.seek);

  options = {
    stiffness: 500,
    mass: 5,
    damping: 300,
  };

  go = (to, options = {}) => {
    spring({
      from: this.progress.get(),
      to,
      ...this.options,
      ...options,
    }).start(x => {
      this.progress.update(x);
      this.seek(x);
    });
  };

  seek = t => {
    this.timeline.forEach(x => x.seek(t));
  };

  init = index => {
    if (this.timeline.length) return this.go(1);

    const duration = 1000 * index;
    Object.keys(this.elementFrom).forEach(key => {
      const { element: original, options } = this.elementFrom[key];
      const { element: target } = this.elementTo[key];

      const originalRect = original.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const originalCloneContainer = document.createElement('div');
      const originalClone = original.cloneNode(true);

      originalCloneContainer.appendChild(originalClone);

      const originalStyler = css(original);
      console.log('original: ', original);
      const cloneStyler = css(originalCloneContainer);
      const targetStyler = css(target);

      cloneStyler.set({
        position: 'absolute',
        transformOrigin: 'top left',
        pointerEvents: 'none',
        top: originalRect.top,
        left: originalRect.left,
        width: originalRect.width,
        height: originalRect.height,
        ...options,
      });

      document.body.appendChild(originalCloneContainer);

      const hide = styler => t =>
        styler.set({ opacity: t, visibility: t ? 'visible' : 'hidden' });

      const hiddenTransition = keyframes({
        values: [1, 0],
        times: [0, 0.1],
        easings: easing.linear,
      });

      const diffStyle = diffRect(targetRect, originalRect);

      const translateIn = keyframes({
        values: [
          { translateX: 0, translateY: 0, scaleX: 1, scaleY: 1 },
          diffStyle,
        ],
        easings: easing.linear,
      });

      const fadeOut = keyframes({
        values: [{ opacity: 1 }, { opacity: 0 }],
        easings: easing.linear,
        times: [0.9, 1],
      });

      targetStyler.set({
        'transform-origin': 'top left',
        visibility: 'visible',
      });

      const diffTargetStyles = diffRect(originalRect, targetRect);

      const translateFrom = keyframes({
        values: [
          { ...diffTargetStyles },
          { translateX: 0, translateY: 0, scaleX: 1, scaleY: 1 },
        ],
        easings: easing.linear,
      });

      const fadeIn = keyframes({
        values: [{ opacity: 0 }, { opacity: 1 }],
        easings: easing.linear,
        // times: [0.9, 1]
      });

      // const fadeInOnce = onceDifferent(s => {
      // 	console.log("s: ", s);
      // 	fadeIn.start(targetStyler.set);
      // });
      // fadeOut.start(cloneStyler.set);

      // Image bg fix.
      const bgFix = tween({
        from: diffTargetStyles.scaleX * 1000,
        to: 100,
        easings: easing.linear,
      })
        .start(s => {
          // if (key === 'cover') console.log('s: ', s);
          originalClone.style.backgroundSize = `${s}% 100%`;
        })
        .pause();

      // tween({
      // 	from: diffTargetStyles.scaleY * 1000,
      // 	to: 100,
      // 	easings: easing.linear,
      // 	duration
      // }).start(s => {
      // 	target.style.backgroundSize = `100% ${s}% `;
      // });

      this.timeline.push(
        ...[
          hiddenTransition.start(hide(originalStyler)).pause(),
          // original.
          translateIn.start(cloneStyler.set).pause(),
          fadeOut.start(cloneStyler.set).pause(),
          // Target.
          fadeIn.start(targetStyler.set).pause(),
          translateFrom.start(targetStyler.set).pause(),
          bgFix,
        ],
      );

      this.isPlaying = true;
    });

    const fadeOuts = this.fadeOutElements.map(({ element, options = {} }) =>
      tween({
        from: 1,
        to: 0,
        ease: easing.linear,
        duration: duration / 2,
        ...options,
      }).start(v => (element.style.opacity = v)),
    );

    const fadeIns = this.fadeInElements.map(({ element, options = {} }) =>
      keyframes({
        values: [0, 1],
        easings: easing.strongerEaseIn,
        times: [0.8, 0.9],
      })
        .start(v => (element.style.opacity = v))
        .pause(),
    );

    this.timeline = [...fadeOuts, ...fadeIns, ...this.timeline];

    this.go(1);
  };

  render() {
    const renderedChildren = this.props.children({
      from: this.from,
      to: this.to,

      fadeIn: this.fadeIn,
      fadeOut: this.fadeOut,

      back: this.back,
      seek: this.seek,
      go: this.go,

      hiddenProps: this.hiddenProps,
      init: this.init,
    });

    return renderedChildren && React.Children.only(renderedChildren);
  }
}

export default Morph;
