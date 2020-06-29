'use strict';

window.upload = (function () {
  var URL = 'https://javascript.pages.academy/keksobooking';
  var HTTP_METHOD = 'POST';

  var toSendDataFromTheServer = function (data, onSuccess, onError) {
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
    xhr.send(data);
  };

  return {
    toSendDataFromTheServer: toSendDataFromTheServer
  };
})();
