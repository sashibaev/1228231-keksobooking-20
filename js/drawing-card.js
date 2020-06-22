'use strict';

window.drawingCard = (function () {
  var map = document.querySelector('.map');

  var card = document.querySelector('#card')
      .content
      .querySelector('.map__card');

  return {
    createNewCard: function (aannouncement) {

      var mapFilter = document.querySelector('.map__filters-container');
      var fragment = document.createDocumentFragment();
      var cardElement;

      cardElement = card.cloneNode(true);

      cardElement = window.card.createNewElementCard(cardElement, aannouncement);

      map.insertBefore(cardElement, mapFilter);

      var popupPhotos = document.querySelector('.popup__photos');
      var popupPhoto = document.querySelector('.popup__photo');
      var srcPhotoList = aannouncement.offer.photos;

      for (var i = 1; i < srcPhotoList.length; i++) {
        var srcPhotosElement = aannouncement.offer.photos[i];

        var photoElement = popupPhoto.cloneNode(true);
        photoElement.classList.add('popup__photo');
        photoElement.src = srcPhotosElement;

        fragment.appendChild(photoElement);
      }
      popupPhotos.appendChild(fragment);

      return (cardElement);
    }
  };
})();
