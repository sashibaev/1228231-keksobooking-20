'use strict';

window.main = (function () {
  var KEY_ENTER = 13;
  var KEY_ESC = 27;
  var MAIN_MOUSE_BUTTON = 1;
  var GUEST_VALUE_FORM = '1';

  var CENTER_WIDTH_MAP = 600;
  var CENTER_HEIGHT_MAP = 380;
  var WIDTH_MAIN_PLACEMARK = 60;
  var HEIGHT_MAIN_PLACEMARK = 70;

  var mainPlacemarkStyleLeft = CENTER_WIDTH_MAP - WIDTH_MAIN_PLACEMARK / 2;
  var mainPlacemarkStyleTop = CENTER_HEIGHT_MAP - HEIGHT_MAIN_PLACEMARK;
  var activeMode = false;
  var arrayOfAds;
  var newArrayOfAds;

  var main = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var filtersMapForm = document.querySelector('.map__filters');
  var formFiltersFieldsets = filtersMapForm.querySelectorAll('fieldset');
  var formFiltersSelectes = filtersMapForm.querySelectorAll('select');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var buttonResetForm = document.querySelector('.ad-form__reset');

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

    formFiltersSelectes.forEach(function (formFiltersSelect) {
      addAttributeDisabled(formFiltersSelect);
    });

    formFiltersFieldsets.forEach(function (formFiltersFieldset) {
      addAttributeDisabled(formFiltersFieldset);
    });

    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
  };

  var setInitialDataForm = function () {
    var priceForm = adForm.querySelector('#price');
    var placemarkAddress = document.getElementById('address');

    var startCoordsX = mainPlacemarkStyleLeft + WIDTH_MAIN_PLACEMARK / 2;
    var startCoordsY = mainPlacemarkStyleTop + HEIGHT_MAIN_PLACEMARK;

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

  window.load.getDataFromTheServer(function (data) {
    window.main.arrayOfAds = data;
    return window.main.arrayOfAds;
  });

  var activateThePage = function () {
    window.main.newArrayOfAds = window.main.arrayOfAds;

    window.pin.createPins(window.main.newArrayOfAds);

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    adFormFieldsets.forEach(function (formFieldset) {
      removeAttributeDisabled(formFieldset);
    });

    formFiltersSelectes.forEach(function (formFiltersSelect) {
      removeAttributeDisabled(formFiltersSelect);
    });

    formFiltersFieldsets.forEach(function (formFiltersFieldset) {
      removeAttributeDisabled(formFiltersFieldset);
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

    window.main.newArrayOfAds = window.main.arrayOfAds;

    adForm.reset();
    filtersMapForm.reset();

    setInitialDataForm();
    window.form.removePinsOnTheMap();
    window.pin.createPins(window.main.newArrayOfAds);
    window.map.doWhenClicked();
  });

  var createElementClick = function (element, elementClick) {
    mapPinMain.addEventListener(element, function (evt) {
      if (evt.which === elementClick && activeMode === false) {
        window.main.activateThePage();
        activeMode = true;
      }
      window.map.doWhenClicked();
    });
  };

  createElementClick('mousedown', MAIN_MOUSE_BUTTON);
  createElementClick('keydown', KEY_ENTER);

  return {
    widthX: WIDTH_MAIN_PLACEMARK / 2,
    heightY: HEIGHT_MAIN_PLACEMARK,
    MAIN_MOUSE_BUTTON: MAIN_MOUSE_BUTTON,
    KEY_ESC: KEY_ESC,
    arrayOfAds: arrayOfAds,
    newArrayOfAds: newArrayOfAds,
    activateThePage: activateThePage,
    disableStateOfThePage: disableStateOfThePage,
    setInitialDataForm: setInitialDataForm,
    createSuccessfulFormSubmission: createSuccessfulFormSubmission,
    createErrorFormSubmission: createErrorFormSubmission
  };
})();
