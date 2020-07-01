'use strict';

window.filters = (function () {
  var ANY_TYPE_HOUSING = 'any';
  var filtersForm = document.querySelector('.map__filters');
  var housingTypeFilter = filtersForm.querySelector('#housing-type');

  housingTypeFilter.addEventListener('change', function () {
    window.map.howToCreateMap();

    if (housingTypeFilter.value === ANY_TYPE_HOUSING) {
      window.main.newArrayOfAds = window.main.arrayOfAds;
      window.form.removePinsOnTheMap();
      window.pin.createPins(window.main.newArrayOfAds);
      window.map.doWhenClicked();
    } else {
      window.main.newArrayOfAds = window.main.arrayOfAds.filter(function (arrayOfAd) {
        return arrayOfAd.offer.type === housingTypeFilter.value;
      });
      window.form.removePinsOnTheMap();
      window.pin.createPins(window.main.newArrayOfAds);
      window.map.doWhenClicked();
    }
  });
})();
