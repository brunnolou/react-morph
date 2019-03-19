import { MorphOptions, NumberObject, Easings } from './types';
import { linear, reversed, Easing } from '@popmotion/easing';

const px = (x: number) => `${x}px`;

export const getRects = (node: HTMLElement) => {
  const { left, top, width, height } = node.getBoundingClientRect();
  return { left: px(left), top: px(top), width: px(width), height: px(height) };
};

export const applyOverlayStyle = (node: HTMLElement, styles = {}) => {
  Object.assign(node.style, {
    position: 'absolute',
    'transform-origin': 'top left',
    ...styles,
  });
};

export const diffRect = (a: HTMLElement['style'], b: HTMLElement['style']) => ({
  translateY: parseInt(a.top || '0', 10) - parseInt(b.top || '0', 10),
  translateX: parseInt(a.left || '0', 10) - parseInt(b.left || '0', 10),
  scaleY: parseInt(a.height || '0', 10) / parseInt(b.height || '0', 10),
  scaleX: parseInt(a.width || '0', 10) / parseInt(b.width || '0', 10),
});

export const getTransformString = (
  { translateY, translateX, scaleY, scaleX }: NumberObject,
  removeScale = false,
) => `
  translateY(${px(translateY)})
	translateX(${px(translateX)})
	${
    !removeScale
      ? `
	  scaleY(${scaleY})
	  scaleX(${scaleX})
	`
      : ''
  }
`;

export const getRect = (elm: HTMLElement, { getMargins = false } = {}) => {
  const box = elm.getBoundingClientRect();
  const styles = getComputedStyle(elm);

  return {
    top: px(
      box.top +
        window.scrollY -
        (getMargins ? parseInt(styles.marginTop || '0', 10) : 0),
    ),
    left: px(
      box.left +
        window.scrollX -
        (getMargins ? parseInt(styles.marginLeft || '0', 10) : 0),
    ),
    width: px(
      box.width +
        (getMargins
          ? parseInt(styles.marginLeft || '0', 10) +
            parseInt(styles.marginRight || '0', 10)
          : 0),
    ),
    height: px(
      box.height +
        (getMargins
          ? parseInt(styles.marginTop || '0', 10) +
            parseInt(styles.marginBottom || '0', 10)
          : 0),
    ),
  } as CSSStyleDeclaration;
};

export const getValueFromProgress = (
  from: number,
  to: number,
  progress: number,
) => -progress * from + progress * to + from;

export const interpolateObject = (
  from: NumberObject = {},
  to: NumberObject = {},
  { easings = linear, isReversed }: MorphOptions,
) => (t: number) => ({
  ...Object.keys(from).reduce((acc, key) => {
    const shouldRev = isReversed ? reversed : (x: Easing) => x;
    const easeFn = shouldRev(
      typeof easings === 'function' ? easings : easings[key] || linear,
    );

    return {
      [key]: getValueFromProgress(from[key], to[key], easeFn(t)),
      ...acc,
    };
  }, {}),
});

export const cloneElement = (
  element: HTMLElement,
  { portalElement, zIndex = 0 }: MorphOptions,
) => {
  const cloneContainer = document.createElement('div');
  const clone = element.cloneNode(true);

  cloneContainer.classList.add('rm-cloned');
  // cloneContainer.style.pointerEvents = "none";
  cloneContainer.style.zIndex = String(1 + zIndex);
  cloneContainer.appendChild(clone);
  portalElement.appendChild(cloneContainer);

  return cloneContainer;
};

export const clamp = (min: number, max: number) => (x: number) =>
  Math.min(Math.max(x, min), max);
export const clampProgress = clamp(0, 1);
export const lerp = (from: number, to: number, isClamped: Boolean) => (
  t: number,
) => getValueFromProgress(from, to, isClamped ? clampProgress(t) : t);

export default {
  interpolateObject,
};
