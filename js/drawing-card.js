'use strict';

window.drawingCard = (function () {
  var map = document.querySelector('.map');
  var fragment = document.createDocumentFragment();
  var cardElement;

  return {
    createNewCard: function (index) {
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

      cardElement = window.main.createCloneElement(card);

      cardElement = window.card.createNewElementCard(cardElement, title, address, price, type, rooms, guest, checkin, checkout, features, description, srcPhoto, srcAvatar);

      map.insertBefore(cardElement, mapFilter);

      var popupPhotos = document.querySelector('.popup__photos');
      var popupPhoto = document.querySelector('.popup__photo');
      var srcPhotoList = window.data.aannouncement[index].offer.photos;

      for (var i = 1; i < srcPhotoList.length; i++) {
        var srcPhotosElement = window.data.aannouncement[index].offer.photos[i];

        photoElement = window.main.createCloneElement(popupPhoto);
        photoElement.classList.add('popup__photo');
        photoElement.src = srcPhotosElement;

        fragment.appendChild(photoElement);
      }
      popupPhotos.appendChild(fragment);

      return (cardElement);
    }
  };
})();
