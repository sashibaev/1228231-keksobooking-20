'use strict';

window.load = (function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var HTTP_METHOD = 'GET';

  var getDataFromTheServer = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.load.StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = window.load.TIMEOUT_IN_MS;

    xhr.open(HTTP_METHOD, URL);

    xhr.send();
  };
  return {
    StatusCode: {
      OK: 200
    },
    TIMEOUT_IN_MS: 10000,
    getDataFromTheServer: getDataFromTheServer
  };
})();
