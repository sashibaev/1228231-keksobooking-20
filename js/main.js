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
  var intC = getRandomNumber(intA, intB);
  list.slice(intA, intC);
  return list;
};

var createCloneElement = function (element) {
  return element.cloneNode(true);
};

var markElement;

var createNewElementMark = function (srcAvatar, alt, coordinatesX, coordinatesY) {
  markElement.querySelector('img').src = srcAvatar;
  markElement.querySelector('img').alt = alt;
  markElement.setAttribute('style', 'left: ' + coordinatesX + 'px; top: ' + coordinatesY + 'px');

  return markElement;
};

var cardElement;

var createNewElementCard = function (title, address, price, type, rooms, guest, checkin, checkout, features, description, srcPhoto, srcAvatar) {
  var textRooms = ' комнаты для ';
  var textGuest = ' гостей';

  if (rooms === 1) {
    textRooms = ' комната для ';
  }

  if (guest === 1) {
    textGuest = ' гостя';
  }

  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price').textContent = price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = type;
  cardElement.querySelector('.popup__text--capacity').textContent = rooms + textRooms + guest + textGuest;
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + checkin + ', Выезд до ' + checkout;
  cardElement.querySelector('.popup__features').textContent = features;
  cardElement.querySelector('.popup__description').textContent = description;
  cardElement.querySelector('.popup__photo').src = srcPhoto;
  cardElement.querySelector('.popup__avatar').src = srcAvatar;

  if (price === '') {
    cardElement.querySelector('.popup__text--price').textContent = '';
  }

  if (rooms === '' || guest === '') {
    cardElement.querySelector('.popup__text--capacity').textContent = '';
  }

  if (checkin === '' || checkout === '') {
    cardElement.querySelector('.popup__text--time').textContent = '';
  }

  return cardElement;
};

var aannouncement = createNewArray(8, AVATAR, TITLE, ADDRESS, PRICE, TYPE_HOUSE, ROOMS, GUEST, CHECKIN, CHECKOUT, FEATURES, DESCRIPTION, PHOTOS);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pin = document.querySelector('#pin')
                  .content
                  .querySelector('.map__pin');

var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var card = document.querySelector('#card')
                  .content
                  .querySelector('.map__card');

var mapFilter = document.querySelector('.map__filters-container');

aannouncement.forEach(function (item, i) {
  var srcAvatar = aannouncement[i].author.avatar;
  var alt = aannouncement[i].offer.title;
  var coordinatesX = aannouncement[i].location.x + OFFSET_BY_X;
  var coordinatesY = aannouncement[i].location.y + OFFSET_BY_Y;

  markElement = createCloneElement(pin);
  createNewElementMark(srcAvatar, alt, coordinatesX, coordinatesY);

  fragment.appendChild(markElement);
});

mapPins.appendChild(fragment);

for (var i = 0; i < 1; i++) {
  var title = aannouncement[i].offer.title;
  var address = aannouncement[i].offer.address;
  var price = aannouncement[i].offer.price;
  var type = aannouncement[i].offer.type;
  var rooms = aannouncement[i].offer.rooms;
  var guest = aannouncement[i].offer.guest;
  var checkin = aannouncement[i].offer.checkin;
  var checkout = aannouncement[i].offer.checkout;
  var features = aannouncement[i].offer.features;
  var description = aannouncement[i].offer.description;
  var srcPhoto = aannouncement[i].offer.photos;
  var srcAvatar = aannouncement[i].author.avatar;

  cardElement = createCloneElement(card);
  createNewElementCard(title, address, price, type, rooms, guest, checkin, checkout, features, description, srcPhoto, srcAvatar);

  fragment.appendChild(cardElement);
}

map.insertBefore(fragment, mapFilter);
