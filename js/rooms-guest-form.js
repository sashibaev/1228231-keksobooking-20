'use strict';

window.roomsGuestForm = (function () {
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

  var adForm = document.querySelector('.ad-form');
  var roomNumberForm = adForm.querySelector('#room_number');
  var capacityForm = adForm.querySelector('#capacity');

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
})();
