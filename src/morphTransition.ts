import { Spring, SpringListenerFn } from 'wobble';
import { cubicBezier, interpolate, reversed } from '@popmotion/popcorn';

import {
  interpolateObject,
  applyOverlayStyle,
  diffRect,
  getTransformString,
  cloneElement,
  lerp,
  clamp,
} from './util';
import { MorphOptions } from './types';

const resetTranslate = {
  translateX: 0,
  translateY: 0,
  scaleX: 1,
  scaleY: 1,
};

const ease = cubicBezier(1, 0.26, 0.37, 0.98);
const easeRev = reversed(ease);
const easeInOut = cubicBezier(0.5, 0.5, 0, 1);

const fadeDistance = 0.1;
const halfClampEnd = clamp(1 - fadeDistance, 1);
const halfClampStart = clamp(0, fadeDistance);
const easeFast = (x: number) =>
  easeInOut(
    Number(interpolate([1 - fadeDistance, 1], [0, 1])(halfClampEnd(x))),
  );
const easeSlow = (x: number) =>
  easeInOut(Number(interpolate([0, fadeDistance], [0, 1])(halfClampStart(x))));

type Options = {
  from: HTMLElement;
  to: HTMLElement;
  rectFrom: CSSStyleDeclaration;
  rectTo: CSSStyleDeclaration;
  fromValue?: number;
  initialVelocity?: number;
  onUpdate?: SpringListenerFn;
  onStart?: SpringListenerFn;
  onStop?: SpringListenerFn;
  willBack?: boolean;
  options: MorphOptions;
};

export default function morphTransition({
  from,
  to,
  rectFrom,
  rectTo,
  fromValue = 0,
  initialVelocity,
  onUpdate = () => {},
  onStart = () => {},
  onStop = () => {},
  willBack,
  options,
}: Options) {
  const spring = new Spring({
    fromValue,
    initialVelocity,
    toValue: 1,
    ...options.spring,
  });

  const fromDiffStyle = diffRect(rectFrom, rectTo);
  const toDiffStyle = diffRect(rectTo, rectFrom);

  const fromContainer = cloneElement(from, options);
  const toContainer = cloneElement(to, options);

  // hideInnerMorph(toContainer);
  // hideInnerMorph(fromContainer);

  to.style.visibility = 'hidden';
  to.style.pointerEvents = 'none';
  from.style.visibility = 'hidden';
  from.style.pointerEvents = 'none';

  applyOverlayStyle(toContainer, rectTo);
  applyOverlayStyle(fromContainer, rectFrom);

  const toFLIP = interpolateObject(fromDiffStyle, resetTranslate, options);
  const fromFLIP = interpolateObject(resetTranslate, toDiffStyle, options);

  const toFade = lerp(0, 1, true);
  const fromFade = lerp(1, 0, true);

  let isDeleted = false;

  const onProgress = (p: number) => {
    switch (options.type) {
      case 'fade':
        toContainer.style.opacity = String(toFade(easeFast(p)));
        fromContainer.style.opacity = String(fromFade(easeSlow(p)));
        toContainer.style.transform = getTransformString(toFLIP(p));
        fromContainer.style.transform = getTransformString(fromFLIP(p));

        break;
      case 'morph':
      default:
        toContainer.style.opacity = String(toFade(ease(p)));
        fromContainer.style.opacity = String(fromFade(easeRev(p)));
        toContainer.style.transform = getTransformString(toFLIP(p));
        fromContainer.style.transform = getTransformString(fromFLIP(p));
    }
  };

  spring
    .onStart(onStart)
    .onUpdate(s => {
      const p = s.currentValue;
      onProgress(p);
      onUpdate(s);
    })
    .onStop(s => {
      if (s.currentValue === 0 || s.currentValue === 1) {
        onStop(s);
        cleanup();
      }
    });

  if (typeof options.progress === 'undefined') {
    spring.start();
  } else {
    onProgress(options.progress);
  }

  const setProgress = (progress: number) => {
    onProgress(progress);
    if (progress === 0 || progress === 1) {
      onStop(null);
      // cleanup();
    }
  };

  const cleanup = () => {
    if (isDeleted) return;
    if (options.portalElement) {
      options.portalElement.removeChild(toContainer);
      options.portalElement.removeChild(fromContainer);
    }
    to.style.visibility = ''; // show original to
    to.style.pointerEvents = ''; // show original to

    if (!willBack) {
      // show original from
      from.style.pointerEvents = '';
      from.style.visibility = '';
    }
    isDeleted = true;
  };

  return { cleanup, setProgress };
}
