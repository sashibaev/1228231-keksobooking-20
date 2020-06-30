'use strict';

window.form = (function () {
  var Rooms = {
    ONE: '1',
    TWO: '2',
    THREE: '3',
    ONE_HUNDRED: '100'
  };
  var Guest = {
    ZERO: '0',
    ONE: '1',
    THREE: '3'
  };
  var Time = {
    TWELVE: '12:00',
    THIRTEEN: '13:00',
    FOURTEEN: '14:00'
  };

  var adForm = document.querySelector('.ad-form');
  var addressForm = adForm.querySelector('#address');
  var roomNumberForm = adForm.querySelector('#room_number');
  var capacityForm = adForm.querySelector('#capacity');
  var timeinForm = adForm.querySelector('#timein');
  var timeoutForm = adForm.querySelector('#timeout');
  var buttonSubmitForm = document.querySelector('.ad-form__submit');

  addressForm.setAttribute('readonly', 'readonly');

  adForm.addEventListener('change', function () {
    if (roomNumberForm.value === Rooms.ONE && capacityForm.value !== Guest.ONE) {
      roomNumberForm.setCustomValidity('1 комната — «для 1 гостя»');
    } else if (roomNumberForm.value === Rooms.TWO && capacityForm.value === Guest.THREE || roomNumberForm.value === Rooms.TWO && capacityForm.value === Guest.ZERO) {
      roomNumberForm.setCustomValidity('2 комнаты — «для 2 гостей» или «для 1 гостя»');
    } else if (roomNumberForm.value === Rooms.THREE && capacityForm.value === Guest.ZERO) {
      roomNumberForm.setCustomValidity('3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
    } else if (roomNumberForm.value === Rooms.ONE_HUNDRED && capacityForm.value !== Guest.ZERO) {
      roomNumberForm.setCustomValidity('100 комнат — «не для гостей»');
    } else {
      roomNumberForm.setCustomValidity('');
    }
  });

  timeinForm.addEventListener('change', function () {
    switch (timeinForm.value) {
      case Time.TWELVE:
        timeoutForm.value = Time.TWELVE;
        break;
      case Time.THIRTEEN:
        timeoutForm.value = Time.THIRTEEN;
        break;
      case Time.FOURTEEN:
        timeoutForm.value = Time.FOURTEEN;
        break;
    }
  });

  timeoutForm.addEventListener('change', function () {
    switch (timeoutForm.value) {
      case Time.TWELVE:
        timeinForm.value = Time.TWELVE;
        break;
      case Time.THIRTEEN:
        timeinForm.value = Time.THIRTEEN;
        break;
      case Time.FOURTEEN:
        timeinForm.value = Time.FOURTEEN;
        break;
    }
  });

  var removePinsOnTheMap = function () {
    var createdPlacemarksOnTheMap = document.querySelectorAll('.map__pin-generated');
    createdPlacemarksOnTheMap.forEach(function (item, index) {
      createdPlacemarksOnTheMap[index].remove();
    });
  };

  var successfullySubmitTheForm = function () {
    window.form.removePinsOnTheMap();

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

  return {
    removePinsOnTheMap: removePinsOnTheMap
  };
})();
