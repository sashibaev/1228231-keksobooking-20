'use strict';

window.map = (function () {
  var cardElement;
  var map = document.querySelector('.map');

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

      cardElement = window.drawingCard.createNewCard(window.main.arrayOfAds[numberId]);

      var popupClose = map.querySelector('.popup__close');

      popupClose.addEventListener('mousedown', function (evt) {
        if (evt.which === 1) {
          cardElement.remove();
        }
      });
    });
  };

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
