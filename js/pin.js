'use strict';

window.pin = (function () {
  var markElement;

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
    WIDTH_OF_PLACEMARK: 50,
    HEIGHT_OF_PLACEMARK: 70,
    createPins: window.load.getDataFromServer(function (aannouncement) {
      var fragment = document.createDocumentFragment();

      aannouncement.forEach(function (item, index) {
        var avatar = aannouncement[index].author.avatar;
        var alt = aannouncement[index].offer.title;
        var coordinatesX = aannouncement[index].location.x + window.pin.WIDTH_OF_PLACEMARK / 2;
        var coordinatesY = aannouncement[index].location.y + window.pin.HEIGHT_OF_PLACEMARK;

        markElement = pin.cloneNode(true);
        markElement.classList.add('map__pin-generated');

        markElement.setAttribute('id', index);
        createNewElementMark(markElement, avatar, alt, coordinatesX, coordinatesY);

        fragment.appendChild(markElement);
      });

      mapPins.appendChild(fragment);
    }, function () {})
  };
})();
