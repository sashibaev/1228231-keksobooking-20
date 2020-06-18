'use strict';

(function () {
  var AVATAR = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
  var TITLE = ['Заголовок предложения объявления номер один', 'Заголовок предложения объявления номер два', 'Заголовок предложения объявления номер три', 'Заголовок предложения объявления номер четыре', 'Заголовок предложения объявления номер пять', 'Заголовок предложения объявления номер шесть', 'Заголовок предложения объявления номер семь', 'Заголовок предложения объявления номер восемь'];
  var PRICE = [500, 400, 300, 200, 100, 250, 350, 450];
  var TYPE_HOUSE = ['palace', 'flat', 'house', 'bungalo', 'house', 'bungalo', 'flat', 'flat'];
  var ADDRESS = ['600, 350', '500, 250', '400, 350', '500, 350', '600, 250', '400, 250', '600, 300', '500, 300'];
  var ROOMS = [1, 2, 3, 3, 2, 3, 2, 100];
  var GUEST = [1, 2, 3, 2, 1, 1, 1, 0];
  var CHECKIN = ['12:00', '13:00', '14:00', '12:00', '12:00', '13:00', '14:00', '12:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00', '12:00', '13:00', '14:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTION = ['Описание номера объявление первое', 'Описание номера объявление второе', 'Описание номера объявление третье', 'Описание номера объявление четвертое', 'Описание номера объявление пятое', 'Описание номера объявление шестое', 'Описание номера объявление седьмое', 'Описание номера объявление восьмое'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var getRandomNumber = function (intA, intB) {
    return (intA + Math.floor(Math.random() * intB));
  };

  var createRandomLength = function (intA, intB, list) {
    var intC = getRandomNumber(intA, intB);
    var length = list.slice(0, intC);
    return length;
  };

  var createNewArray = function (arrayLength, value1, value2, value3, value4, value5, value6, value7, value8, value9, value10, value11, value12) {
    var newArray = [];

    for (var i = 0; i < arrayLength; i++) {
      var avatarArray = value1[i];
      var titleArray = value2[i];
      var addressArray = value3[i];
      var priceArray = value4[i];
      var typeHouseArray = value5[i];
      var roomsArray = value6[i];
      var guestArray = value7[i];
      var checkinArray = value8[i];
      var checkoutArray = value9[i];
      var featuresArray = createRandomLength(1, 6, value10);
      var descriptionArray = value11[i];
      var photosArray = createRandomLength(1, 3, value12);
      var xCoordinatesArray = getRandomNumber(0, 1200);
      var yCoordinatesArray = getRandomNumber(130, 500);

      newArray[i] = {
        'author': {
          'avatar': avatarArray
        },
        'offer': {
          'title': titleArray,
          'address': addressArray,
          'price': priceArray,
          'type': typeHouseArray,
          'rooms': roomsArray,
          'guest': guestArray,
          'checkin': checkinArray,
          'checkout': checkoutArray,
          'features': featuresArray,
          'description': descriptionArray,
          'photos': photosArray,
        },
        'location': {
          'x': xCoordinatesArray,
          'y': yCoordinatesArray
        }
      };
    }
    return newArray;
  };
  window.data = {
    aannouncement: createNewArray(8, AVATAR, TITLE, ADDRESS, PRICE, TYPE_HOUSE, ROOMS, GUEST, CHECKIN, CHECKOUT, FEATURES, DESCRIPTION, PHOTOS)
  };
})();
