'use strict';

window.drawingCard = (function () {
  var map = document.querySelector('.map');

  var card = document.querySelector('#card')
      .content
      .querySelector('.map__card');

  var createNewCard = function (array) {

    var mapFilter = document.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();

    var cardElement = card.cloneNode(true);
    cardElement = window.card.createNewElementCard(cardElement, array);

    map.insertBefore(cardElement, mapFilter);

    var popupPhotos = document.querySelector('.popup__photos');
    var popupPhoto = document.querySelector('.popup__photo');
    var srcPhotosList = array.offer.photos;

    srcPhotosList.shift();

    srcPhotosList.forEach(function (srcPhotoElement) {
      var srcPhotosElement = srcPhotoElement;

      var photoElement = popupPhoto.cloneNode(true);
      photoElement.classList.add('popup__photo');
      photoElement.src = srcPhotosElement;

      fragment.appendChild(photoElement);
    });
    popupPhotos.appendChild(fragment);

    return cardElement;
  };
  return {
    createNewCard: createNewCard
  };
})();
