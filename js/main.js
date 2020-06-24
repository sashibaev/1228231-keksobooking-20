'use strict';

window.main = (function () {
  var KEY_ENTER = 13;

  var mainPlacemarkStyleLeft = 570;
  var mainPlacemarkStyleTop = 375;
  var activeMode = false;
  var arrayOfAds;

  var adForm = document.querySelector('.ad-form');
  var formMapFilter = document.querySelector('.map__filters');
  var formFieldsSet = adForm.querySelectorAll('fieldset');
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

  formFieldsSet.forEach(function (item, index) {
    addAttributeDisabled(formFieldsSet, index);
  });

  formMapFilter.childNodes.forEach(function (item, index) {
    addAttributeDisabled(formMapFilter, index);
  });

  window.load.getDataFromTheServer(function (data) {
    window.main.arrayOfAds = data;
    return (window.main.arrayOfAds);
  });

  var pageActivation = function () {

    window.pin.createPins(window.main.arrayOfAds);

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    formFieldsSet.forEach(function (item, index) {
      removeAttributeDisabled(formFieldsSet, index);
    });

    formMapFilter.childNodes.forEach(function (item, index) {
      removeAttributeDisabled(formMapFilter, index);
    });

    var priceForm = document.querySelector('#price');
    priceForm.placeholder = '1000';
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.which === window.main.MAIN_MOUSE_BUTTON && activeMode === false) {
      window.main.pageActivation();
      activeMode = true;
    }
    window.map.doWhenClicked();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_ENTER && activeMode === false) {
      window.main.pageActivation();
      activeMode = true;
    }
    window.map.doWhenClicked();
  });

  return {
    MAIN_MOUSE_BUTTON: 1,
    arrayOfAds: arrayOfAds,
    pageActivation: pageActivation
  };
})();
