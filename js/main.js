'use strict';

window.main = (function () {
  var mainPlacemarkStyleLeft = 570;
  var mainPlacemarkStyleTop = 375;
  var adForm = document.querySelector('.ad-form');
  var formMapFilters = document.querySelector('.map__filters');
  var formFieldset = adForm.querySelectorAll('fieldset');

  var placemarkAddress = document.getElementById('address');

  var addAttributeDisabled = function (element, index) {
    element[index].setAttribute('disabled', 'disabled');
    return element[index];
  };

  var removeAttributeDisabled = function (element, index) {
    element[index].removeAttribute('disabled', 'disabled');
    return element[index];
  };

  adForm.setAttribute('action', 'https://javascript.pages.academy/keksobooking');

  var startCoordsX = mainPlacemarkStyleLeft + window.pin.widthX;
  var startCoordsY = mainPlacemarkStyleTop + window.pin.heightY;
  placemarkAddress.value = startCoordsX + ', ' + startCoordsY;

  for (var j = 0; j < formFieldset.length; j++) {
    addAttributeDisabled(formFieldset, j);
  }

  for (j = 0; j < formMapFilters.childNodes.length; j++) {
    addAttributeDisabled(formMapFilters, j);
  }

  return {
    pageActivation: function () {
      window.load(function (aannouncement) {
        window.pin.createPins(aannouncement);
        console.log(aannouncement);
        //  window.drawingCard.createNewCard(aannouncement[3]);
      });

      adForm.classList.remove('ad-form--disabled');

      for (j = 0; j < formFieldset.length; j++) {
        removeAttributeDisabled(formFieldset, j);
      }

      for (j = 0; j < formMapFilters.childNodes.length; j++) {
        removeAttributeDisabled(formMapFilters, j);
      }

      var priceForm = document.querySelector('#price');
      priceForm.placeholder = '1000';
    }
  };
})();
