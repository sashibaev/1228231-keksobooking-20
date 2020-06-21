'use strict';

window.pin = (function () {
  var alt;
  var coordinatesX;
  var coordinatesY;
  var markElement;

  var fragment = document.createDocumentFragment();

  var pin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var mapPins = document.querySelector('.map__pins');

  var createNewElementMark = function (element, value1, value2, value3, value4) {
    element.querySelector('.map__pin img').src = value1;
    element.querySelector('.map__pin img').alt = value2;
    element.setAttribute('style', 'left: ' + value3 + 'px; top: ' + value4 + 'px');

    return element;
  };

  return {
    createPins: function () {
      window.data.aannouncement.forEach(function (item, index) {
        var avatar = window.data.aannouncement[index].author.avatar;
        alt = window.data.aannouncement[index].offer.title;
        coordinatesX = window.data.aannouncement[index].location.x + window.data.WIDTH_OF_PLACEMARK / 2;
        coordinatesY = window.data.aannouncement[index].location.y + window.data.HEIGHT_OF_PLACEMARK;

        markElement = window.main.createCloneElement(pin);
        markElement.classList.add('map__pin-generated');

        markElement.setAttribute('id', index);
        createNewElementMark(markElement, avatar, alt, coordinatesX, coordinatesY);

        fragment.appendChild(markElement);
      });

      mapPins.appendChild(fragment);
    }
  };
})();
