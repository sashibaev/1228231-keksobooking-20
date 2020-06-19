'use strict';

window.map = (function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var placemarkAddress = document.getElementById('address');
  var activeMode = false;

  mapPinMain.addEventListener('mousedown', function (evt) {
    //  evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

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

      if ((mapPinMain.offsetLeft - shift.x) < -24) {
        var flag1 = true;
      }
      if ((mapPinMain.offsetLeft - shift.x) > 1173) {
        var flag2 = true;
      }
      if ((mapPinMain.offsetTop - shift.y) < 61) {
        var flag3 = true;
      }
      if ((mapPinMain.offsetTop - shift.y) > 559) {
        var flag4 = true;
      }

      if (flag1) {
        mapPinMain.style.left = -24 + 'px';
      }
      if (flag2) {
        mapPinMain.style.left = 1173 + 'px';
      }
      if (flag3) {
        mapPinMain.style.top = 61 + 'px';
      }
      if (flag4) {
        mapPinMain.style.top = 559 + 'px';
      }
      if (!flag1 && !flag2 && !flag3 && !flag4) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }

      var pinX = (mapPinMain.offsetLeft - shift.x) + window.data.WIDTH_OF_PLACEMARK / 2;
      var pinY = (mapPinMain.offsetTop - shift.y) + window.data.HEIGHT_OF_PLACEMARK;

      placemarkAddress.value = pinX + ', ' + pinY;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {

        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();

          mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      } else {

        if (evt.which === 1 && activeMode === false) {
          window.main.pageActivation();
          activeMode = true;
        }
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
