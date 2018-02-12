'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _popmotion = require('popmotion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createExpoIn = _popmotion.easing.createExpoIn;

var strongerEaseIn = createExpoIn(5);

var hiddenStyle = {
  visibility: 'hidden'
};

var onceDifferent = function onceDifferent(func, value) {
  var memo = value;

  return function (newVal) {
    if (memo === newVal) return memo;

    func(newVal);

    memo = newVal;

    return memo;
  };
};

var diffRect = function diffRect(a, b) {
  return {
    translateY: a.top - b.top,
    translateX: a.left - b.left,
    scaleY: a.height / b.height,
    scaleX: a.width / b.width
  };
};

var invert = function invert(obj) {
  return Object.keys(obj).reduce(function (acc, curr) {
    return Object.assign(_defineProperty({}, curr, obj[curr] * -1), acc);
  }, {});
};

var Morph = function (_Component) {
  _inherits(Morph, _Component);

  function Morph() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Morph);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Morph.__proto__ || Object.getPrototypeOf(Morph)).call.apply(_ref, [this].concat(args))), _this), _this.state = { objects: [] }, _this.elementFrom = {}, _this.elementTo = {}, _this.fadeInElements = [], _this.fadeOutElements = [], _this.fadeIn = function (options) {
      return {
        ref: function ref(element) {
          element.style.willChange = 'opacity';
          element.style.opacity = 0;
          _this.fadeInElements.push({ element: element, options: options });
        }
      };
    }, _this.fadeOut = function (options) {
      return {
        ref: function ref(element) {
          element.style.willChange = 'opacity';
          _this.fadeOutElements.push({ element: element, options: options });
        }
      };
    }, _this.from = function (key, options) {
      return {
        ref: function ref(element) {
          element.style.willChange = 'transform';
          _this.elementFrom[key] = { element: element, options: options };
        }
      };
    }, _this.to = function (key, options) {
      return {
        ref: function ref(element) {
          element.style.visibility = 'hidden';
          element.style.opacity = 0;
          element.style.willChange = 'transform';
          _this.elementTo[key] = { element: element, options: options };
        }
      };
    }, _this.isPlaying = false, _this.timeline = [], _this.hiddenProps = function () {}, _this.progress = (0, _popmotion.value)(0, _this.seek), _this.options = {
      stiffness: 500,
      mass: 5,
      damping: 300
    }, _this.go = function (to) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      (0, _popmotion.spring)(Object.assign({
        from: _this.progress.get(),
        to: to
      }, _this.options, options)).start(function (x) {
        _this.progress.update(x);
        _this.seek(x);
      });
    }, _this.seek = function (t) {
      _this.timeline.forEach(function (x) {
        return x.seek(t);
      });
    }, _this.init = function (index) {
      if (_this.timeline.length) return _this.go(1);

      var duration = 1000 * index;
      Object.keys(_this.elementFrom).forEach(function (key) {
        var _this$timeline;

        var _this$elementFrom$key = _this.elementFrom[key],
            original = _this$elementFrom$key.element,
            options = _this$elementFrom$key.options;
        var target = _this.elementTo[key].element;


        var originalRect = original.getBoundingClientRect();
        var targetRect = target.getBoundingClientRect();
        var originalCloneContainer = document.createElement('div');
        var originalClone = original.cloneNode(true);

        originalCloneContainer.appendChild(originalClone);

        var originalStyler = (0, _popmotion.css)(original);
        console.log('original: ', original);
        var cloneStyler = (0, _popmotion.css)(originalCloneContainer);
        var targetStyler = (0, _popmotion.css)(target);

        cloneStyler.set(Object.assign({
          position: 'absolute',
          transformOrigin: 'top left',
          pointerEvents: 'none',
          top: originalRect.top,
          left: originalRect.left,
          width: originalRect.width,
          height: originalRect.height
        }, options));

        document.body.appendChild(originalCloneContainer);

        var hide = function hide(styler) {
          return function (t) {
            return styler.set({ opacity: t, visibility: t ? 'visible' : 'hidden' });
          };
        };

        var hiddenTransition = (0, _popmotion.keyframes)({
          values: [1, 0],
          times: [0, 0.1],
          easings: _popmotion.easing.linear
        });

        var diffStyle = diffRect(targetRect, originalRect);

        var translateIn = (0, _popmotion.keyframes)({
          values: [{ translateX: 0, translateY: 0, scaleX: 1, scaleY: 1 }, diffStyle],
          easings: _popmotion.easing.linear
        });

        var fadeOut = (0, _popmotion.keyframes)({
          values: [{ opacity: 1 }, { opacity: 0 }],
          easings: _popmotion.easing.linear,
          times: [0.9, 1]
        });

        targetStyler.set({
          'transform-origin': 'top left',
          visibility: 'visible'
        });

        var diffTargetStyles = diffRect(originalRect, targetRect);

        var translateFrom = (0, _popmotion.keyframes)({
          values: [Object.assign({}, diffTargetStyles), { translateX: 0, translateY: 0, scaleX: 1, scaleY: 1 }],
          easings: _popmotion.easing.linear
        });

        var fadeIn = (0, _popmotion.keyframes)({
          values: [{ opacity: 0 }, { opacity: 1 }],
          easings: _popmotion.easing.linear
          // times: [0.9, 1]
        });

        // const fadeInOnce = onceDifferent(s => {
        // 	console.log("s: ", s);
        // 	fadeIn.start(targetStyler.set);
        // });
        // fadeOut.start(cloneStyler.set);

        // Image bg fix.
        var bgFix = (0, _popmotion.tween)({
          from: diffTargetStyles.scaleX * 1000,
          to: 100,
          easings: _popmotion.easing.linear
        }).start(function (s) {
          // if (key === 'cover') console.log('s: ', s);
          originalClone.style.backgroundSize = s + '% 100%';
        }).pause();

        // tween({
        // 	from: diffTargetStyles.scaleY * 1000,
        // 	to: 100,
        // 	easings: easing.linear,
        // 	duration
        // }).start(s => {
        // 	target.style.backgroundSize = `100% ${s}% `;
        // });

        (_this$timeline = _this.timeline).push.apply(_this$timeline, [hiddenTransition.start(hide(originalStyler)).pause(),
        // original.
        translateIn.start(cloneStyler.set).pause(), fadeOut.start(cloneStyler.set).pause(),
        // Target.
        fadeIn.start(targetStyler.set).pause(), translateFrom.start(targetStyler.set).pause(), bgFix]);

        _this.isPlaying = true;
      });

      var fadeOuts = _this.fadeOutElements.map(function (_ref2) {
        var element = _ref2.element,
            _ref2$options = _ref2.options,
            options = _ref2$options === undefined ? {} : _ref2$options;
        return (0, _popmotion.tween)(Object.assign({
          from: 1,
          to: 0,
          ease: _popmotion.easing.linear,
          duration: duration / 2
        }, options)).start(function (v) {
          return element.style.opacity = v;
        });
      });

      var fadeIns = _this.fadeInElements.map(function (_ref3) {
        var element = _ref3.element,
            _ref3$options = _ref3.options,
            options = _ref3$options === undefined ? {} : _ref3$options;
        return (0, _popmotion.keyframes)({
          values: [0, 1],
          easings: _popmotion.easing.strongerEaseIn,
          times: [0.8, 0.9]
        }).start(function (v) {
          return element.style.opacity = v;
        }).pause();
      });

      _this.timeline = [].concat(_toConsumableArray(fadeOuts), _toConsumableArray(fadeIns), _toConsumableArray(_this.timeline));

      // const timelineTween = tween({
      // 	from: 0,
      // 	to: 1,
      // 	ease: easing.cubicBezier(0.8, 0, 0.34, 1),
      // 	duration
      // }).start(this.progress);

      _this.go(1);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Morph, [{
    key: 'render',
    value: function render() {
      var renderedChildren = this.props.children({
        from: this.from,
        to: this.to,

        fadeIn: this.fadeIn,
        fadeOut: this.fadeOut,

        back: this.back,
        seek: this.seek,
        go: this.go,

        hiddenProps: this.hiddenProps,
        init: this.init
      });

      return renderedChildren && _react2.default.Children.only(renderedChildren);
    }
  }]);

  return Morph;
}(_react.Component);

exports.default = Morph;