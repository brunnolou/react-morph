"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var easings_1 = require("./easings");
var px = function (x) { return x + "px"; };
exports.getRects = function (node) {
    var _a = node.getBoundingClientRect(), left = _a.left, top = _a.top, width = _a.width, height = _a.height;
    return { left: px(left), top: px(top), width: px(width), height: px(height) };
};
exports.applyOverlayStyle = function (node, styles) {
    if (styles === void 0) { styles = {}; }
    Object.assign(node.style, __assign({ position: 'absolute', 
        // border: '2px solid red',
        'transform-origin': 'top left' }, styles));
};
exports.diffRect = function (a, b) { return ({
    translateY: parseInt(a.top || '0', 10) - parseInt(b.top || '0', 10),
    translateX: parseInt(a.left || '0', 10) - parseInt(b.left || '0', 10),
    scaleY: parseInt(a.height || '0', 10) / parseInt(b.height || '0', 10),
    scaleX: parseInt(a.width || '0', 10) / parseInt(b.width || '0', 10),
}); };
exports.getTransformString = function (_a, removeScale) {
    var translateY = _a.translateY, translateX = _a.translateX, scaleY = _a.scaleY, scaleX = _a.scaleX;
    if (removeScale === void 0) { removeScale = false; }
    return "\n  translateY(" + px(translateY) + ")\n\ttranslateX(" + px(translateX) + ")\n\t" + (!removeScale
        ? "\n\t  scaleY(" + scaleY + ")\n\t  scaleX(" + scaleX + ")\n\t"
        : '') + "\n";
};
exports.getRect = function (elm, _a) {
    var _b = (_a === void 0 ? {} : _a).getMargins, getMargins = _b === void 0 ? false : _b;
    var box = elm.getBoundingClientRect();
    var styles = getComputedStyle(elm);
    return {
        top: px(box.top +
            window.scrollY -
            (getMargins ? parseInt(styles.marginTop || '0', 10) : 0)),
        left: px(box.left +
            window.scrollX -
            (getMargins ? parseInt(styles.marginLeft || '0', 10) : 0)),
        width: px(box.width +
            (getMargins
                ? parseInt(styles.marginLeft || '0', 10) +
                    parseInt(styles.marginRight || '0', 10)
                : 0)),
        height: px(box.height +
            (getMargins
                ? parseInt(styles.marginTop || '0', 10) +
                    parseInt(styles.marginBottom || '0', 10)
                : 0)),
    };
};
exports.getValueFromProgress = function (from, to, progress) { return -progress * from + progress * to + from; };
exports.interpolateObject = function (from, to, _a) {
    if (from === void 0) { from = {}; }
    if (to === void 0) { to = {}; }
    var _b = _a.easings, easings = _b === void 0 ? easings_1.linear : _b, isReversed = _a.isReversed;
    return function (t) { return (__assign({}, Object.keys(from).reduce(function (acc, key) {
        var _a;
        var shouldRev = isReversed ? easings_1.createReversed : function (x) { return x; };
        var easeFn = shouldRev(typeof easings === 'function' ? easings : easings[key] || easings_1.linear);
        return __assign((_a = {}, _a[key] = exports.getValueFromProgress(from[key], to[key], easeFn(t)), _a), acc);
    }, {}))); };
};
exports.cloneElement = function (element, _a) {
    var portalElement = _a.portalElement, _b = _a.zIndex, zIndex = _b === void 0 ? 0 : _b;
    var cloneContainer = document.createElement('div');
    var clone = element.cloneNode(true);
    cloneContainer.classList.add('rm-cloned');
    // cloneContainer.style.pointerEvents = "none";
    cloneContainer.style.zIndex = String(1 + zIndex);
    cloneContainer.appendChild(clone);
    portalElement.appendChild(cloneContainer);
    return cloneContainer;
};
exports.clamp = function (min, max) { return function (x) {
    return Math.min(Math.max(x, min), max);
}; };
exports.clampProgress = exports.clamp(0, 1);
exports.lerp = function (from, to, isClamped) { return function (t) { return exports.getValueFromProgress(from, to, isClamped ? exports.clampProgress(t) : t); }; };
exports.default = {
    interpolateObject: exports.interpolateObject,
};
//# sourceMappingURL=util.js.map