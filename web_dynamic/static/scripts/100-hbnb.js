#!/usr/bin/node

const w = window.$;
const url = 'http//localhost:5001/api/v1/status/';
const placesSearchUrl = 'http://localhost:5001/api/v1/places_search/';
// http://0.0.0.0:5001/api/v1/status/
// http://localhost:5001/api/v1/status/
// alx-cod.online address changed to mine.
// http://da0707e367e3.3e24de83.alx-cod.online:5001/api/v1/status/

w(function () {
  const amenities = {};
  w('div.amenities li input').change(function () {
    if (w(this).is(':checked')) {
      amenities[w(this).attr('data-id')] = w(this).attr('data-name');
    } else {
      delete amenities[w(this).attr('data-id')];
    }
    w('div.amenities h4').text(Object.values(amenities).join(', '));
  });
});
console.log('I am in the browser');

const checkStatus = (data) => {
  w('document').ready(() => {
    if (data.status === 'OK') {
      w('div#api_status').addClass('available');
    } else {
      w('div#api_status').removeClass('available');
    }
    console.log(data.status);
  });
};

w.get(url, checkStatus);

// making ajax post request to http://0.0.0.0:5001/api/v1/places_search/
// to display contents
// alx-cod online address changed to mine.
// http://da0707e367e3.3e24de83.alx-cod.online:5001/api/v1/places_search/

// function for places
const placesAmenity = (result) => {
  w.each(result, (i, place) => {
    w('.place-content').append(
          `<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest}</div>
                <div class="number_rooms">${place.number_rooms}</div>
                <div class="number_bathrooms">${place.number_bathrooms}</div>
          </div>
              <div class="description">
            ${place.description}
              </div>
        </article>`
    );
  });
};

// The function below is for States
const states = {};
const cities = {};
w('div.locations ul.popover li input[type="checkbox"]').change(function() {
    if (this.checked) {
        if (this.dataset['id'] in states) {
            delete states[this.dataset['id']]
        }
        cities[this.dataset['id']] = this.dataset['name'];
    } else {
        delete cities[this.dataset['id']];
    }
    if (Object.keys(cities).length > 0) {
        w('div.locations h4').text(Object.values(cities).join(', '));
    } else {
        w('div.locations h4').html('&nbsp;');
    }
});

// Function for Cities
w('div.locations ul.popover li h2 input[type="checkbox"]').change(function () {
  if (this.checked) {
    if (this.dataset['id'] in cities) {
      delete cities[this.dataset['id']];
    }
    states[this.dataset['id']] = this.dataset['name'];
  } else {
    delete states[this.dataset['id']];
  }
  if (Object.keys(states).length > 0) {
    w('div.locations h4').text(Object.values(states).join(', '));
  } else {
    w('div.locations h4').html('&nbsp;');
  }
});

w.ajax({
  type: 'POST',
  url: placesSearchUrl,
  data: '{}',
  contentType: 'application/json',
  success: placesAmenity
});

// function for button
w('document').ready(() => {
  w('button').click(() => {
    const amenities = {};
    const cities = {};
    const states = {};
    const data = {
        amenities: Object.keys(amenities),
        cities: Object.keys(cities),
        states: Object.keys(states)
    };
    w.ajax({
      type: 'POST',
      url: placesSearchUrl,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(data),
      success: placesAmenity
    });
  });
});