'use strict';

window.map = (function () {
  var mainPlacemark = document.querySelector('.map__pin--main');
  var placemarkAddress = document.getElementById('address');

  mainPlacemark.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    /*
    var startCoordsX = mainPlacemark.style.left.replace('px', '');

    console.log(mainPlacemark.style.left);
    console.log(startCoordsX);
    */
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPlacemark.style.top = (mainPlacemark.offsetTop - shift.y) + 'px';
      mainPlacemark.style.left = (mainPlacemark.offsetLeft - shift.x) + 'px';
      /*
      if ((mainPlacemark.offsetLeft - shift.x) < 100) {
        mainPlacemark.style.top = (mainPlacemark.offsetTop - shift.y) + 'px';
        mainPlacemark.style.left = (mainPlacemark.offsetLeft - shift.x) + 'px';
      } else {
        mainPlacemark.style.top = (mainPlacemark.offsetTop - shift.y) + 'px';
        mainPlacemark.style.left = 100 + 'px';
      }
      */
      var pinX = (mainPlacemark.offsetLeft - shift.x) + window.data.WIDTH_OF_PLACEMARK / 2;
      var pinY = (mainPlacemark.offsetTop - shift.y) + window.data.HEIGHT_OF_PLACEMARK;

      placemarkAddress.value = pinX + ', ' + pinY;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPlacemark.removeEventListener('click', onClickPreventDefault);
        };
        mainPlacemark.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  /*
  var mainPlacemarkX = startCoords.x + window.pin.WIDTH_OF_PLACEMARK / 2;
  var mainPlacemarkY = startCoords.y + window.pin.HEIGHT_OF_PLACEMARK;

  placemarkAddress.value = mainPlacemarkX + ',' + mainPlacemarkY;
  */
})();
