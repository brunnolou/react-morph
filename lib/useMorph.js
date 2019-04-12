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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var easing_1 = require("@popmotion/easing");
var morphTransition_1 = require("./morphTransition");
var util_1 = require("./util");
var globalAny = global;
var defaultsOptions = {
    keepFrom: false,
    type: 'morph',
    getMargins: false,
    portalElement: globalAny.document && globalAny.document.body,
    spring: {
        damping: 26,
        mass: 1,
        stiffness: 180,
    },
    easings: easing_1.linear,
    isReversed: false,
    withMethods: false,
};
function useMorph(opts) {
    if (opts === void 0) { opts = defaultsOptions; }
    var options = __assign({}, defaultsOptions, opts);
    var getMargins = options.getMargins, keepFrom = options.keepFrom, _a = options.spring, damping = _a.damping, mass = _a.mass, stiffness = _a.stiffness, isReversed = options.isReversed;
    var backAnimationRef = react_1.useRef();
    var prevToRef = react_1.useRef();
    var prevToRectRef = react_1.useRef();
    var prevSpringRef = react_1.useRef();
    var cleanupFromRef = react_1.useRef();
    var setProgressRef = react_1.useRef();
    var isAnimating = false;
    var cleanup;
    function resize() {
        if (!prevToRef.current)
            return;
        prevToRectRef.current = util_1.getRect(prevToRef.current, { getMargins: getMargins });
    }
    // Window on resize effect.
    react_1.useEffect(function () {
        if (!prevToRef.current)
            return;
        window.addEventListener('resize', resize);
        return function () { return window.removeEventListener('resize', resize); };
    }, []);
    var animate = function (_a) {
        var from = _a.from, to = _a.to, rectFrom = _a.rectFrom, rectTo = _a.rectTo, willBack = _a.willBack;
        if (!to)
            return;
        to.style.visibility = 'visible';
        if (!from)
            return;
        isAnimating = true;
        var prevSpring = prevSpringRef.current;
        switch (options.type) {
            case 'fade':
            case 'morph':
            default:
                var morph = morphTransition_1.default({
                    from: from,
                    to: to,
                    rectFrom: rectFrom,
                    rectTo: rectTo,
                    fromValue: prevSpring !== undefined && prevSpring.currentValue !== 1
                        ? 1 - prevSpring.currentValue
                        : 0,
                    initialVelocity: prevSpring !== undefined && prevSpring.currentVelocity !== 0
                        ? prevSpring.currentVelocity * -1
                        : 0,
                    onUpdate: function (s) {
                        prevSpringRef.current = s;
                    },
                    willBack: willBack,
                    options: options,
                });
                cleanup = morph.cleanup;
                setProgressRef.current = morph.setProgress;
                cleanupFromRef.current = cleanup;
        }
        return function () {
            if (isAnimating)
                cleanup();
        };
    };
    react_1.useEffect(function () {
        if (!setProgressRef.current)
            return;
        setProgressRef.current(options.progress);
    }, [options.progress]);
    var getRef = react_1.useCallback(function (to) {
        var from = prevToRef.current;
        var cleanupFrom = cleanupFromRef.current;
        if (from === to)
            return;
        var willUnmount = !to;
        var willAnimate = !!to && !!from;
        var willBack = keepFrom && willAnimate;
        var isBackwards = keepFrom && willUnmount && !!from;
        if (cleanupFrom)
            cleanupFrom();
        if (isBackwards) {
            animate(backAnimationRef.current);
            return;
        }
        if (willUnmount) {
            if (cleanup)
                cleanup();
            return;
        }
        var rectFrom = prevToRectRef.current;
        var rectTo = util_1.getRect(to, { getMargins: getMargins });
        animate({ from: from, rectFrom: rectFrom, to: to, rectTo: rectTo, willBack: willBack });
        backAnimationRef.current = {
            from: to,
            rectFrom: rectTo,
            to: from,
            rectTo: rectFrom,
        };
        if (!willBack) {
            prevToRef.current = to;
            prevToRectRef.current = rectTo;
        }
    }, [keepFrom, damping, mass, stiffness, isReversed]);
    var style = { visibility: 'hidden' };
    var props = {
        ref: getRef,
        style: style,
    };
    var propsFn = function (_a) {
        if (_a === void 0) { _a = {}; }
        var _b = _a.style, style = _b === void 0 ? {} : _b, extra = __rest(_a, ["style"]);
        return (__assign({}, props, { style: __assign({}, props.style, style) }));
    };
    propsFn.ref = getRef;
    propsFn.style = style;
    if (options.withMethods) {
        return [propsFn, { resize: resize }];
    }
    return propsFn;
}
exports.default = useMorph;
//# sourceMappingURL=useMorph.js.map