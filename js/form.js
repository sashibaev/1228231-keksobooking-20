'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var addressForm = document.querySelector('#address');

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
