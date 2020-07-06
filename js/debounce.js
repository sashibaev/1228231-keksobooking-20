'use strict';

window.debounce = (function () {
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;

  var debounceFilter = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  return {
    debounceFilter: debounceFilter
  };
})();
