'use strict';

window.form = (function () {
  var adForm = document.querySelector('.ad-form');
  var addressForm = adForm.querySelector('#address');
  var timeinForm = adForm.querySelector('#timein');
  var timeoutForm = adForm.querySelector('#timeout');
  var buttonSubmitForm = document.querySelector('.ad-form__submit');
  var filtersMapForm = document.querySelector('.map__filters');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var buttonResetForm = document.querySelector('.ad-form__reset');

  addressForm.setAttribute('readonly', 'readonly');

  timeinForm.addEventListener('change', function () {
    timeoutForm.value = timeinForm.value;
  });

  timeoutForm.addEventListener('change', function () {
    timeinForm.value = timeoutForm.value;
  });

  var removePinsOnTheMap = function () {
    var createdPlacemarksOnTheMap = document.querySelectorAll('.map__pin-generated');
    createdPlacemarksOnTheMap.forEach(function (createdPlacemarkOnTheMap) {
      createdPlacemarkOnTheMap.remove();
    });
  };

  var successfullySubmitTheForm = function () {
    window.form.removePinsOnTheMap();

    adForm.reset();
    filtersMapForm.reset();
    previewAvatar.setAttribute('src', 'img/muffin-grey.svg');

    if (window.fileForm.imgPhotoHouse) {
      window.fileForm.imgPhotoHouse.remove();
    }

    window.main.disableStateOfThePage();
    window.main.setInitialDataForm();
  };

  adForm.addEventListener('submit', function (evt) {
    if (evt.target !== buttonSubmitForm) {
      window.backend.toSendDataFromTheServer(new FormData(adForm), window.main.createSuccessfulFormSubmission, window.main.createErrorFormSubmission);
    }
    evt.preventDefault();
    successfullySubmitTheForm();
  });

  buttonResetForm.addEventListener('click', function (evt) {
    evt.preventDefault();
    successfullySubmitTheForm();
  });

  return {
    removePinsOnTheMap: removePinsOnTheMap
  };
})();
