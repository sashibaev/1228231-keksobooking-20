'use strict';

window.map = (function () {
  var cardElement;
  var activeMode = false;
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

  var createPinCard = function (item) {
    item.addEventListener('click', function () {
      var pinAll = map.querySelectorAll('.map__pin');
      for (var i = 0; i < pinAll.length; i++) {
        pinAll[i].classList.remove('map__pin--active');
      }
      item.classList.add('map__pin--active');
      var numberId = item.getAttribute('id');

      if (cardElement) {
        cardElement.remove();
      }

      window.load(function (aannouncement) {
        cardElement = window.drawingCard.createNewCard(aannouncement[numberId]);
      });
      cardElement = window.drawingCard.createNewCard(numberId);
      cardElement.classList.remove('visually-hidden');

      var popupClose = map.querySelector('.popup__close');

      popupClose.addEventListener('click', function (evt) {
        if (evt.which === 1) {
          cardElement.remove();
          item.classList.remove('map__pin--active');
        }
      });
    });
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.which === 1 && activeMode === false) {
      window.main.pageActivation();
      activeMode = true;
    }
    window.map.doWhenClicked();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13 && activeMode === false) {
      window.main.pageActivation();
      activeMode = true;
    }
    window.map.doWhenClicked();
  });

  map.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      cardElement.remove();
    }
  });

  return {
    doWhenClicked: function () {
      var pinId = document.querySelectorAll('.map__pin-generated');

      pinId.forEach(createPinCard);
    }
  };
})();
