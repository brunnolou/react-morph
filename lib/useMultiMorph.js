"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var useMorph_1 = require("./useMorph");
var useMultiMorph = function (list, options) {
    if (options === void 0) { options = {}; }
    var morphs = list.map(function () { return useMorph_1.default(options); });
    return morphs;
};
exports.default = useMultiMorph;
//# sourceMappingURL=useMultiMorph.js.map