const px = x => `${x}px`;

export const getRects = node => {
  const { left, top, width, height } = node.getBoundingClientRect();
  return { left: px(left), top: px(top), width: px(width), height: px(height) };
};

export const applyOverlayStyle = (node, styles, transforms) => {
  Object.assign(node.style, {
    position: "absolute",
    //visibility: "visible",
    "transform-origin": "top left",
    ...styles
    //background: "rgba(255,255,0,.4)"
  });
};

export const diffRect = (a, b) => ({
  translateY: parseInt(a.top, 10) - parseInt(b.top, 10),
  translateX: parseInt(a.left, 10) - parseInt(b.left, 10),
  scaleY: parseInt(a.height, 10) / parseInt(b.height, 10),
  scaleX: parseInt(a.width, 10) / parseInt(b.width, 10)
});

export const getTransformString = (
  { translateY, translateX, scaleY, scaleX },
  removeScale = false
) => `
  translateY(${px(translateY)})
	translateX(${px(translateX)})
	${
    !removeScale
      ? `
	  scaleY(${scaleY})
	  scaleX(${scaleX})
	`
      : ""
  }
`;

export const getRect = (elm, { getMargins = false } = {}) => {
  const box = elm.getBoundingClientRect();
  const styles = getComputedStyle(elm);

  return {
    top: px(
      box.top +
        window.scrollY -
        (getMargins ? parseInt(styles.marginTop, 10) : 0)
    ),
    left: px(
      box.left +
        window.scrollX -
        (getMargins ? parseInt(styles.marginLeft, 10) : 0)
    ),
    width: px(
      box.width +
        (getMargins
          ? parseInt(styles.marginLeft, 10) + parseInt(styles.marginRight, 10)
          : 0)
    ),
    height: px(
      box.height +
        (getMargins
          ? parseInt(styles.marginTop, 10) + parseInt(styles.marginBottom, 10)
          : 0)
    )
  };
};

export const getValueFromProgress = (from, to, progress) =>
  -progress * from + progress * to + from;

export const interpolateObject = (from = {}, to = {}) => t => ({
  ...Object.keys(from).reduce(
    (acc, key) => ({
      [key]: getValueFromProgress(from[key], to[key], t),
      ...acc
    }),
    {}
  )
});

export const cloneElement = (element, { portalElement, zIndex = 0 }) => {
  const cloneContainer = document.createElement("div");
  const clone = element.cloneNode(true);

  cloneContainer.classList.add("rm-cloned");
  // cloneContainer.style.pointerEvents = "none";
  cloneContainer.style.zIndex = 1 + zIndex;
  cloneContainer.appendChild(clone);
  portalElement.appendChild(cloneContainer);

  return cloneContainer;
};

export const clamp = (min, max) => x => Math.min(Math.max(x, min), max);
export const clampProgress = clamp(0, 1);
export const lerp = (from, to, isClamped) => t =>
  getValueFromProgress(from, to, isClamped ? clampProgress(t) : t);
