'use strict';

window.map = (function () {
  var cardElement;
  var map = document.querySelector('.map');

  var howToCreateMap = function () {
    if (cardElement) {
      cardElement.remove();
    }
  };

  var deactivationPin = function () {
    var markActive = map.querySelector('.map__pin--active');
    if (markActive) {
      markActive.classList.remove('map__pin--active');
    }
  };

  var closeElementClickMouse = function (element, elementClick) {
    var popupClose = map.querySelector('.popup__close');
    popupClose.addEventListener(element, function (evt) {
      if (evt.which === elementClick) {
        cardElement.remove();
        deactivationPin();
      }
    });
  };

  var closeElementClickKey = function (element, elementClick) {
    map.addEventListener(element, function (evt) {
      if (evt.keyCode === elementClick) {
        cardElement.remove();
        deactivationPin();
      }
    });
  };

  var createPinCard = function (item) {
    item.addEventListener('click', function () {
      deactivationPin();

      item.classList.add('map__pin--active');
      var numberId = item.getAttribute('id');

      window.map.howToCreateMap();

      cardElement = window.drawingCard.createNewCard(window.main.newArrayOfAds[numberId]);

      closeElementClickMouse('mousedown', window.main.MAIN_MOUSE_BUTTON);
      closeElementClickKey('keydown', window.main.KEY_ESC);
    });
  };

  var doWhenClicked = function () {
    var marksId = document.querySelectorAll('.map__pin-generated');

    marksId.forEach(createPinCard);
  };

  return {
    doWhenClicked: doWhenClicked,
    howToCreateMap: howToCreateMap
  };
})();
