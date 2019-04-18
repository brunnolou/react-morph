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
var useMorphKeys = function (list, options) {
    if (options === void 0) { options = {}; }
    var keysObj = list.reduce(function (acc, key, i) {
        var _a;
        return __assign({}, acc, (_a = {}, _a[key] = useMorph_1.default(__assign({ zIndex: i }, options)), _a));
    }, {});
    return keysObj;
};
exports.default = useMorphKeys;
//# sourceMappingURL=useMorphKeys.js.map