import React, { Component } from 'react';
import propTypes from 'prop-types';
import keyframe from 'keyframe';
import raf from 'raf';
import css from 'stylefire/css';
import { keyframes, spring, tween, value, transform, easing } from 'popmotion';
import { interpolateObject } from './util';

const { linear } = easing;
const { pipe } = transform;

const getBox = (elm, { getMargins = false } = {}) => {
  const box = elm.getBoundingClientRect();
  const styles = getComputedStyle(elm);

  return {
    top:
      box.top +
      window.scrollY -
      (getMargins ? parseInt(styles.marginTop, 10) : 0),
    left:
      box.left +
      window.scrollX -
      (getMargins ? parseInt(styles.marginLeft, 10) : 0),
    width:
      box.width +
      (getMargins
        ? parseInt(styles.marginLeft, 10) + parseInt(styles.marginRight, 10)
        : 0),
    height:
      box.height +
      (getMargins
        ? parseInt(styles.marginTop, 10) + parseInt(styles.marginBottom, 10)
        : 0),
  };
};

const fadeOutTween = ({ element, options = {} }) =>
  tween({
    from: 1,
    to: 0,
    ease: linear,
    ...options,
  }).start(v => {
    const node = element;
    node.style.opacity = v;
    if (v === 1) node.style.pointerEvents = 'all';
  });

const fadeInTween = ({ element, options = {} }) => {
  const styler = css(element);
  return keyframes({
    values: [{ opacity: 0 }, { opacity: 1 }],
    easings: linear,
    times: [0.8, 1],
    ...options,
  })
    .start(style => {
      const node = element;

      styler.set(style);

      if (style.opacity === 1) node.style.pointerEvents = 'all';
    })
    .pause();
};

const hideTween = ({ element }) => ({
  seek: pipe(Math.round, t => {
    const node = element;

    node.style.visibility = t > 0 ? 'hidden' : 'visible';
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
    // eslint-disable-next-line
    portalElement: propTypes.object,
    children: propTypes.func.isRequired,
    spring: propTypes.shape({
      restDelta: propTypes.number,
      restSpeed: propTypes.number,
      stiffness: propTypes.number.isRequired,
      mass: propTypes.number,
      damping: propTypes.number.isRequired,
    }),
  };

  static defaultProps = {
    portalElement: global.document && global.document.body,
    spring: {
      restDelta: 0.001,
      restSpeed: 0.001,
      damping: 26,
      mass: 1,
      stiffness: 170,
    },
  };

  state = {
    state: 'from',
  };

  componentWillUnmount() {
    // Remove clones.
    this.elementsCloned.forEach(node =>
      this.props.portalElement.removeChild(node),
    );
  }

  elementFrom = {};
  elementTo = {};

  elementsCloned = [];

  hideElements = [];
  fadeInElements = [];
  fadeOutElements = [];

  isPlaying = false;
  timeline = [];

  hide = options => ({
    ref: node => {
      const element = node;
      this.hideElements.push({ element, options });
    },
  });

  progress = value(0, this.seek);

  fadeIn = options => ({
    ref: node => {
      const element = node;
      if (!element) return;

      element.style.willChange = 'opacity';
      element.style.pointerEvents = 'none';
      element.style.opacity = 0;
      this.fadeInElements.push({ element, options });
    },
  });

  fadeOut = options => ({
    ref: node => {
      const element = node;
      if (!element) return;

      element.style.willChange = 'opacity';
      this.fadeOutElements.push({ element, options });
    },
  });

  from = (key, options) => ({
    ref: node => {
      const element = node;
      if (!element || this.elementFrom[key]) return;

      element.style.willChange = 'transform';
      this.elementFrom[key] = { element, options };
    },
  });

  to = (key, options) => ({
    ref: node => {
      const element = node;
      if (!element || this.elementTo[key]) return;

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
    if (t === 1 || t === 0) {
      this.setState({ state: t ? 'to' : 'from' });
    }

    this.timeline.forEach(x => x.seek(t));
  };

  /* eslint-disable max-statements */
  morph = key => {
    const {
      element: original,
      options: {
        zIndex,
        getMargins = true,
        easing: optEasing = x => x,
        ...options
      } = {},
    } = this.elementFrom[key];
    const { element: target } = this.elementTo[key];

    const originalRect = getBox(original, { getMargins });
    const targetRect = getBox(target, { getMargins });
    const originalCloneContainer = document.createElement('div');
    const originalClone = original.cloneNode(true);

    originalCloneContainer.appendChild(originalClone);

    const originalStyler = css(original);
    const cloneStyler = css(originalCloneContainer);
    const targetStyler = css(target);

    cloneStyler.set({
      position: 'absolute',
      transformOrigin: 'top left',
      pointerEvents: 'none',
      ...originalRect,
      ...options,
      zIndex,
    });
    targetStyler.set({
      'transform-origin': 'top left',
      visibility: 'visible',
    });

    this.props.portalElement.appendChild(originalCloneContainer);
    this.elementsCloned = [...this.elementsCloned, originalCloneContainer];

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
          0.01: t => {
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
      // Half way track.
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

  init = to => {
    if (this.timeline.length) return;

    Object.keys(this.elementFrom).forEach(this.morph);

    const fadeOuts = this.fadeOutElements.map(fadeOutTween);
    const fadeIns = this.fadeInElements.map(fadeInTween);
    const hidesIns = this.hideElements.map(hideTween);

    this.timeline = [...fadeOuts, ...fadeIns, ...hidesIns, ...this.timeline];

    raf(() => this.go(to));
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
      state: this.state.state,

      hide: this.hide,
      init: this.init,
    });

    return renderedChildren && React.Children.only(renderedChildren);
  }
}

export default Morph;
