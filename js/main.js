'use strict';

(function () {
  var WIDTH_OF_PLACEMARK = 50;
  var HEIGHT_OF_PLACEMARK = 70;
  var markElement;
  var alt;
  var coordinatesX;
  var coordinatesY;

  var adForm = document.querySelector('.ad-form');
  var fragment = document.createDocumentFragment();

  window.main = {
    createCloneElement: function (element) {
      return element.cloneNode(true);
    }
  };

  var createCloneElement = function (element) {
    return element.cloneNode(true);
  };

  var addAttributeDisabled = function (element, index) {
    element[index].setAttribute('disabled', 'disabled');
    return element[index];
  };

  var removeAttributeDisabled = function (element, index) {
    element[index].removeAttribute('disabled', 'disabled');
    return element[index];
  };

  adForm.setAttribute('action', 'https://javascript.pages.academy/keksobooking');
  var formFieldset = adForm.querySelectorAll('fieldset');

  for (var j = 0; j < formFieldset.length; j++) {
    addAttributeDisabled(formFieldset, j);
  }

  var formMapFilters = document.querySelector('.map__filters');

  for (j = 0; j < formMapFilters.childNodes.length; j++) {
    addAttributeDisabled(formMapFilters, j);
  }

  var pin = document.querySelector('#pin')
                    .content
                    .querySelector('.map__pin');

  var mapPins = document.querySelector('.map__pins');
  var placemarkAddress = document.getElementById('address');

  var createNewElementMark = function (value1, value2, value3, value4) {
    markElement.querySelector('.map__pin img').src = value1;
    markElement.querySelector('.map__pin img').alt = value2;
    markElement.setAttribute('style', 'left: ' + value3 + 'px; top: ' + value4 + 'px');

    return markElement;
  };

  window.main = {
    pageActivation: function () {
      window.data.aannouncement.forEach(function (item, index) {
        var avatar = window.data.aannouncement[index].author.avatar;
        alt = window.data.aannouncement[index].offer.title;
        coordinatesX = window.data.aannouncement[index].location.x + WIDTH_OF_PLACEMARK / 2;
        coordinatesY = window.data.aannouncement[index].location.y + HEIGHT_OF_PLACEMARK;

        markElement = createCloneElement(pin);
        markElement.classList.add('map__pin-generated');

        markElement.setAttribute('id', index);
        createNewElementMark(avatar, alt, coordinatesX, coordinatesY);

        fragment.appendChild(markElement);
      });

      mapPins.appendChild(fragment);

      adForm.classList.remove('ad-form--disabled');

      for (j = 0; j < formFieldset.length; j++) {
        removeAttributeDisabled(formFieldset, j);
      }

      for (j = 0; j < formMapFilters.childNodes.length; j++) {
        removeAttributeDisabled(formMapFilters, j);
      }

      placemarkAddress.value = '600, 380';

      var priceForm = document.querySelector('#price');
      priceForm.placeholder = '1000';
    }
  };
})();
