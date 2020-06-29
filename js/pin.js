'use strict';

window.pin = (function () {
  var WIDTH_OF_PLACEMARK = 50;
  var HEIGHT_OF_PLACEMARK = 70;

  var pin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var createNewElementMark = function (element, array) {
    var coordinatesX = array.location.x + window.pin.widthX;
    var coordinatesY = array.location.y + window.pin.heightY;

    element.querySelector('.map__pin img').src = array.author.avatar;
    element.querySelector('.map__pin img').alt = array.offer.title;
    element.setAttribute('style', 'left: ' + coordinatesX + 'px; top: ' + coordinatesY + 'px');

    return element;
  };

  var createPins = function (array) {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    array.forEach(function (item, index) {
      var markElement = pin.cloneNode(true);

      markElement.classList.add('map__pin-generated');
      markElement.setAttribute('id', index);
      createNewElementMark(markElement, array[index]);

      fragment.appendChild(markElement);
    });

    mapPins.appendChild(fragment);
  };

  return {
    widthX: WIDTH_OF_PLACEMARK / 2,
    heightY: HEIGHT_OF_PLACEMARK,
    createPins: createPins
  };
})();
