import React, { Component } from 'react';
import propTypes from 'prop-types';
import keyframe from 'keyframe';
import {
  css,
  easing,
  keyframes,
  spring,
  tween,
  value,
  transform,
} from 'popmotion';
import { interpolateObject } from './util';

const { createExpoIn } = easing;
const { pipe } = transform;
const strongerEaseIn = createExpoIn(50);

const getBox = elm => {
  const box = elm.getBoundingClientRect();
  return {
    top: box.top + window.scrollY,
    left: box.left + window.scrollX,
    width: box.width,
    height: box.height,
  };
};

const fadeOutTween = ({ element, options = {} }) =>
  tween({
    from: 1,
    to: 0,
    ease: easing.linear,
    ...options,
  }).start(v => {
    element.style.opacity = v;
    if (v === 1) element.style.pointerEvents = 'all';
  });

const fadeInTween = ({ element, options = {} }) =>
  keyframes({
    values: [{ opacity: 0 }, { opacity: 1 }],
    easings: easing.linear,
    times: [0.8, 1],
    ...options,
  })
    .start(style => {
      const styler = css(element);

      styler.set(style);

      if (style.opacity === 1) element.style.pointerEvents = 'all';
    })
    .pause();

const hideTween = ({ element, options = {} }) => ({
  seek: pipe(Math.round, t => {
    element.style.visibility = t > 0 ? 'hidden' : 'visible';
  }),
});

const hide = styler => t =>
  styler.set({
    opacity: t,
    visibility: t > 0 ? 'visible' : 'hidden',
  });

const diffRect = (a, b) => ({
  translateY: a.top - b.top,
  translateX: a.left - b.left,
  scaleY: a.height / b.height,
  scaleX: a.width / b.width,
});

class Morph extends Component {
  static propTypes = {
    children: propTypes.func.isRequired,
    spring: propTypes.shape({
      stiffness: propTypes.number.isRequired,
      mass: propTypes.number.isRequired,
      damping: propTypes.number.isRequired,
    }),
  };

  static defaultProps = {
    spring: {
      stiffness: 500,
      mass: 5,
      damping: 300,
    },
  };

  elementFrom = {};
  elementTo = {};

  hideElements = [];
  fadeInElements = [];
  fadeOutElements = [];

  isPlaying = false;
  timeline = [];

  hide = options => ({
    ref: elm => {
      const element = elm;
      this.hideElements.push({ element, options });
    },
  });

  progress = value(0, this.seek);

  fadeIn = options => ({
    ref: elm => {
      const element = elm;
      element.style.willChange = 'opacity';
      element.style.pointerEvents = 'none';
      element.style.opacity = 0;
      this.fadeInElements.push({ element, options });
    },
  });

  fadeOut = options => ({
    ref: elm => {
      const element = elm;
      element.style.willChange = 'opacity';
      this.fadeOutElements.push({ element, options });
    },
  });

  from = (key, options) => ({
    ref: elm => {
      const element = elm;
      element.style.willChange = 'transform';
      this.elementFrom[key] = { element, options };
    },
  });

  to = (key, options) => ({
    ref: elm => {
      const element = elm;
      element.style.visibility = 'hidden';
      element.style.opacity = 0;
      element.style.willChange = 'transform';
      this.elementTo[key] = { element, options };
    },
  });

  go = (to, options = {}) => {
    if (!this.timeline.length) {
      this.init(to);
      return;
    }

    spring({
      from: this.progress.get(),
      to,
      ...this.props.spring,
      ...options,
    }).start(x => {
      this.progress.update(x);
      this.seek(x);
    });
  };

  seek = t => {
    this.timeline.forEach(x => x.seek(t));
  };

  /* eslint-disable max-statements */
  morph = key => {
    const {
      element: original,
      options: { zIndex, easing: optEasing = x => x, ...options } = {},
    } = this.elementFrom[key];
    const { element: target } = this.elementTo[key];

    const originalRect = getBox(original);
    const targetRect = getBox(target);
    const originalCloneContainer = document.createElement('div');
    const originalClone = original.cloneNode(true);

    originalCloneContainer.appendChild(originalClone);

    const originalStyler = css(original);
    const cloneStyler = css(originalCloneContainer);
    const targetStyler = css(target);

    // originalStyler.set({ color: 'red' });
    // cloneStyler.set({ color: 'green' });
    // targetStyler.set({ color: 'blue' });

    cloneStyler.set({
      position: 'absolute',
      transformOrigin: 'top left',
      pointerEvents: 'none',
      ...originalRect,
      zIndex,
    });
    targetStyler.set({
      'transform-origin': 'top left',
      visibility: 'visible',
    });

    document.body.appendChild(originalCloneContainer);

    const diffStyle = diffRect(targetRect, originalRect);

    const cloneTranslateIn = interpolateObject(
      { translateX: 0, translateY: 0, scaleX: 1, scaleY: 1 },
      diffStyle,
    );

    const diffTargetStyles = diffRect(originalRect, targetRect);
    const targetTranslateFLIP = interpolateObject(diffTargetStyles, {
      translateX: 0,
      translateY: 0,
      scaleX: 1,
      scaleY: 1,
    });

    this.timeline.push(
      // In and out track.
      {
        seek: keyframe({
          0.1: t => {
            hide(originalStyler)(1 - t);
          },

          30: () => {},

          100: t => {
            hide(cloneStyler)(1 - t);
          },
        }),
      },
      // Full track.
      {
        seek: keyframe({
          100: t => {
            pipe(optEasing, cloneTranslateIn, cloneStyler.set)(t);
            pipe(optEasing, targetTranslateFLIP, targetStyler.set)(t);
          },
        }),
      },
      // Half way.
      {
        seek: keyframe({
          0.01: t => {
            hide(cloneStyler)(t);
          },
          30: t => hide(targetStyler)(t),
        }),
      },
    );

    this.isPlaying = true;
  };

  init = () => {
    if (this.timeline.length) return;

    Object.keys(this.elementFrom).forEach(this.morph);

    const fadeOuts = this.fadeOutElements.map(fadeOutTween);
    const fadeIns = this.fadeInElements.map(fadeInTween);
    const hidesIns = this.hideElements.map(hideTween);

    this.timeline = [...fadeOuts, ...fadeIns, ...hidesIns, ...this.timeline];

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

      progress: this.progress,

      hide: this.hide,
      init: this.init,
    });

    return renderedChildren && React.Children.only(renderedChildren);
  }
}

export default Morph;
