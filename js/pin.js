'use strict';

window.pin = (function () {
  var WIDTH_OF_PLACEMARK = 50;
  var HEIGHT_OF_PLACEMARK = 70;

  var widthX = WIDTH_OF_PLACEMARK / 2;
  var heightY = HEIGHT_OF_PLACEMARK;

  var pin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var createNewElementMark = function (element, array) {
    var coordinatesX = array.location.x - widthX;
    var coordinatesY = array.location.y - heightY;

    element.querySelector('.map__pin img').src = array.author.avatar;
    element.querySelector('.map__pin img').alt = array.offer.title;
    element.setAttribute('style', 'left: ' + coordinatesX + 'px; top: ' + coordinatesY + 'px');

    return element;
  };

  var createPinHidden = function (elementObject, elementDom) {
    var flagOffer = 0;
    var pinOfferValues = Object.values(elementObject);

    pinOfferValues.forEach(function (pinOfferValue) {
      if (pinOfferValue !== undefined) {
        flagOffer += 1;
      }
    });

    if (flagOffer === 0) {
      elementDom.classList.add('hidden');
    }
  };

  var createPins = function (array) {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    var index = 0;

    if (array.length > 5) {
      array = array.slice(0, 5);
    }

    array.forEach(function (item) {
      var markElement = pin.cloneNode(true);

      markElement.classList.add('map__pin-generated');
      markElement.setAttribute('id', index);

      createNewElementMark(markElement, item);
      createPinHidden(item.offer, markElement);

      fragment.appendChild(markElement);

      index++;
    });

    mapPins.appendChild(fragment);
  };

  return {
    createPins: createPins
  };
})();
