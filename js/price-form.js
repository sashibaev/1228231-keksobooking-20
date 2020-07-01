'use strict';

window.priceForm = (function () {
  var MAX_PRICE = 1000000;

  var minPrice = 1000;
  var typeOfHousingBungalo = 'bungalo';
  var typeOfHousingFlat = 'flat';
  var typeOfHousingHouse = 'house';
  var typeOfHousingPalace = 'palace';

  var priceForm = document.querySelector('#price');
  var typeForm = document.querySelector('#type');

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
    switch (typeForm.value) {
      case typeOfHousingBungalo:
        minPrice = 0;
        priceForm.placeholder = '0';
        break;
      case typeOfHousingFlat:
        minPrice = 1000;
        priceForm.placeholder = '1000';
        break;
      case typeOfHousingHouse:
        minPrice = 5000;
        priceForm.placeholder = '5000';
        break;
      case typeOfHousingPalace:
        minPrice = 10000;
        priceForm.placeholder = '10000';
        break;
    }
    priceFormIf();
  });
})();
