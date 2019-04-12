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
var wobble_1 = require("wobble");
var util_1 = require("./util");
var easing_1 = require("@popmotion/easing");
var popcorn_1 = require("@popmotion/popcorn");
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
        overshootClamping: true,
    },
    easings: easing_1.linear,
    delaysRatio: 0.1,
    isInitial: false,
};
function useFade(opts) {
    if (opts === void 0) { opts = defaultsOptions; }
    var options = __assign({}, defaultsOptions, opts);
    var getMargins = options.getMargins, isInitial = options.isInitial, delaysRatio = options.delaysRatio;
    var prevNodeRef = react_1.useRef();
    var cloneContainerRef = react_1.useRef();
    var isMountedRef = react_1.useRef();
    var cleanup = function () {
        if (!cloneContainerRef.current)
            return;
        prevNodeRef.current.style.visibility = null;
        options.portalElement.removeChild(cloneContainerRef.current);
        cloneContainerRef.current = null;
    };
    var halfClampEnd = popcorn_1.clamp(1 - delaysRatio, 1);
    var easeFast = function (x) {
        return easing_1.easeInOut(Number(popcorn_1.interpolate([1 - delaysRatio, 1], [0, 1])(halfClampEnd(x))));
    };
    var spring = new wobble_1.Spring(__assign({ fromValue: Number(isInitial), toValue: Number(!isInitial) }, options.spring));
    spring
        .onUpdate(function (s) {
        if (!cloneContainerRef.current)
            return;
        cloneContainerRef.current.style.opacity = String(easeFast(s.currentValue));
    })
        .onStop(cleanup);
    var getRef = react_1.useCallback(function (n) {
        var node = n || prevNodeRef.current;
        var hasNode = !!node;
        if (hasNode && isMountedRef.current) {
            node.style.visibility = 'visible';
            var rect = util_1.getRect(node, { getMargins: getMargins });
            if (!cloneContainerRef.current)
                cloneContainerRef.current = util_1.cloneElement(node, options);
            node.style.visibility = 'hidden';
            prevNodeRef.current = node;
            util_1.applyOverlayStyle(cloneContainerRef.current, __assign({}, rect));
        }
        var toValue = Number(!!n);
        if (spring.currentValue === toValue)
            cleanup();
        spring.updateConfig({ toValue: toValue }).start();
    }, []);
    isMountedRef.current = true;
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
    return propsFn;
}
exports.default = useFade;
//# sourceMappingURL=useFade.js.map