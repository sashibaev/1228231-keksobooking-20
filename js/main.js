'use strict';

window.main = (function () {
  var mainPlacemarkStyleLeft = 570;
  var mainPlacemarkStyleTop = 375;
  var activeMode = false;
  var arrayOfAds;

  var adForm = document.querySelector('.ad-form');
  var formMapFilters = document.querySelector('.map__filters');
  var formFieldset = adForm.querySelectorAll('fieldset');
  var placemarkAddress = document.getElementById('address');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

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

  window.load(function (data) {
    window.main.arrayOfAds = data;
    return (window.main.arrayOfAds);
  });

  var pageActivation = function () {

    window.pin.createPins(window.main.arrayOfAds);

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    for (j = 0; j < formFieldset.length; j++) {
      removeAttributeDisabled(formFieldset, j);
    }

    for (j = 0; j < formMapFilters.childNodes.length; j++) {
      removeAttributeDisabled(formMapFilters, j);
    }

    var priceForm = document.querySelector('#price');
    priceForm.placeholder = '1000';
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.which === 1 && activeMode === false) {
      pageActivation();
      activeMode = true;
    }
    window.map.doWhenClicked();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13 && activeMode === false) {
      pageActivation();
      activeMode = true;
    }
    window.map.doWhenClicked();
  });

  return {
    arrayOfAds: arrayOfAds
  };
})();
