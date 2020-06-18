'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;

  var titleForm = document.querySelector('#title');

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
})();
