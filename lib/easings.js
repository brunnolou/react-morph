"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Credits to: https://gist.github.com/gre/1650294
exports.createEaseIn = function (power) { return function (t) {
    return Math.pow(t, power);
}; };
exports.createEaseOut = function (power) { return function (t) {
    return 1 - Math.abs(Math.pow(t - 1, power));
}; };
exports.createEaseInOut = function (p) { return function (t) {
    return t < 0.5 ? exports.createEaseIn(p)(t * 2) / 2 : exports.createEaseOut(p)(t * 2 - 1) / 2 + 0.5;
}; };
exports.createReversed = function (easing) { return function (t) { return 1 - easing(1 - t); }; };
exports.easeInSin = function (t) {
    return 1 + Math.sin((Math.PI / 2) * t - Math.PI / 2);
};
exports.easeOutSin = function (t) { return Math.sin((Math.PI / 2) * t); };
exports.easeInOutSin = function (t) {
    return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
};
exports.easeIn = exports.createEaseIn(2);
exports.easeOut = exports.createEaseOut(2);
exports.easeInOut = exports.createEaseInOut(2);
exports.linear = function (x) { return x; };
//# sourceMappingURL=easings.js.map