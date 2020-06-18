'use strict';

(function () {
  var cardElement;
  var activeMode = false;
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

  /* Временно */
  var fragment = document.createDocumentFragment();

  var createCloneElement = function (element) {
    return element.cloneNode(true);
  };
  /*  */
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


  var createNewCard = function (index) {
    var card = document.querySelector('#card')
                    .content
                    .querySelector('.map__card');

    var mapFilter = document.querySelector('.map__filters-container');

    var title = window.data.aannouncement[index].offer.title;
    var address = window.data.aannouncement[index].offer.address;
    var price = window.data.aannouncement[index].offer.price;
    var type = window.data.aannouncement[index].offer.type;
    var rooms = window.data.aannouncement[index].offer.rooms;
    var guest = window.data.aannouncement[index].offer.guest;
    var checkin = window.data.aannouncement[index].offer.checkin;
    var checkout = window.data.aannouncement[index].offer.checkout;
    var features = window.data.aannouncement[index].offer.features;
    var description = window.data.aannouncement[index].offer.description;
    var srcPhoto = window.data.aannouncement[index].offer.photos[0];
    var srcAvatar = window.data.aannouncement[index].author.avatar;
    var photoElement;

    cardElement = createCloneElement(card);

    cardElement = createNewElementCard(title, address, price, type, rooms, guest, checkin, checkout, features, description, srcPhoto, srcAvatar);

    map.insertBefore(cardElement, mapFilter);

    var popupPhotos = document.querySelector('.popup__photos');
    var popupPhoto = document.querySelector('.popup__photo');
    var srcPhotoList = window.data.aannouncement[index].offer.photos;

    for (var i = 1; i < srcPhotoList.length; i++) {
      var srcPhotosElement = window.data.aannouncement[index].offer.photos[i];

      photoElement = createCloneElement(popupPhoto);
      photoElement.classList.add('popup__photo');
      photoElement.src = srcPhotosElement;

      fragment.appendChild(photoElement);
    }
    popupPhotos.appendChild(fragment);

    return (cardElement);
  };

  var createPinCard = function (item) {
    item.addEventListener('click', function () {
      var numberId = item.getAttribute('id');

      if (cardElement) {
        cardElement.remove();
      }

      cardElement = createNewCard(numberId);
      cardElement.classList.remove('visually-hidden');

      var popupClose = map.querySelector('.popup__close');

      popupClose.addEventListener('mousedown', function (evt) {
        if (evt.which === 1) {
          cardElement.remove();
        }
      });
    });
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.which === 1 && activeMode === false) {
      window.main.pageActivation();
      activeMode = true;
    }
    var pinId = document.querySelectorAll('.map__pin-generated');

    pinId.forEach(createPinCard);
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13 && activeMode === false) {
      window.main.pageActivation();
      activeMode = true;
    }
    var pinId = document.querySelectorAll('.map__pin-generated');

    pinId.forEach(createPinCard);
  });

  map.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      cardElement.remove();
    }
  });
})();
