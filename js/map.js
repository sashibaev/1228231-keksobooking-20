'use strict';

window.map = (function () {
  var KEY_ESC = 27;
  var cardElement;
  var map = document.querySelector('.map');

  var createPinCard = function (item) {
    item.addEventListener('click', function () {
      var allMarks = map.querySelectorAll('.map__pin');

      allMarks.forEach(function (element, index) {
        allMarks[index].classList.remove('map__pin--active');
      });

      item.classList.add('map__pin--active');
      var numberId = item.getAttribute('id');

      if (cardElement) {
        cardElement.remove();
      }

      cardElement = window.drawingCard.createNewCard(window.main.arrayOfAds[numberId]);

      var popupClose = map.querySelector('.popup__close');

      popupClose.addEventListener('mousedown', function (evt) {
        if (evt.which === window.main.MAIN_MOUSE_BUTTON) {
          cardElement.remove();
        }
      });
    });
  };

  var doWhenClicked = function () {
    var marksId = document.querySelectorAll('.map__pin-generated');

    marksId.forEach(createPinCard);
  };

  map.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_ESC) {
      cardElement.remove();
    }
  });

  return {
    doWhenClicked: doWhenClicked
  };
})();
