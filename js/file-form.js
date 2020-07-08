'use strict';

window.fileForm = (function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var imgPhotoHouse;

  var loadAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var loadPhotoHouse = document.querySelector('.ad-form__upload input[type=file]');
  var previewPhotoHouse = document.querySelector('.ad-form__photo');

  loadAvatar.addEventListener('change', function () {
    var file = loadAvatar.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  loadPhotoHouse.addEventListener('change', function () {
    var file = loadPhotoHouse.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        window.fileForm.imgPhotoHouse = document.createElement('img');
        previewPhotoHouse.append(window.fileForm.imgPhotoHouse);
        var srcPhotoHouse = reader.result;
        window.fileForm.imgPhotoHouse.setAttribute('src', srcPhotoHouse);
        window.fileForm.imgPhotoHouse.setAttribute('width', '60px', 'height', '60px');
      });

      reader.readAsDataURL(file);
    }
  });

  return {
    imgPhotoHouse: imgPhotoHouse
  };
})();
