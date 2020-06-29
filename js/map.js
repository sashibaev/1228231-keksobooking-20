'use strict';

window.map = (function () {
  var cardElement;
  var map = document.querySelector('.map');

  var createPinCard = function (item) {
    item.addEventListener('click', function () {
      var allMarks = map.querySelectorAll('.map__pin');

      allMarks.forEach(function (mark) {
        mark.classList.remove('map__pin--active');
      });

      item.classList.add('map__pin--active');
      var numberId = item.getAttribute('id');

      if (cardElement) {
        cardElement.remove();
      }

      cardElement = window.drawingCard.createNewCard(window.main.arrayOfAds[numberId]);

      var popupClose = map.querySelector('.popup__close');

      window.util.mouseAddEventListener(popupClose, cardElement);
    });
  };

  var doWhenClicked = function () {
    var marksId = document.querySelectorAll('.map__pin-generated');

    marksId.forEach(createPinCard);
  };

  window.util.keyAddEventListener(map, cardElement);

  return {
    doWhenClicked: doWhenClicked
  };
})();
