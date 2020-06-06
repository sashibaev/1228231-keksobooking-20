'use strict';

var AVATAR = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TITLE = ['Заголовок предложения объявления номер один', 'Заголовок предложения объявления номер два', 'Заголовок предложения объявления номер три', 'Заголовок предложения объявления номер четыре', 'Заголовок предложения объявления номер пять', 'Заголовок предложения объявления номер шесть', 'Заголовок предложения объявления номер семь', 'Заголовок предложения объявления номер восемь'];
var PRICE = [500, 400, 300, 200, 100, 250, 350, 450];
var TYPE_HOUSE = ['palace', 'flat', 'house', 'bungalo', 'house', 'bungalo', 'flat', 'flat'];
var ADDRESS = ['600, 350', '500, 250', '400, 350', '500, 350', '600, 250', '400, 250', '600,300', '500,300'];
var ROOMS = [1, 2, 3, 3, 2, 2, 1, 2];
var GUEST = [1, 2, 3, 4, 5, 4, 5, 3];
var CHECKIN = ['12:00', '13:00', '14:00', '12:00', '12:00', '13:00', '14:00', '12:00'];
var CHECKOUT = ['12:00', '13:00', '14:00', '12:00', '13:00', '14:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['Описание номера объявление первое', 'Описание номера объявление второе', 'Описание номера объявление третье', 'Описание номера объявление четвертое', 'Описание номера объявление пятое', 'Описание номера объявление шестое', 'Описание номера объявление седьмое', 'Описание номера объявление восьмое'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFSET_BY_X = 20;
var OFFSET_BY_Y = 30;

var getRandomNumber = function (intA, intB) {
  return (intA + Math.floor(Math.random() * intB));
};

var createNewArray = function (arrayLength, avatar, title, address, price, typeHouse, rooms, guest, checkin, checkout, features, description, photos) {
  var newArray = [];

  for (var i = 0; i < arrayLength; i++) {
    var avatarArray = avatar[i];
    var titleArray = title[i];
    var addressArray = address[i];
    var priceArray = price[i];
    var typeHouseArray = typeHouse[i];
    var roomsArray = rooms[i];
    var guestArray = guest[i];
    var checkinArray = checkin[i];
    var checkoutArray = checkout[i];
    var featuresArray = createRandomLength(0, 6, features);
    var descriptionArray = description[i];
    var photosArray = createRandomLength(0, 3, photos);
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

var createRandomLength = function (intA, intB, list) {
  var randomLength = getRandomNumber(intA, intB);
  var listRandom = [];
  for (var i = 0; i < randomLength; i++) {
    listRandom[i] = list[i];
  }
  listRandom = listRandom.toString();
  return listRandom;
};

var createCloneElement = function () {
  markElement = pin.cloneNode(true);
  return markElement;
};

var createNewElement = function (src, alt, coordinatesX, coordinatesY) {
  markElement.querySelector('img').src = src;
  markElement.querySelector('img').alt = alt;
  markElement.setAttribute('style', 'left: ' + coordinatesX + 'px; top: ' + coordinatesY + 'px');

  return markElement;
};

var avatar = AVATAR;
var title = TITLE;
var address = ADDRESS;
var price = PRICE;
var typeHouse = TYPE_HOUSE;
var rooms = ROOMS;
var guest = GUEST;
var checkin = CHECKIN;
var checkout = CHECKOUT;
var features = FEATURES;
var description = DESCRIPTION;
var photos = PHOTOS;

var aannouncement = createNewArray(8, avatar, title, address, price, typeHouse, rooms, guest, checkin, checkout, features, description, photos);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pin = document.querySelector('#pin')
                  .content
                  .querySelector('.map__pin');

var mapPins = document.querySelector('.map__pins');
var markElement;
var fragment = document.createDocumentFragment();

for (var i = 0; i < aannouncement.length; i++) {
  var src = aannouncement[i].author.avatar;
  var alt = aannouncement[i].offer.title;
  var coordinatesX = aannouncement[i].location.x + OFFSET_BY_X;
  var coordinatesY = aannouncement[i].location.y + OFFSET_BY_Y;

  createCloneElement(pin);
  createNewElement(src, alt, coordinatesX, coordinatesY);

  fragment.appendChild(markElement);
}

mapPins.appendChild(fragment);
