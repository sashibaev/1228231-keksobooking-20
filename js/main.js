'use strict';

window.main = (function () {
  var KEY_ENTER = 13;
  var KEY_ESC = 27;
  var MAIN_MOUSE_BUTTON = 1;
  var GUEST_VALUE_FORM = '1';

  var Map = {
    CENTER_WIDTH: 600,
    CENTER_HEIGHT: 380
  };

  var Placemark = {
    WIDTH_MAIN: 60,
    HEIGHT_MAIN: 80
  };

  var mainPlacemarkStyleLeft = Map.CENTER_WIDTH - Placemark.WIDTH_MAIN / 2;
  var mainPlacemarkStyleTop = Map.CENTER_HEIGHT - Placemark.HEIGHT_MAIN;
  var activeMode = false;
  var arrayOfAds;
  var newArrayOfAds;

  var main = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var filtersMapForm = document.querySelector('.map__filters');
  var formFiltersFieldset = filtersMapForm.querySelectorAll('fieldset');
  var formFiltersSelect = filtersMapForm.querySelectorAll('select');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

  var addAttributeDisabled = function (element) {
    element.setAttribute('disabled', 'disabled');

    return element;
  };

  var removeAttributeDisabled = function (element) {
    element.removeAttribute('disabled', 'disabled');

    return element;
  };

  adForm.setAttribute('action', 'https://javascript.pages.academy/keksobooking');

  var disableStateOfThePage = function () {
    activeMode = false;

    adFormFieldsets.forEach(function (formFieldset) {
      addAttributeDisabled(formFieldset);
    });

    formFiltersSelect.forEach(function (formFilterSelect) {
      addAttributeDisabled(formFilterSelect);
    });

    formFiltersFieldset.forEach(function (formFilterFieldset) {
      addAttributeDisabled(formFilterFieldset);
    });

    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
  };

  var setInitialDataForm = function () {
    var priceForm = adForm.querySelector('#price');
    var placemarkAddress = document.getElementById('address');

    var startCoordsX = mainPlacemarkStyleLeft + Placemark.WIDTH_MAIN / 2;
    var startCoordsY = mainPlacemarkStyleTop + Placemark.HEIGHT_MAIN;

    priceForm.placeholder = '1000';

    mapPinMain.style.left = mainPlacemarkStyleLeft + 'px';
    mapPinMain.style.top = mainPlacemarkStyleTop + 'px';

    placemarkAddress.value = startCoordsX + ', ' + startCoordsY;

    var guestOptionsForm = adForm.querySelector('#capacity').getElementsByTagName('option');

    for (var i = 0; i < guestOptionsForm.length; i++) {
      if (guestOptionsForm[i].value === GUEST_VALUE_FORM) {
        guestOptionsForm[i].selected = true;
        break;
      }
    }
  };

  disableStateOfThePage();
  setInitialDataForm();

  var requestDataFromTheServer = function (requestCallback) {
    window.backend.loadDataFromTheServer(function (data) {
      window.main.arrayOfAds = data;
      window.main.newArrayOfAds = window.main.arrayOfAds;

      window.pin.createPins(window.main.newArrayOfAds);

      requestCallback();
    });
  };

  var activateThePage = function (requestCallback) {
    requestDataFromTheServer(requestCallback);

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    adFormFieldsets.forEach(function (formFieldset) {
      removeAttributeDisabled(formFieldset);
    });

    formFiltersSelect.forEach(function (formFilterSelect) {
      removeAttributeDisabled(formFilterSelect);
    });

    formFiltersFieldset.forEach(function (formFilterFieldset) {
      removeAttributeDisabled(formFilterFieldset);
    });
  };

  var createSuccessfulFormSubmission = function () {
    var successfulForm = document.querySelector('#success')
    .content
    .querySelector('.success');

    var newMessage = successfulForm.cloneNode(true);
    main.appendChild(newMessage);

    window.util.mouseAddEventListener(main, newMessage, MAIN_MOUSE_BUTTON);
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

    window.util.mouseAddEventListener(main, newMessage, MAIN_MOUSE_BUTTON);
    window.util.keyAddEventListener(main, newMessage, KEY_ESC);
    window.util.keyAddEventListener(buttonError, newMessage, KEY_ENTER);
  };

  var createElementClick = function (element, elementClick) {
    mapPinMain.addEventListener(element, function (evt) {
      if (evt.which === elementClick && activeMode === false) {
        activateThePage(window.map.doWhenClicked);
        activeMode = true;
      }
    });
  };

  createElementClick('mousedown', MAIN_MOUSE_BUTTON);
  createElementClick('keydown', KEY_ENTER);

  return {
    widthX: Placemark.WIDTH_MAIN / 2,
    heightY: Placemark.HEIGHT_MAIN,
    MAIN_MOUSE_BUTTON: MAIN_MOUSE_BUTTON,
    KEY_ESC: KEY_ESC,
    arrayOfAds: arrayOfAds,
    newArrayOfAds: newArrayOfAds,
    activeMode: activeMode,
    activateThePage: activateThePage,
    disableStateOfThePage: disableStateOfThePage,
    setInitialDataForm: setInitialDataForm,
    createSuccessfulFormSubmission: createSuccessfulFormSubmission,
    createErrorFormSubmission: createErrorFormSubmission,
    createElementClick: createElementClick
  };
})();
