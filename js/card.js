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
    if (value1 === '' || value2 === '' || value1 === 0 || value2 === 0) {
      var textContent = '';
    }
    textContent = value3 + value4 + value5 + value6;

    return textContent;
  };

  return {
    createNewElementCard: function (element, array) {
      var textRooms1 = ' комната для ';
      var textRooms2 = ' комнаты для ';
      var textRooms3 = ' комнат ';
      var textGuest1 = ' гостя';
      var textGuest2 = ' гостей';
      var textPrice = '₽/ночь';
      var textCheckin = 'Заезд после ';
      var textCheckout = ', Выезд до ';
      var roomsArray = array.offer.rooms;
      var guestsArray = array.offer.guests;
      var checkinArray = array.offer.checkin;
      var checkoutArray = array.offer.checkout;
      var priceArray = array.offer.price;
      var srcPhoto = array.offer.photos[0];

      var textRooms = checkingCondition(roomsArray, textRooms1, textRooms2, textRooms3);
      var textGuest = checkingCondition(guestsArray, textGuest1, textGuest2, '');

      element.querySelector('.popup__title').textContent = array.offer.title;
      element.querySelector('.popup__text--address').textContent = array.offer.address;
      element.querySelector('.popup__text--price').textContent = checkingTheTextMissing(priceArray, null, priceArray, textPrice, '', '');
      element.querySelector('.popup__type').textContent = array.offer.type;
      element.querySelector('.popup__text--capacity').textContent = checkingTheTextMissing(roomsArray, guestsArray, roomsArray, textRooms, guestsArray, textGuest);
      element.querySelector('.popup__text--time').textContent = checkingTheTextMissing(checkinArray, checkoutArray, textCheckin, checkinArray, textCheckout, checkoutArray);
      element.querySelector('.popup__features').textContent = array.offer.features;
      element.querySelector('.popup__description').textContent = array.offer.description;
      element.querySelector('.popup__photo').src = srcPhoto;
      element.querySelector('.popup__avatar').src = array.author.avatar;

      return element;
    }
  };
})();
