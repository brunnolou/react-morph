"use strict";
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
var React = require("react");
var useMorph_1 = require("./useMorph");
var useFadeIn = function () {
    return function () { return ({}); };
};
var useHide = function () {
    return function () { return ({}); };
};
var Morph = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    var morph = useMorph_1.default();
    var fadeIn = useFadeIn();
    var hide = useHide();
    return React.Children.only(children({
        from: morph,
        to: morph,
        fadeIn: fadeIn,
        fadeOut: fadeIn,
        hide: hide,
    }));
};
exports.default = Morph;
//# sourceMappingURL=Morph.js.map