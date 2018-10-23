(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['./outputBabel'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('./outputBabel'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.outputBabel);
    global.test = mod.exports;
  }
})(this, function (_outputBabel) {
  'use strict';

  // calendar();

  console.log(_outputBabel.num); // import calendar from './calendarBabel'
});
