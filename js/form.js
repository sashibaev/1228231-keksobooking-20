'use strict';

window.form = (function () {
  var ROOMS_ONE = '1';
  var ROOMS_TWO = '2';
  var ROOMS_THREE = '3';
  var ROOMS_ONE_HUNDRED = '100';
  var GUEST_ZERO = '0';
  var GUEST_ONE = '1';
  var GUEST_THREE = '3';
  var TIME_TWELVE = '12:00';
  var TIME_THIRTEEN = '13:00';
  var TIME_FOURTEEN = '14:00';

  var adForm = document.querySelector('.ad-form');
  var addressForm = adForm.querySelector('#address');
  var roomNumberForm = adForm.querySelector('#room_number');
  var capacityForm = adForm.querySelector('#capacity');
  var timeinForm = adForm.querySelector('#timein');
  var timeoutForm = adForm.querySelector('#timeout');
  var buttonSubmitForm = document.querySelector('.ad-form__submit');

  addressForm.addEventListener('invalid', function () {
    if (addressForm.validaty.valueMissing) {
      addressForm.setCustomValidity('Обязательное поле для заполнения');
    } else {
      addressForm.setCustomValidity('');
    }
  });

  adForm.addEventListener('change', function () {
    if (roomNumberForm.value === ROOMS_ONE && capacityForm.value !== GUEST_ONE) {
      roomNumberForm.setCustomValidity('1 комната — «для 1 гостя»');
    } else if (roomNumberForm.value === ROOMS_TWO && capacityForm.value === GUEST_THREE || roomNumberForm.value === ROOMS_TWO && capacityForm.value === GUEST_ZERO) {
      roomNumberForm.setCustomValidity('2 комнаты — «для 2 гостей» или «для 1 гостя»');
    } else if (roomNumberForm.value === ROOMS_THREE && capacityForm.value === GUEST_ZERO) {
      roomNumberForm.setCustomValidity('3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
    } else if (roomNumberForm.value === ROOMS_ONE_HUNDRED && capacityForm.value !== GUEST_ZERO) {
      roomNumberForm.setCustomValidity('100 комнат — «не для гостей»');
    } else {
      roomNumberForm.setCustomValidity('');
    }

    if (timeinForm.value === TIME_TWELVE && timeoutForm.value !== TIME_TWELVE) {
      timeinForm.setCustomValidity('время заезда после 12:00 — время выезда до 12:00');
    } else if (timeinForm.value === TIME_THIRTEEN && timeoutForm.value !== TIME_THIRTEEN) {
      timeinForm.setCustomValidity('время заезда после 13:00 — время выезда до 13:00');
    } else if (timeinForm.value === TIME_FOURTEEN && timeoutForm.value !== TIME_FOURTEEN) {
      timeinForm.setCustomValidity('время заезда после 14:00 — время выезда до 14:00');
    } else {
      timeinForm.setCustomValidity('');
    }
  });

  var successfullySubmitTheForm = function () {
    var createdPlacemarksOnTheMap = document.querySelectorAll('.map__pin-generated');
    createdPlacemarksOnTheMap.forEach(function (item, index) {
      createdPlacemarksOnTheMap[index].remove();
    });

    adForm.reset();
    window.main.disableStateOfThePage();
    window.main.setInitialDataForm();
  };

  adForm.addEventListener('submit', function (evt) {
    if (evt.target !== buttonSubmitForm) {
      window.upload.toSendDataFromTheServer(new FormData(adForm), window.main.createSuccessfulFormSubmission, window.main.createErrorFormSubmission);
    }
    evt.preventDefault();
    successfullySubmitTheForm();
  });
})();
