'use strict';

window.backend = (function () {
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var METHOD_GET = 'GET';
  var URL_UPLOAD = 'https://javascript.pages.academy/keksobooking';
  var METHOD_POST = 'POST';

  var exchangeDataWithTheServer = function (data, onSuccess, onError, method, url) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
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

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);

    xhr.send(data);
  };

  var loadDataFromTheServer = function (onSuccess, onError) {
    exchangeDataWithTheServer('', onSuccess, onError, METHOD_GET, URL_LOAD);
  };

  var saveDataFromTheServer = function (data, onSuccess, onError) {
    exchangeDataWithTheServer(data, onSuccess, onError, METHOD_POST, URL_UPLOAD);
  };

  return {
    loadDataFromTheServer: loadDataFromTheServer,
    saveDataFromTheServer: saveDataFromTheServer
  };
})();
