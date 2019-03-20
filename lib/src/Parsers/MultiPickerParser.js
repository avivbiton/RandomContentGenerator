"use strict";

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Parser_1 = require("./Parser");

var utils_1 = require("../utils");

var MultiPickerParser =
/** @class */
function (_super) {
  __extends(MultiPickerParser, _super);

  function MultiPickerParser() {
    var _this = _super.call(this) || this;

    _this.options = new Array();
    return _this;
  }

  MultiPickerParser.prototype.parse = function () {
    var parsedString = ""; // pick one string from each array at random

    for (var i = 0; i < this.options.length; i++) {
      var currentArray = this.options[i];
      parsedString += currentArray[utils_1.randomNumber(0, currentArray.length)];
    }

    return parsedString;
  };

  MultiPickerParser.prototype.cloneObject = function (data) {
    var newParser = new MultiPickerParser();
    newParser.options = data["options"];
    return newParser;
  };

  return MultiPickerParser;
}(Parser_1.Parser);

exports.MultiPickerParser = MultiPickerParser;