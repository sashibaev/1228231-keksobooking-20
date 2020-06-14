'use strict';

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
var OFFSET_BY_X = 20;
var OFFSET_BY_Y = 60;

var markElement;
var alt;
var coordinatesX;
var coordinatesY;

var getRandomNumber = function (intA, intB) {
  return (intA + Math.floor(Math.random() * intB));
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
    var featuresArray = createRandomLength(0, 6, value10);
    var descriptionArray = value11[i];
    var photosArray = createRandomLength(0, 3, value12);
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

var createNewElementMark = function (value1, value2, value3, value4) {
  markElement.querySelector('.map__pin img').src = value1;
  markElement.querySelector('.map__pin img').alt = value2;
  markElement.setAttribute('style', 'left: ' + value3 + 'px; top: ' + value4 + 'px');

  return markElement;
};

var addAttributeDisabled = function (element, index) {
  element[index].setAttribute('disabled', 'disabled');
  return element[index];
};

var removeAttributeDisabled = function (element, index) {
  element[index].removeAttribute('disabled', 'disabled');
  return element[index];
};

/* Закомментировали, согласно условию задания */
/*
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

var cardElement;

var createNewElementCard = function (title, address, price, type, rooms, guest, checkin, checkout, features, description, srcPhoto, srcAvatar) {
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

  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price').textContent = checkingTheTextMissing(price, null, price, textPrice, '', '');
  cardElement.querySelector('.popup__type').textContent = type;
  cardElement.querySelector('.popup__text--capacity').textContent = checkingTheTextMissing(rooms, guest, rooms, textRooms, guest, textGuest);
  cardElement.querySelector('.popup__text--time').textContent = checkingTheTextMissing(checkin, checkout, textCheckin, checkin, textCheckout, checkout);
  cardElement.querySelector('.popup__features').textContent = features;
  cardElement.querySelector('.popup__description').textContent = description;
  cardElement.querySelector('.popup__photo').src = srcPhoto;
  cardElement.querySelector('.popup__avatar').src = srcAvatar;

  return cardElement;
};
*/

var aannouncement = createNewArray(8, AVATAR, TITLE, ADDRESS, PRICE, TYPE_HOUSE, ROOMS, GUEST, CHECKIN, CHECKOUT, FEATURES, DESCRIPTION, PHOTOS);

var adForm = document.querySelector('.ad-form');
adForm.setAttribute('action', 'https://javascript.pages.academy/keksobooking');
var formFieldset = adForm.querySelectorAll('fieldset');

for (var j = 0; j < formFieldset.length; j++) {
  addAttributeDisabled(formFieldset, j);
}

var formMapFilters = document.querySelector('.map__filters');

for (j = 0; j < formMapFilters.childNodes.length; j++) {
  addAttributeDisabled(formMapFilters, j);
}

var pin = document.querySelector('#pin')
                  .content
                  .querySelector('.map__pin');

var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

/* Закомментировали, согласно условию задания */
/*
var card = document.querySelector('#card')
                  .content
                  .querySelector('.map__card');

var map = document.querySelector('.map');
var mapFilter = document.querySelector('.map__filters-container');

var title = aannouncement[0].offer.title;
var address = aannouncement[0].offer.address;
var price = aannouncement[0].offer.price;
var type = aannouncement[0].offer.type;
var rooms = aannouncement[0].offer.rooms;
var guest = aannouncement[0].offer.guest;
var checkin = aannouncement[0].offer.checkin;
var checkout = aannouncement[0].offer.checkout;
var features = aannouncement[0].offer.features;
var description = aannouncement[0].offer.description;
var srcPhoto = aannouncement[0].offer.photos[0];
var srcAvatar = aannouncement[0].author.avatar;
var photoElement;

cardElement = createCloneElement(card);
createNewElementCard(title, address, price, type, rooms, guest, checkin, checkout, features, description, srcPhoto, srcAvatar);

map.insertBefore(cardElement, mapFilter);

var popupPhotos = document.querySelector('.popup__photos');
var popupPhoto = document.querySelector('.popup__photo');
var srcPhotoList = aannouncement[0].offer.photos;

for (var i = 1; i < srcPhotoList.length; i++) {
  var srcPhotosElement = aannouncement[0].offer.photos[i];

  photoElement = createCloneElement(popupPhoto);
  photoElement.classList.add('popup__photo');
  photoElement.src = srcPhotosElement;

  fragment.appendChild(photoElement);
}
popupPhotos.appendChild(fragment);
*/

var mapPinMain = document.querySelector('.map__pin--main');
var placemarkAddress = document.getElementById('address');

var pageActivation = function () {
  aannouncement.forEach(function (item, index) {
    var srcAvatar = aannouncement[index].author.avatar;
    alt = aannouncement[index].offer.title;
    coordinatesX = aannouncement[index].location.x + OFFSET_BY_X;
    coordinatesY = aannouncement[index].location.y + OFFSET_BY_Y;

    markElement = createCloneElement(pin);
    createNewElementMark(srcAvatar, alt, coordinatesX, coordinatesY);

    fragment.appendChild(markElement);
  });

  mapPins.appendChild(fragment);

  adForm.classList.remove('ad-form--disabled');

  for (j = 0; j < formFieldset.length; j++) {
    removeAttributeDisabled(formFieldset, j);
  }

  for (j = 0; j < formMapFilters.childNodes.length; j++) {
    removeAttributeDisabled(formMapFilters, j);
  }

  placemarkAddress.value = '600, 380';
};

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    pageActivation();
  }
});

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    pageActivation();
  }
});

var roomNumberForm = adForm.querySelector('#room_number');
var capacityForm = adForm.querySelector('#capacity');

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
});
