'use strict';

window.main = (function () {
  var KEY_ENTER = 13;
  var KEY_ESC = 27;
  var MAIN_MOUSE_BUTTON = 1;

  var mainPlacemarkStyleLeft = 570;
  var mainPlacemarkStyleTop = 375;
  var activeMode = false;
  var arrayOfAds;

  var main = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var formMapFilter = document.querySelector('.map__filters');
  var formFieldsSet = adForm.querySelectorAll('fieldset');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var buttonResetForm = document.querySelector('.ad-form__reset');

  var addAttributeDisabled = function (element, index) {
    element[index].setAttribute('disabled', 'disabled');
    return element[index];
  };

  var removeAttributeDisabled = function (element, index) {
    element[index].removeAttribute('disabled', 'disabled');
    return element[index];
  };

  adForm.setAttribute('action', 'https://javascript.pages.academy/keksobooking');

  var disableStateOfThePage = function () {
    activeMode = false;

    formFieldsSet.forEach(function (item, index) {
      addAttributeDisabled(formFieldsSet, index);
    });

    formMapFilter.childNodes.forEach(function (item, index) {
      addAttributeDisabled(formMapFilter, index);
    });

    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
  };

  var setInitialDataForm = function () {
    var priceForm = adForm.querySelector('#price');
    var placemarkAddress = document.getElementById('address');

    var startCoordsX = mainPlacemarkStyleLeft + window.pin.widthX;
    var startCoordsY = mainPlacemarkStyleTop + window.pin.heightY;

    priceForm.placeholder = '1000';

    mapPinMain.style.left = mainPlacemarkStyleLeft + 'px';
    mapPinMain.style.top = mainPlacemarkStyleTop + 'px';

    placemarkAddress.value = startCoordsX + ', ' + startCoordsY;

    var guestOptionForm = adForm.querySelector('#capacity').getElementsByTagName('option');
    for (var i = 0; i < guestOptionForm.length; i++) {
      if (guestOptionForm[i].value === '1') {
        guestOptionForm[i].selected = true;
      }
    }
  };

  disableStateOfThePage();
  setInitialDataForm();

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
  };

  var createSuccessfulFormSubmission = function () {
    var successfulForm = document.querySelector('#success')
    .content
    .querySelector('.success');

    var newMessage = successfulForm.cloneNode(true);
    main.appendChild(newMessage);

    window.util.mouseAddEventListener(main, newMessage);
    window.util.keyAddEventListener(main, newMessage, KEY_ESC);
  };

  var createErrorFormSubmission = function () {
    var errorForm = document.querySelector('#error')
    .content
    .querySelector('.error');

    var newMessage = errorForm.cloneNode(true);
    main.appendChild(newMessage);
    var buttonError = document.querySelector('.error__button');
    buttonError.setAttribute('tabindex', '0');

    window.util.mouseAddEventListener(main, newMessage);
    window.util.keyAddEventListener(main, newMessage, KEY_ESC);
    window.util.keyAddEventListener(buttonError, newMessage, KEY_ENTER);
  };


  buttonResetForm.addEventListener('click', function (evt) {
    evt.preventDefault();
    adForm.reset();

    setInitialDataForm();
  });

  var createElementClick = function (element, elementClick) {
    mapPinMain.addEventListener(element, function (evt) {
      if (evt.which === elementClick && activeMode === false) {
        window.main.pageActivation();
        activeMode = true;
      }
      window.map.doWhenClicked();
    });
  };

  createElementClick('mousedown', MAIN_MOUSE_BUTTON);
  createElementClick('keydown', KEY_ENTER);

  return {
    MAIN_MOUSE_BUTTON: MAIN_MOUSE_BUTTON,
    KEY_ESC: KEY_ESC,
    arrayOfAds: arrayOfAds,
    pageActivation: pageActivation,
    disableStateOfThePage: disableStateOfThePage,
    setInitialDataForm: setInitialDataForm,
    createSuccessfulFormSubmission: createSuccessfulFormSubmission,
    createErrorFormSubmission: createErrorFormSubmission
  };
})();
