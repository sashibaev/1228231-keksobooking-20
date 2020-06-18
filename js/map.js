'use strict';

window.map = (function () {
  var cardElement;
  var activeMode = false;
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

  var createPinCard = function (item) {
    item.addEventListener('click', function () {
      var numberId = item.getAttribute('id');

      if (cardElement) {
        cardElement.remove();
      }

      cardElement = window.drawingCard.createNewCard(numberId);
      cardElement.classList.remove('visually-hidden');

      var popupClose = map.querySelector('.popup__close');

      popupClose.addEventListener('mousedown', function (evt) {
        if (evt.which === 1) {
          cardElement.remove();
        }
      });
    });
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.which === 1 && activeMode === false) {
      window.main.pageActivation();
      activeMode = true;
    }
    var pinId = document.querySelectorAll('.map__pin-generated');

    pinId.forEach(createPinCard);
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13 && activeMode === false) {
      window.main.pageActivation();
      activeMode = true;
    }
    var pinId = document.querySelectorAll('.map__pin-generated');

    pinId.forEach(createPinCard);
  });

  map.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      cardElement.remove();
    }
  });
})();
