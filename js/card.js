'use strict';

window.card = (function () {
  var checkingCondition = function (value, text1, text2, text3) {
    if (value === 1) {
      var textValue = text1;
    } else if (value === 100) {
      textValue = text3;
    } else {
      textValue = text2;
    }
    return textValue;
  };

  var checkingTheTextMissing = function (value1, value2, value3, value4, value5, value6) {
    if (value1 === '' || value2 === '') {
      var textContent = '';
    } else {
      textContent = value3 + value4 + value5 + value6;
    }
    return textContent;
  };

  return {
    createNewElementCard: function (element, title, address, price, type, rooms, guest, checkin, checkout, features, description, srcPhoto, srcAvatar) {
      var textRooms1 = ' комната для ';
      var textRooms2 = ' комнаты для ';
      var textRooms3 = ' комнат ';
      var textGuest1 = ' гостя';
      var textGuest2 = ' гостей';
      var textPrice = '₽/ночь';
      var textCheckin = 'Заезд после ';
      var textCheckout = ', Выезд до ';

      var textRooms = checkingCondition(rooms, textRooms1, textRooms2, textRooms3);
      var textGuest = checkingCondition(guest, textGuest1, textGuest2, '');

      element.querySelector('.popup__title').textContent = title;
      element.querySelector('.popup__text--address').textContent = address;
      element.querySelector('.popup__text--price').textContent = checkingTheTextMissing(price, null, price, textPrice, '', '');
      element.querySelector('.popup__type').textContent = type;
      element.querySelector('.popup__text--capacity').textContent = checkingTheTextMissing(rooms, guest, rooms, textRooms, guest, textGuest);
      element.querySelector('.popup__text--time').textContent = checkingTheTextMissing(checkin, checkout, textCheckin, checkin, textCheckout, checkout);
      element.querySelector('.popup__features').textContent = features;
      element.querySelector('.popup__description').textContent = description;
      element.querySelector('.popup__photo').src = srcPhoto;
      element.querySelector('.popup__avatar').src = srcAvatar;

      return element;
    }
  };
})();
