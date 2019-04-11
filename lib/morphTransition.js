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
var wobble_1 = require("wobble");
var popcorn_1 = require("@popmotion/popcorn");
var util_1 = require("./util");
var resetTranslate = {
    translateX: 0,
    translateY: 0,
    scaleX: 1,
    scaleY: 1,
};
var ease = popcorn_1.cubicBezier(0.9, 0.9, 0.37, 0.98);
var easeRev = popcorn_1.reversed(ease);
var easeInOut = popcorn_1.cubicBezier(0.5, 0.5, 0, 1);
var delaysRatio = 0.1;
var halfClampEnd = util_1.clamp(1 - delaysRatio, 1);
var halfClampStart = util_1.clamp(0, delaysRatio);
var easeFast = function (x) {
    return easeInOut(Number(popcorn_1.interpolate([1 - delaysRatio, 1], [0, 1])(halfClampEnd(x))));
};
var easeSlow = function (x) {
    return easeInOut(Number(popcorn_1.interpolate([0, delaysRatio], [0, 1])(halfClampStart(x))));
};
function morphTransition(_a) {
    var from = _a.from, to = _a.to, rectFrom = _a.rectFrom, rectTo = _a.rectTo, _b = _a.fromValue, fromValue = _b === void 0 ? 0 : _b, initialVelocity = _a.initialVelocity, _c = _a.onUpdate, onUpdate = _c === void 0 ? function () { } : _c, _d = _a.onStart, onStart = _d === void 0 ? function () { } : _d, _e = _a.onStop, onStop = _e === void 0 ? function () { } : _e, willBack = _a.willBack, options = _a.options;
    var spring = new wobble_1.Spring(__assign({ fromValue: fromValue,
        initialVelocity: initialVelocity, toValue: 1 }, options.spring));
    var fromDiffStyle = util_1.diffRect(rectFrom, rectTo);
    var toDiffStyle = util_1.diffRect(rectTo, rectFrom);
    var fromContainer = util_1.cloneElement(from, options);
    var toContainer = util_1.cloneElement(to, options);
    // hideInnerMorph(toContainer);
    // hideInnerMorph(fromContainer);
    to.style.visibility = 'hidden';
    to.style.pointerEvents = 'none';
    from.style.visibility = 'hidden';
    from.style.pointerEvents = 'none';
    util_1.applyOverlayStyle(toContainer, rectTo);
    util_1.applyOverlayStyle(fromContainer, rectFrom);
    var toFLIP = util_1.interpolateObject(fromDiffStyle, resetTranslate, options);
    var fromFLIP = util_1.interpolateObject(resetTranslate, toDiffStyle, options);
    var toFade = util_1.lerp(0, 1, true);
    var fromFade = util_1.lerp(1, 0, true);
    var isDeleted = false;
    var onProgress = function (p) {
        switch (options.type) {
            case 'morph':
            default:
                toContainer.style.opacity = String(toFade(ease(p)));
                fromContainer.style.opacity = String(fromFade(easeRev(p)));
                toContainer.style.transform = util_1.getTransformString(toFLIP(p));
                fromContainer.style.transform = util_1.getTransformString(fromFLIP(p));
        }
    };
    spring
        .onStart(onStart)
        .onUpdate(function (s) {
        var p = s.currentValue;
        onProgress(p);
        onUpdate(s);
    })
        .onStop(function (s) {
        if (s.currentValue === 0 || s.currentValue === 1) {
            onStop(s);
            cleanup();
        }
    });
    if (typeof options.progress === 'undefined') {
        spring.start();
    }
    else {
        onProgress(options.progress);
    }
    var setProgress = function (progress) {
        onProgress(progress);
        if (progress === 0 || progress === 1) {
            onStop(null);
            // cleanup();
        }
    };
    var cleanup = function () {
        if (isDeleted)
            return;
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
    return { cleanup: cleanup, setProgress: setProgress };
}
exports.default = morphTransition;
//# sourceMappingURL=morphTransition.js.map