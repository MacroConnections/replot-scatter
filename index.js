(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["LineChart"] = factory(require("react"));
	else
		root["LineChart"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Line = function (_React$Component) {
  _inherits(Line, _React$Component);

  function Line() {
    _classCallCheck(this, Line);

    return _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).apply(this, arguments));
  }

  _createClass(Line, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "g",
        null,
        _react2.default.createElement("line", {
          x1: this.props.x1,
          y1: this.props.y1,
          x2: this.props.x2,
          y2: this.props.y2,
          stroke: this.props.stroke,
          strokeWidth: this.props.strokeWidth,
          opacity: this.props.opacity })
      );
    }
  }]);

  return Line;
}(_react2.default.Component);

Line.defaultProps = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  stroke: "rgb(0,0,0)",
  strokeWidth: 2,
  opacity: 1
};

exports.default = Line;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
class Color {

  constructor(red, green, blue) {
    this.red = red
    this.green = green
    this.blue = blue
  }

  rgb() {
    let str = "rgb("
    str += String(Math.round(this.red)) + ","
    str += String(Math.round(this.green)) + ","
    str += String(Math.round(this.blue)) + ")"
    return str
  }

  endpoint(slopeRed, slopeGreen, slopeBlue) {
    let tredNeg = this.red / slopeRed
    let tredPos = (255 - this.red) / slopeRed
    if (slopeRed == 0) {
      tredNeg = -1
      tredPos = -1
    }

    let tgreenNeg = this.green / slopeGreen
    let tgreenPos = (255 - this.green) / slopeGreen
    if (slopeGreen == 0) {
      tgreenNeg = -1
      tgreenPos = -1
    }

    let tblueNeg = this.blue / slopeBlue
    let tbluePos = (255 - this.blue) / slopeBlue
    if (slopeBlue == 0) {
      tblueNeg = -1
      tbluePos = -1
    }

    let t = [tredNeg, tredPos, tgreenNeg, tgreenPos, tblueNeg, tbluePos]

    let keys = []
    for (var k=0; k < 6; k++) {
      if (t[k] >= 0) {
        keys.push(k)
      }
    }

    if (keys.length == 0) {
      return this
    }

    let tmin = t[keys[0]]
    let tind = keys[0]
    for (var ki=0; ki < keys.length; ki++) {
      if (t[keys[ki]] < tmin) {
        tind = keys[ki]
        tmin = t[tind]
      }
    }

    let sign = 1
    if (tind % 2 == 0) {
      sign = -1
    }
    let red = this.red + tmin * sign * slopeRed
    let green = this.green + tmin * sign * slopeGreen
    let blue = this.blue + tmin * sign * slopeBlue
    let end = new Color(red, green, blue)
    return end
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Color);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Line = __webpack_require__(1);

var _Line2 = _interopRequireDefault(_Line);

var _Axis = __webpack_require__(4);

var _Axis2 = _interopRequireDefault(_Axis);

var _Legend = __webpack_require__(5);

var _Legend2 = _interopRequireDefault(_Legend);

var _Color = __webpack_require__(2);

var _Color2 = _interopRequireDefault(_Color);

var _ColorPalette = __webpack_require__(8);

var _ColorPalette2 = _interopRequireDefault(_ColorPalette);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defPalette = ["#4cab92", "#ca0004", "#003953", "#eccc00", "#9dbd5f", "#0097bf", "#005c7a", "#fc6000"];

var Point = function (_React$Component) {
  _inherits(Point, _React$Component);

  function Point() {
    _classCallCheck(this, Point);

    return _possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).apply(this, arguments));
  }

  _createClass(Point, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "g",
        null,
        _react2.default.createElement("circle", { cx: this.props.x, cy: this.props.y, r: this.props.radius,
          stroke: this.props.color, fill: this.props.color })
      );
    }
  }]);

  return Point;
}(_react2.default.Component);

var PointSeries = function (_React$Component2) {
  _inherits(PointSeries, _React$Component2);

  function PointSeries() {
    _classCallCheck(this, PointSeries);

    return _possibleConstructorReturn(this, (PointSeries.__proto__ || Object.getPrototypeOf(PointSeries)).apply(this, arguments));
  }

  _createClass(PointSeries, [{
    key: "render",
    value: function render() {
      var series = [];
      for (var i = 0; i < this.props.points.length; i++) {
        series.push(_react2.default.createElement(Point, { x: this.props.points[i][0], y: this.props.points[i][1],
          radius: 2, color: this.props.color }));
      }

      return _react2.default.createElement(
        "g",
        null,
        series
      );
    }
  }]);

  return PointSeries;
}(_react2.default.Component);

var ScatterPlot = function (_React$Component3) {
  _inherits(ScatterPlot, _React$Component3);

  function ScatterPlot() {
    _classCallCheck(this, ScatterPlot);

    return _possibleConstructorReturn(this, (ScatterPlot.__proto__ || Object.getPrototypeOf(ScatterPlot)).apply(this, arguments));
  }

  _createClass(ScatterPlot, [{
    key: "render",
    value: function render() {
      var data = JSON.parse(JSON.stringify(this.props.data));
      var xKey = this.props.xKey;
      var yKey = this.props.yKey;
      var xvals = data.map(function (d) {
        return parseFloat(d[xKey]);
      });
      var yvals = data.map(function (d) {
        return parseFloat(d[yKey]);
      });

      var maxX = Math.max.apply(Math, xvals);
      var minX = Math.min.apply(Math, xvals);
      var maxY = Math.max.apply(Math, yvals);
      var minY = Math.min.apply(Math, yvals);

      var buffer = 80;

      var chartWidth = this.props.width - 2 * buffer;
      var chartHeight = this.props.height - 2 * buffer - 30;
      var chartX = buffer + 10;
      var chartY = buffer;

      var chart = [];

      var xl = this.props.xLabel;
      if (xl != "off") {
        xl = this.props.xKey;
      }
      var yl = this.props.yLabel;
      if (yl != "off") {
        yl = this.props.yKey;
      }
      chart.push(_react2.default.createElement(_Axis2.default, { key: "axis", x: chartX, y: chartY, width: chartWidth, height: chartHeight,
        color: this.props.axisColor, scale: this.props.scale, grid: this.props.grid,
        xLabel: xl, yLabel: yl,
        xSteps: this.props.xSteps, xTicks: this.props.xTicks, xAxisLine: this.props.xAxisLine,
        yTicks: this.props.yTicks, ySteps: Math.round(chartHeight / 50) + 1, yAxisLine: this.props.yAxisLine,
        maxX: maxX, minX: minX, maxY: maxY, minY: minY }));

      var sets = [];
      var setTitles = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var member = _step.value;

          var key = setTitles.indexOf(member[this.props.titleKey]);

          var widthRatio = (parseFloat(member[this.props.xKey]) - minX) / (maxX - minX);
          var modX = widthRatio * chartWidth + chartX;

          var heightRatio = 0;
          if (this.props.scale == "log") {
            var logDiff = Math.log10(parseFloat(member[this.props.yKey])) - Math.log10(minY);
            heightRatio = logDiff / (Math.log10(maxY) - Math.log10(minY));
          } else {
            heightRatio = (parseFloat(member[this.props.yKey]) - minY) / (maxY - minY);
          }
          var modY = chartHeight - heightRatio * chartHeight + chartY;

          if (key != -1) {
            sets[key].push([modX, modY]);
          } else {
            setTitles.push(member[this.props.titleKey]);
            sets.push([[modX, modY]]);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var numsets = setTitles.length;
      for (var i = 0; i < numsets; i++) {
        chart.push(_react2.default.createElement(PointSeries, { points: sets[i], color: this.props.color[i % this.props.color.length] }));
      }

      chart.push(_react2.default.createElement(_Legend2.default, { key: "legend", x: chartX, y: chartY + chartHeight + buffer, width: chartWidth,
        titles: setTitles, color: this.props.color, legendColor: this.props.legendColor }));

      return _react2.default.createElement(
        "svg",
        { width: this.props.width, height: this.props.height },
        chart
      );
    }
  }]);

  return ScatterPlot;
}(_react2.default.Component);

ScatterPlot.defaultProps = {
  width: 800,
  height: 600,
  scale: "default",
  xSteps: 4,
  xTicks: "off",
  xAxisLine: "on",
  xLabel: "off",
  ySteps: 7,
  yTicks: "off",
  yAxisLine: "off",
  yLabel: "off",
  grid: "default",
  legend: "default",
  legendColor: "#000000",
  color: defPalette,
  axisColor: "#000000"
};

exports.default = ScatterPlot;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _humanizePlus = __webpack_require__(7);

var _humanizePlus2 = _interopRequireDefault(_humanizePlus);

var _Line = __webpack_require__(1);

var _Line2 = _interopRequireDefault(_Line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XTickLabel = function (_React$Component) {
  _inherits(XTickLabel, _React$Component);

  function XTickLabel() {
    _classCallCheck(this, XTickLabel);

    return _possibleConstructorReturn(this, (XTickLabel.__proto__ || Object.getPrototypeOf(XTickLabel)).apply(this, arguments));
  }

  _createClass(XTickLabel, [{
    key: "render",
    value: function render() {
      var rotation = "rotate(" + this.props.tilt + "," + this.props.x + "," + (this.props.y + this.props.size) + ")";

      var printVal = String(this.props.value);
      if (printVal.length > 4) {
        printVal = _humanizePlus2.default.compactInteger(this.props.value, 2);
      }

      return _react2.default.createElement(
        "g",
        null,
        _react2.default.createElement(
          "text",
          { x: this.props.x, y: this.props.y + 2 * this.props.size, fontSize: this.props.size, transform: rotation, fill: this.props.color, textAnchor: "middle" },
          printVal
        )
      );
    }
  }]);

  return XTickLabel;
}(_react2.default.Component);

var XStep = function (_React$Component2) {
  _inherits(XStep, _React$Component2);

  function XStep() {
    _classCallCheck(this, XStep);

    return _possibleConstructorReturn(this, (XStep.__proto__ || Object.getPrototypeOf(XStep)).apply(this, arguments));
  }

  _createClass(XStep, [{
    key: "render",
    value: function render() {
      var step = [];

      if (this.props.xTicks == "on") {
        step.push(_react2.default.createElement(_Line2.default, { key: "label" + this.props.x,
          x1: this.props.x, y1: this.props.y,
          x2: this.props.x, y2: this.props.y + this.props.length,
          stroke: this.props.color }));
      }

      step.push(_react2.default.createElement(XTickLabel, { key: "label" + this.props.x,
        x: this.props.x, y: this.props.y,
        value: this.props.value, size: 15, tilt: 0, color: this.props.color }));

      return _react2.default.createElement(
        "g",
        null,
        step
      );
    }
  }]);

  return XStep;
}(_react2.default.Component);

var XAxis = function (_React$Component3) {
  _inherits(XAxis, _React$Component3);

  function XAxis() {
    _classCallCheck(this, XAxis);

    return _possibleConstructorReturn(this, (XAxis.__proto__ || Object.getPrototypeOf(XAxis)).apply(this, arguments));
  }

  _createClass(XAxis, [{
    key: "render",
    value: function render() {
      var xAxis = [];

      if (this.props.xAxisLine) {
        xAxis.push(_react2.default.createElement(_Line2.default, { key: "xline", x1: this.props.x, y1: this.props.y + this.props.height,
          x2: this.props.x + this.props.width, y2: this.props.y + this.props.height,
          stroke: this.props.color }));
      }

      if (this.props.xLabel != "off") {
        xAxis.push(_react2.default.createElement(
          "text",
          { key: "xlabel",
            x: this.props.x + this.props.width / 2, y: this.props.y + this.props.height + 50,
            fontSize: 18, fill: this.props.color },
          this.props.xLabel
        ));
      }

      var xSpace = this.props.width / (this.props.xSteps - 1);
      for (var i = 0; i < this.props.xSteps; i++) {
        var valueRatio = (this.props.maxX - this.props.minX) / (this.props.xSteps - 1);
        var xVal = this.props.minX + i * valueRatio;
        xAxis.push(_react2.default.createElement(XStep, { key: "xstep" + i, x: this.props.x + i * xSpace, y: this.props.y + this.props.height,
          value: xVal, length: 10, xTicks: this.props.xTicks, color: this.props.color }));
      }

      return _react2.default.createElement(
        "g",
        null,
        xAxis
      );
    }
  }]);

  return XAxis;
}(_react2.default.Component);

var YTickLabel = function (_React$Component4) {
  _inherits(YTickLabel, _React$Component4);

  function YTickLabel() {
    _classCallCheck(this, YTickLabel);

    return _possibleConstructorReturn(this, (YTickLabel.__proto__ || Object.getPrototypeOf(YTickLabel)).apply(this, arguments));
  }

  _createClass(YTickLabel, [{
    key: "render",
    value: function render() {
      var printVal = this.props.value;
      if (this.props.value >= 1) {
        printVal = _humanizePlus2.default.compactInteger(this.props.value, 2);
      } else {
        printVal = this.props.value.toFixed(4);
      }

      return _react2.default.createElement(
        "g",
        null,
        _react2.default.createElement(
          "text",
          { x: this.props.x, y: this.props.y + this.props.size / 2, fontSize: this.props.size, fill: this.props.color, textAnchor: "end" },
          printVal
        )
      );
    }
  }]);

  return YTickLabel;
}(_react2.default.Component);

var YStep = function (_React$Component5) {
  _inherits(YStep, _React$Component5);

  function YStep() {
    _classCallCheck(this, YStep);

    return _possibleConstructorReturn(this, (YStep.__proto__ || Object.getPrototypeOf(YStep)).apply(this, arguments));
  }

  _createClass(YStep, [{
    key: "render",
    value: function render() {
      var step = [];

      if (this.props.yTicks == "on") {
        step.push(_react2.default.createElement(_Line2.default, { key: "tick" + this.props.y,
          x1: this.props.x, y1: this.props.y,
          x2: this.props.x - this.props.length, y2: this.props.y,
          stroke: this.props.color }));
      }

      step.push(_react2.default.createElement(YTickLabel, { key: "label" + this.props.y, x: this.props.x - 10, y: this.props.y, value: this.props.value, size: 15, color: this.props.color }));
      return _react2.default.createElement(
        "g",
        null,
        step
      );
    }
  }]);

  return YStep;
}(_react2.default.Component);

var YAxis = function (_React$Component6) {
  _inherits(YAxis, _React$Component6);

  function YAxis() {
    _classCallCheck(this, YAxis);

    return _possibleConstructorReturn(this, (YAxis.__proto__ || Object.getPrototypeOf(YAxis)).apply(this, arguments));
  }

  _createClass(YAxis, [{
    key: "render",
    value: function render() {
      var yAxis = [];

      if (this.props.yAxisLine == "on") {
        yAxis.push(_react2.default.createElement(_Line2.default, { key: "yline", x1: this.props.x, y1: this.props.y,
          x2: this.props.x, y2: this.props.y + this.props.height,
          stroke: this.props.color }));
      }

      if (this.props.yLabel != "off") {
        var rotation = "rotate(-90,10," + String(this.props.y + this.props.height / 2) + ")";
        yAxis.push(_react2.default.createElement(
          "text",
          { key: "ylabel",
            x: 0, y: this.props.y + this.props.height / 2 + 10,
            fontSize: 18, transform: rotation, fill: this.props.color },
          this.props.yLabel
        ));
      }

      var ySpace = this.props.height / (this.props.ySteps - 1);
      for (var i = 0; i < this.props.ySteps; i++) {
        var tickPos = this.props.height + this.props.y - i * ySpace;

        var yVal = 0;
        if (this.props.scale == "log") {
          var valueRatio = (Math.log10(this.props.maxY) - Math.log10(this.props.minY)) / (this.props.ySteps - 1);
          var pow10 = Math.log10(this.props.minY) + i * valueRatio;
          yVal = Math.pow(10, pow10);
        } else {
          yVal = this.props.minY + i * (this.props.maxY - this.props.minY) / (this.props.ySteps - 1);
        }
        yAxis.push(_react2.default.createElement(YStep, { key: "ystep" + i, x: this.props.x, y: tickPos,
          value: yVal, length: 10, color: this.props.color, yTicks: this.props.yTicks }));

        if (this.props.grid == "default") {
          if (i != 0) {
            yAxis.push(_react2.default.createElement(_Line2.default, { key: "grid" + i, x1: this.props.x, y1: tickPos,
              x2: this.props.x + this.props.width, y2: tickPos,
              stroke: this.props.gridColor, strokeWidth: 1, opacity: 0.5 }));
          }
        }
      }

      return _react2.default.createElement(
        "g",
        null,
        yAxis
      );
    }
  }]);

  return YAxis;
}(_react2.default.Component);

var Axis = function (_React$Component7) {
  _inherits(Axis, _React$Component7);

  function Axis() {
    _classCallCheck(this, Axis);

    return _possibleConstructorReturn(this, (Axis.__proto__ || Object.getPrototypeOf(Axis)).apply(this, arguments));
  }

  _createClass(Axis, [{
    key: "render",
    value: function render() {
      var axis = [];

      axis.push(_react2.default.createElement(XAxis, { key: "xaxis", x: this.props.x, y: this.props.y,
        width: this.props.width, height: this.props.height,
        xLabel: this.props.xLabel, xTicks: this.props.xTicks, xSteps: this.props.xSteps,
        maxX: this.props.maxX, minX: this.props.minX, color: this.props.color,
        xAxisLine: this.props.xAxisLine }));

      axis.push(_react2.default.createElement(YAxis, { key: "yaxis", x: this.props.x, y: this.props.y,
        width: this.props.width, height: this.props.height,
        yLabel: this.props.yLabel, ySteps: this.props.ySteps, yTicks: this.props.yTicks,
        maxY: this.props.maxY, minY: this.props.minY,
        scale: this.props.scale, grid: this.props.grid, gridColor: this.props.gridColor,
        color: this.props.color, yAxisLine: this.props.yAxisLine }));

      return _react2.default.createElement(
        "g",
        null,
        axis
      );
    }
  }]);

  return Axis;
}(_react2.default.Component);

Axis.defaultProps = {
  x: 0,
  y: 0,
  width: 800,
  height: 600,
  color: "#000000",
  scale: "lin",
  grid: "default",
  gridColor: "#DDDDDD",
  xLabel: "off",
  yLabel: "off",
  xSteps: 5,
  xTicks: "off",
  xAxisLine: "on",
  ySteps: 5,
  yTicks: "off",
  yAxisLine: "off",
  maxX: 100,
  minX: 0,
  maxY: 100,
  minY: 0
};

exports.default = Axis;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Legend = function (_React$Component) {
  _inherits(Legend, _React$Component);

  function Legend() {
    _classCallCheck(this, Legend);

    return _possibleConstructorReturn(this, (Legend.__proto__ || Object.getPrototypeOf(Legend)).apply(this, arguments));
  }

  _createClass(Legend, [{
    key: "render",
    value: function render() {
      var segment = this.props.width / this.props.titles.length;

      var legend = [];
      for (var i = 0; i < this.props.titles.length; i++) {
        legend.push(_react2.default.createElement("rect", { key: "color" + i, x: this.props.x + i * segment, y: this.props.y - 8,
          width: 15, height: 15, fill: this.props.color[i % this.props.color.length] }));
        legend.push(_react2.default.createElement(
          "text",
          { key: "label" + i, x: this.props.x + i * segment + 25, y: this.props.y + 5,
            fontSize: 15, fill: this.props.legendColor },
          this.props.titles[i]
        ));
      }

      return _react2.default.createElement(
        "g",
        null,
        legend
      );
    }
  }]);

  return Legend;
}(_react2.default.Component);

exports.default = Legend;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ScatterPlot = __webpack_require__(3);

var _ScatterPlot2 = _interopRequireDefault(_ScatterPlot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ScatterPlot2.default;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* humanize.js - v1.8.2 */


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/**
 * Copyright 2013-2016 HubSpotDev
 * MIT Licensed
 *
 * @module humanize.js
 */

(function (root, factory) {
  if (( false ? 'undefined' : _typeof(exports)) === 'object') {
    module.exports = factory();
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return root.Humanize = factory();
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    root.Humanize = factory();
  }
})(this, function () {
  //------------------------------------------------------------------------------
  // Constants
  //------------------------------------------------------------------------------

  var TIME_FORMATS = [{
    name: 'second',
    value: 1e3
  }, {
    name: 'minute',
    value: 6e4
  }, {
    name: 'hour',
    value: 36e5
  }, {
    name: 'day',
    value: 864e5
  }, {
    name: 'week',
    value: 6048e5
  }];

  var LABELS_FOR_POWERS_OF_KILO = {
    P: Math.pow(2, 50),
    T: Math.pow(2, 40),
    G: Math.pow(2, 30),
    M: Math.pow(2, 20)
  };

  //------------------------------------------------------------------------------
  // Helpers
  //------------------------------------------------------------------------------

  var exists = function exists(maybe) {
    return typeof maybe !== 'undefined' && maybe !== null;
  };

  var isNaN = function isNaN(value) {
    return value !== value;
  }; // eslint-disable-line

  var isFiniteNumber = function isFiniteNumber(value) {
    return isFinite(value) && !isNaN(parseFloat(value));
  };

  var isArray = function isArray(value) {
    var type = Object.prototype.toString.call(value);
    return type === '[object Array]';
  };

  //------------------------------------------------------------------------------
  // Humanize
  //------------------------------------------------------------------------------

  var Humanize = {

    // Converts a large integer to a friendly text representation.

    intword: function intword(number, charWidth) {
      var decimals = arguments.length <= 2 || arguments[2] === undefined ? 2 : arguments[2];

      /*
      * This method is deprecated. Please use compactInteger instead.
      * intword will be going away in the next major version.
      */
      return Humanize.compactInteger(number, decimals);
    },


    // Converts an integer into its most compact representation
    compactInteger: function compactInteger(input) {
      var decimals = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      decimals = Math.max(decimals, 0);
      var number = parseInt(input, 10);
      var signString = number < 0 ? '-' : '';
      var unsignedNumber = Math.abs(number);
      var unsignedNumberString = String(unsignedNumber);
      var numberLength = unsignedNumberString.length;
      var numberLengths = [13, 10, 7, 4];
      var bigNumPrefixes = ['T', 'B', 'M', 'k'];

      // small numbers
      if (unsignedNumber < 1000) {
        return '' + signString + unsignedNumberString;
      }

      // really big numbers
      if (numberLength > numberLengths[0] + 3) {
        return number.toExponential(decimals).replace('e+', 'x10^');
      }

      // 999 < unsignedNumber < 999,999,999,999,999
      var length = void 0;
      for (var i = 0; i < numberLengths.length; i++) {
        var _length = numberLengths[i];
        if (numberLength >= _length) {
          length = _length;
          break;
        }
      }

      var decimalIndex = numberLength - length + 1;
      var unsignedNumberCharacterArray = unsignedNumberString.split('');

      var wholePartArray = unsignedNumberCharacterArray.slice(0, decimalIndex);
      var decimalPartArray = unsignedNumberCharacterArray.slice(decimalIndex, decimalIndex + decimals + 1);

      var wholePart = wholePartArray.join('');

      // pad decimalPart if necessary
      var decimalPart = decimalPartArray.join('');
      if (decimalPart.length < decimals) {
        decimalPart += '' + Array(decimals - decimalPart.length + 1).join('0');
      }

      var output = void 0;
      if (decimals === 0) {
        output = '' + signString + wholePart + bigNumPrefixes[numberLengths.indexOf(length)];
      } else {
        var outputNumber = Number(wholePart + '.' + decimalPart).toFixed(decimals);
        output = '' + signString + outputNumber + bigNumPrefixes[numberLengths.indexOf(length)];
      }

      return output;
    },


    // Converts an integer to a string containing commas every three digits.
    intComma: function intComma(number) {
      var decimals = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      return Humanize.formatNumber(number, decimals);
    },
    intcomma: function intcomma() {
      return Humanize.intComma.apply(Humanize, arguments);
    },


    // Formats the value like a 'human-readable' file size (i.e. '13 KB', '4.1 MB', '102 bytes', etc).
    fileSize: function fileSize(filesize) {
      var precision = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

      for (var label in LABELS_FOR_POWERS_OF_KILO) {
        if (LABELS_FOR_POWERS_OF_KILO.hasOwnProperty(label)) {
          var minnum = LABELS_FOR_POWERS_OF_KILO[label];
          if (filesize >= minnum) {
            return Humanize.formatNumber(filesize / minnum, precision, '') + ' ' + label + 'B';
          }
        }
      }
      if (filesize >= 1024) {
        return Humanize.formatNumber(filesize / 1024, 0) + ' KB';
      }

      return Humanize.formatNumber(filesize, 0) + Humanize.pluralize(filesize, ' byte');
    },
    filesize: function filesize() {
      return Humanize.fileSize.apply(Humanize, arguments);
    },


    // Formats a number to a human-readable string.
    // Localize by overriding the precision, thousand and decimal arguments.
    formatNumber: function formatNumber(number) {
      var precision = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var thousand = arguments.length <= 2 || arguments[2] === undefined ? ',' : arguments[2];
      var decimal = arguments.length <= 3 || arguments[3] === undefined ? '.' : arguments[3];

      // Create some private utility functions to make the computational
      // code that follows much easier to read.
      var firstComma = function firstComma(_number, _thousand, _position) {
        return _position ? _number.substr(0, _position) + _thousand : '';
      };

      var commas = function commas(_number, _thousand, _position) {
        return _number.substr(_position).replace(/(\d{3})(?=\d)/g, '$1' + _thousand);
      };

      var decimals = function decimals(_number, _decimal, usePrecision) {
        return usePrecision ? _decimal + Humanize.toFixed(Math.abs(_number), usePrecision).split('.')[1] : '';
      };

      var usePrecision = Humanize.normalizePrecision(precision);

      // Do some calc
      var negative = number < 0 && '-' || '';
      var base = String(parseInt(Humanize.toFixed(Math.abs(number || 0), usePrecision), 10));
      var mod = base.length > 3 ? base.length % 3 : 0;

      // Format the number
      return negative + firstComma(base, thousand, mod) + commas(base, thousand, mod) + decimals(number, decimal, usePrecision);
    },


    // Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61')
    toFixed: function toFixed(value, precision) {
      precision = exists(precision) ? precision : Humanize.normalizePrecision(precision, 0);
      var power = Math.pow(10, precision);

      // Multiply up by precision, round accurately, then divide and use native toFixed()
      return (Math.round(value * power) / power).toFixed(precision);
    },


    // Ensures precision value is a positive integer
    normalizePrecision: function normalizePrecision(value, base) {
      value = Math.round(Math.abs(value));
      return isNaN(value) ? base : value;
    },


    // Converts an integer to its ordinal as a string.
    ordinal: function ordinal(value) {
      var number = parseInt(value, 10);

      if (number === 0) {
        return value;
      }

      var specialCase = number % 100;
      if ([11, 12, 13].indexOf(specialCase) >= 0) {
        return number + 'th';
      }

      var leastSignificant = number % 10;

      var end = void 0;
      switch (leastSignificant) {
        case 1:
          end = 'st';
          break;
        case 2:
          end = 'nd';
          break;
        case 3:
          end = 'rd';
          break;
        default:
          end = 'th';
      }

      return '' + number + end;
    },


    // Interprets numbers as occurences. Also accepts an optional array/map of overrides.
    times: function times(value) {
      var overrides = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      if (isFiniteNumber(value) && value >= 0) {
        var number = parseFloat(value);
        var smallTimes = ['never', 'once', 'twice'];
        if (exists(overrides[number])) {
          return String(overrides[number]);
        }

        var numberString = exists(smallTimes[number]) && smallTimes[number].toString();
        return numberString || number.toString() + ' times';
      }
      return null;
    },


    // Returns the plural version of a given word if the value is not 1. The default suffix is 's'.
    pluralize: function pluralize(number, singular, plural) {
      if (!(exists(number) && exists(singular))) {
        return null;
      }

      plural = exists(plural) ? plural : singular + 's';

      return parseInt(number, 10) === 1 ? singular : plural;
    },


    // Truncates a string if it is longer than the specified number of characters (inclusive).
    // Truncated strings will end with a translatable ellipsis sequence ("…").
    truncate: function truncate(str) {
      var length = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];
      var ending = arguments.length <= 2 || arguments[2] === undefined ? '...' : arguments[2];

      if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
      }
      return str;
    },


    // Truncates a string after a certain number of words.
    truncateWords: function truncateWords(string, length) {
      var array = string.split(' ');
      var result = '';
      var i = 0;

      while (i < length) {
        if (exists(array[i])) {
          result += array[i] + ' ';
        }
        i++;
      }

      if (array.length > length) {
        return result + '...';
      }

      return null;
    },
    truncatewords: function truncatewords() {
      return Humanize.truncateWords.apply(Humanize, arguments);
    },


    // Truncates a number to an upper bound.
    boundedNumber: function boundedNumber(num) {
      var bound = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];
      var ending = arguments.length <= 2 || arguments[2] === undefined ? '+' : arguments[2];

      var result = void 0;

      if (isFiniteNumber(num) && isFiniteNumber(bound)) {
        if (num > bound) {
          result = bound + ending;
        }
      }

      return (result || num).toString();
    },
    truncatenumber: function truncatenumber() {
      return Humanize.boundedNumber.apply(Humanize, arguments);
    },


    // Converts a list of items to a human readable string with an optional limit.
    oxford: function oxford(items, limit, limitStr) {
      var numItems = items.length;

      var limitIndex = void 0;
      if (numItems < 2) {
        return String(items);
      } else if (numItems === 2) {
        return items.join(' and ');
      } else if (exists(limit) && numItems > limit) {
        var extra = numItems - limit;
        limitIndex = limit;
        limitStr = exists(limitStr) ? limitStr : ', and ' + extra + ' ' + Humanize.pluralize(extra, 'other');
      } else {
        limitIndex = -1;
        limitStr = ', and ' + items[numItems - 1];
      }

      return items.slice(0, limitIndex).join(', ') + limitStr;
    },


    // Converts an object to a definition-like string
    dictionary: function dictionary(object) {
      var joiner = arguments.length <= 1 || arguments[1] === undefined ? ' is ' : arguments[1];
      var separator = arguments.length <= 2 || arguments[2] === undefined ? ', ' : arguments[2];

      var result = '';

      if (exists(object) && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && !isArray(object)) {
        var defs = [];
        for (var key in object) {
          if (object.hasOwnProperty(key)) {
            var val = object[key];
            defs.push('' + key + joiner + val);
          }
        }

        return defs.join(separator);
      }

      return result;
    },


    // Describes how many times an item appears in a list
    frequency: function frequency(list, verb) {
      if (!isArray(list)) {
        return null;
      }

      var len = list.length;
      var times = Humanize.times(len);

      if (len === 0) {
        return times + ' ' + verb;
      }

      return verb + ' ' + times;
    },
    pace: function pace(value, intervalMs) {
      var unit = arguments.length <= 2 || arguments[2] === undefined ? 'time' : arguments[2];

      if (value === 0 || intervalMs === 0) {
        // Needs a better string than this...
        return 'No ' + Humanize.pluralize(0, unit);
      }

      // Expose these as overridables?
      var prefix = 'Approximately';
      var timeUnit = void 0;
      var relativePace = void 0;

      var rate = value / intervalMs;
      for (var i = 0; i < TIME_FORMATS.length; ++i) {
        // assumes sorted list
        var f = TIME_FORMATS[i];
        relativePace = rate * f.value;
        if (relativePace > 1) {
          timeUnit = f.name;
          break;
        }
      }

      // Use the last time unit if there is nothing smaller
      if (!timeUnit) {
        prefix = 'Less than';
        relativePace = 1;
        timeUnit = TIME_FORMATS[TIME_FORMATS.length - 1].name;
      }

      var roundedPace = Math.round(relativePace);
      unit = Humanize.pluralize(roundedPace, unit);

      return prefix + ' ' + roundedPace + ' ' + unit + ' per ' + timeUnit;
    },


    // Converts newlines to <br/> tags
    nl2br: function nl2br(string) {
      var replacement = arguments.length <= 1 || arguments[1] === undefined ? '<br/>' : arguments[1];

      return string.replace(/\n/g, replacement);
    },


    // Converts <br/> tags to newlines
    br2nl: function br2nl(string) {
      var replacement = arguments.length <= 1 || arguments[1] === undefined ? '\r\n' : arguments[1];

      return string.replace(/\<br\s*\/?\>/g, replacement);
    },


    // Capitalizes first letter in a string
    capitalize: function capitalize(string) {
      var downCaseTail = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      return '' + string.charAt(0).toUpperCase() + (downCaseTail ? string.slice(1).toLowerCase() : string.slice(1));
    },


    // Capitalizes the first letter of each word in a string
    capitalizeAll: function capitalizeAll(string) {
      return string.replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
      });
    },


    // Titlecase words in a string.
    titleCase: function titleCase(string) {
      var smallWords = /\b(a|an|and|at|but|by|de|en|for|if|in|of|on|or|the|to|via|vs?\.?)\b/i;
      var internalCaps = /\S+[A-Z]+\S*/;
      var splitOnWhiteSpaceRegex = /\s+/;
      var splitOnHyphensRegex = /-/;

      var _doTitleCase = void 0;
      _doTitleCase = function doTitleCase(_string) {
        var hyphenated = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        var firstOrLast = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

        var titleCasedArray = [];
        var stringArray = _string.split(hyphenated ? splitOnHyphensRegex : splitOnWhiteSpaceRegex);

        for (var index = 0; index < stringArray.length; ++index) {
          var word = stringArray[index];
          if (word.indexOf('-') !== -1) {
            titleCasedArray.push(_doTitleCase(word, true, index === 0 || index === stringArray.length - 1));
            continue;
          }

          if (firstOrLast && (index === 0 || index === stringArray.length - 1)) {
            titleCasedArray.push(internalCaps.test(word) ? word : Humanize.capitalize(word));
            continue;
          }

          if (internalCaps.test(word)) {
            titleCasedArray.push(word);
          } else if (smallWords.test(word)) {
            titleCasedArray.push(word.toLowerCase());
          } else {
            titleCasedArray.push(Humanize.capitalize(word));
          }
        }

        return titleCasedArray.join(hyphenated ? '-' : ' ');
      };

      return _doTitleCase(string);
    },
    titlecase: function titlecase() {
      return Humanize.titleCase.apply(Humanize, arguments);
    }
  };

  return Humanize;
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Color_js__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["default"] = ColorPalette;


function ColorPalette (color1, color2, numcolors) {
  let dred = color2.red - color1.red
  let dgreen = color2.green - color1.green
  let dblue = color2.blue - color1.blue

  let slopeRed = Math.abs(dred / 255)
  let slopeGreen = Math.abs(dgreen / 255)
  let slopeBlue = Math.abs(dblue / 255)

  let end1 = color1.endpoint(slopeRed, slopeGreen, slopeBlue)
  let end2 = color2.endpoint(slopeRed, slopeGreen, slopeBlue)

  let palette = []
  for (var i=0; i < numcolors; i++) {
    let r = end1.red + i*(end2.red - end1.red)/numcolors
    let g = end1.green + i*(end2.green - end1.green)/numcolors
    let b = end1.blue + i*(end2.blue - end1.blue)/numcolors
    let c = new __WEBPACK_IMPORTED_MODULE_0__Color_js__["default"](r,g,b)
    palette.push(c.rgb())
  }
  return palette
}


/***/ })
/******/ ]);
});