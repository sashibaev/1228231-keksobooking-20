'use strict';

window.main = (function () {
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

  for (var j = 0; j < formFieldset.length; j++) {
    addAttributeDisabled(formFieldset, j);
  }

  for (j = 0; j < formMapFilters.childNodes.length; j++) {
    addAttributeDisabled(formMapFilters, j);
  }

  return {
    createCloneElement: function (element) {
      return element.cloneNode(true);
    },
    pageActivation: function () {
      window.pin.createPins();

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
