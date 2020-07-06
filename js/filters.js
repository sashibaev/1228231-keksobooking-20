'use strict';

window.filters = (function () {
  var Value = {
    ANY: 'any',
    MIDDLE: 'middle',
    LOW: 'low',
    HIGH: 'high'
  };

  var Price = {
    MAX_LOW: 10000,
    MIN_MIDDLE: 10000,
    MAX_MIDDLE: 50000,
    MIN_HIGH: 50000
  };

  var filtersForm = document.querySelector('.map__filters');
  var housingTypeFilter = filtersForm.querySelector('#housing-type');
  var housingPriceFilter = filtersForm.querySelector('#housing-price');
  var housingRoomsFilter = filtersForm.querySelector('#housing-rooms');
  var housingGuestsFilter = filtersForm.querySelector('#housing-guests');

  var wifiInputFilter = filtersForm.querySelector('#filter-wifi');
  var dishwasherInputFilter = filtersForm.querySelector('#filter-dishwasher');
  var parkingInputFilter = filtersForm.querySelector('#filter-parking');
  var washerInputFilter = filtersForm.querySelector('#filter-washer');
  var elevatorInputFilter = filtersForm.querySelector('#filter-elevator');
  var conditionerInputFilter = filtersForm.querySelector('#filter-conditioner');

  var verifyCheckbox = function (element, arrayElement) {
    if (element.checked) {
      return arrayElement.filter(function (array) {
        var arrayOfferFeatures;
        array.offer.features.forEach(function (feature) {
          if (feature === element.value) {
            arrayOfferFeatures = feature;
          }
        });

        return arrayOfferFeatures && arrayOfferFeatures.length > 0;
      });
    }

    return arrayElement;
  };

  var templateFilter = function (element1, element2, arrayElement, typeField) {
    if (element1.value === Value.ANY) {
      return arrayElement;
    }

    return arrayElement.filter(function (arrayItem) {
      return arrayItem.offer[typeField] === element2;
    });
  };

  filtersForm.addEventListener('change', function () {

    window.debounce.debounceFilter(function () {
      window.map.howToCreateMap();

      var housingTypeFilterValue = housingTypeFilter.value;
      var newArrayOfAdsType = templateFilter(housingTypeFilter, housingTypeFilterValue, window.main.arrayOfAds, 'type');

      switch (housingPriceFilter.value) {
        case Value.ANY:
          var newArrayOfAdsPrice = newArrayOfAdsType;
          break;
        case Value.MIDDLE:
          newArrayOfAdsPrice = newArrayOfAdsType.filter(function (array) {
            return array.offer.price >= Price.MIN_MIDDLE && array.offer.price <= Price.MAX_MIDDLE;
          });
          break;
        case Value.LOW:
          newArrayOfAdsPrice = newArrayOfAdsType.filter(function (array) {
            return array.offer.price < Price.MAX_LOW;
          });
          break;
        case Value.HIGH:
          newArrayOfAdsPrice = newArrayOfAdsType.filter(function (array) {
            return array.offer.price > Price.MIN_HIGH;
          });
          break;
      }

      var housingRoomsFilterValue = Number(housingRoomsFilter.value);
      var newArrayOfAdsRooms = templateFilter(housingRoomsFilter, housingRoomsFilterValue, newArrayOfAdsPrice, 'rooms');

      var housingGuestsFilterValue = Number(housingGuestsFilter.value);
      var newArrayOfAdsGuests = templateFilter(housingGuestsFilter, housingGuestsFilterValue, newArrayOfAdsRooms, 'guests');

      var newArrayOfAdsCheckboxWifi = verifyCheckbox(wifiInputFilter, newArrayOfAdsGuests);
      var newArrayOfAdsCheckboxDishwasher = verifyCheckbox(dishwasherInputFilter, newArrayOfAdsCheckboxWifi);
      var newArrayOfAdsCheckboxParking = verifyCheckbox(parkingInputFilter, newArrayOfAdsCheckboxDishwasher);
      var newArrayOfAdsCheckboxWasher = verifyCheckbox(washerInputFilter, newArrayOfAdsCheckboxParking);
      var newArrayOfAdsCheckboxElevator = verifyCheckbox(elevatorInputFilter, newArrayOfAdsCheckboxWasher);
      var newArrayOfAdsCheckboxConditioner = verifyCheckbox(conditionerInputFilter, newArrayOfAdsCheckboxElevator);

      window.main.newArrayOfAds = newArrayOfAdsCheckboxConditioner;
      window.form.removePinsOnTheMap();
      window.pin.createPins(window.main.newArrayOfAds);
      window.map.doWhenClicked();
    });
  });
})();
