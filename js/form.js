'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MAX_PRICE = 1000000;
  var minPrice = 1000;

  var adForm = document.querySelector('.ad-form');
  var titleForm = document.querySelector('#title');
  var priceForm = document.querySelector('#price');
  var typeForm = document.querySelector('#type');
  var addressForm = document.querySelector('#address');

  titleForm.addEventListener('invalid', function () {
    if (titleForm.validaty.valueMissing) {
      titleForm.setCustomValidity('Обязательное поле для заполнения');
    } else {
      titleForm.setCustomValidity('');
    }
  });

  titleForm.addEventListener('input', function () {
    var valueLengthTitle = titleForm.value.length;

    if (valueLengthTitle < MIN_TITLE_LENGTH) {
      titleForm.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLengthTitle) + ' симв.');
    } else if (valueLengthTitle > MAX_TITLE_LENGTH) {
      titleForm.setCustomValidity('Удалите лишнии символы ' + (valueLengthTitle - MAX_TITLE_LENGTH) + ' симв.');
    } else {
      titleForm.setCustomValidity('');
    }
  });

  priceForm.addEventListener('invalid', function () {
    if (priceForm.validaty.valueMissing) {
      priceForm.setCustomValidity('Обязательное поле для заполнения');
    } else {
      priceForm.setCustomValidity('');
    }
  });

  var priceFormIf = function () {
    var valuePrice = priceForm.value;

    if (valuePrice < minPrice) {
      priceForm.setCustomValidity('Ещё ' + (minPrice - valuePrice) + ' единиц');
    } else if (valuePrice > MAX_PRICE) {
      priceForm.setCustomValidity('Удалите лишнии единицы ' + (valuePrice - MAX_PRICE) + ' единиц');
    } else {
      priceForm.setCustomValidity('');
    }
  };

  priceForm.addEventListener('input', function () {
    priceFormIf();
  });

  typeForm.addEventListener('change', function () {
    if (typeForm.value === 'bungalo') {
      minPrice = 0;
      priceForm.placeholder = '0';
    } else if (typeForm.value === 'flat') {
      minPrice = 1000;
      priceForm.placeholder = '1000';
    } else if (typeForm.value === 'house') {
      minPrice = 5000;
      priceForm.placeholder = '5000';
    } else {
      minPrice = 10000;
      priceForm.placeholder = '10000';
    }

    priceFormIf();
  });

  addressForm.addEventListener('invalid', function () {
    if (addressForm.validaty.valueMissing) {
      addressForm.setCustomValidity('Обязательное поле для заполнения');
    } else {
      addressForm.setCustomValidity('');
    }
  });

  var roomNumberForm = adForm.querySelector('#room_number');
  var capacityForm = adForm.querySelector('#capacity');
  var timeinForm = adForm.querySelector('#timein');
  var timeoutForm = adForm.querySelector('#timeout');

  adForm.addEventListener('click', function () {
    if (roomNumberForm.value === '1' && capacityForm.value !== '1') {
      roomNumberForm.setCustomValidity('1 комната — «для 1 гостя»');
    } else if (roomNumberForm.value === '2' && capacityForm.value === '3' || roomNumberForm.value === '2' && capacityForm.value === '0') {
      roomNumberForm.setCustomValidity('2 комнаты — «для 2 гостей» или «для 1 гостя»');
    } else if (roomNumberForm.value === '3' && capacityForm.value === '0') {
      roomNumberForm.setCustomValidity('3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
    } else if (roomNumberForm.value === '100' && capacityForm.value !== '0') {
      roomNumberForm.setCustomValidity('100 комнат — «не для гостей»');
    } else {
      roomNumberForm.setCustomValidity('');
    }

    if (timeinForm.value === '12:00' && timeoutForm.value !== '12:00') {
      timeinForm.setCustomValidity('время заезда после 12:00 — время выезда до 12:00');
    } else if (timeinForm.value === '13:00' && timeoutForm.value !== '13:00') {
      timeinForm.setCustomValidity('время заезда после 13:00 — время выезда до 13:00');
    } else if (timeinForm.value === '14:00' && timeoutForm.value !== '14:00') {
      timeinForm.setCustomValidity('время заезда после 14:00 — время выезда до 14:00');
    } else {
      timeinForm.setCustomValidity('');
    }
  });
})();
