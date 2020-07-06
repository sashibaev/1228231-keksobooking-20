'use strict';

window.fileForm = (function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var loadAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview');
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
        previewPhotoHouse.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
