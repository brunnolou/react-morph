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
var useMorph_1 = require("./useMorph");
var useMorphs = function (items, options) {
    if (options === void 0) { options = {}; }
    var list = items;
    if (typeof list === 'number')
        list = Array(list).fill(0);
    var optionsFn = typeof options === 'function' ? options : function () { return options; };
    return list
        .map(optionsFn)
        .map(function (options, i) {
        return useMorph_1.default(__assign({ zIndex: i }, options));
    });
};
exports.default = useMorphs;
//# sourceMappingURL=useMorphs.js.map