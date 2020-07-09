'use strict';

window.util = (function () {
  var mouseAddEventListener = function (body, element, elementClick) {
    body.addEventListener('mousedown', function (evt) {
      if (evt.which === elementClick) {
        element.remove();
      }
    });
  };

  var keyAddEventListener = function (body, element, key) {
    body.addEventListener('keydown', function (evt) {
      if (evt.keyCode === key) {
        element.remove();
      }
    });
  };

  return {
    mouseAddEventListener: mouseAddEventListener,
    keyAddEventListener: keyAddEventListener
  };
})();
