const w = window.$;
const url = 'http://localhost:5001/api/v1/status/';
const placesSearchUrl = 'http://localhost:5001/api/v1/places_search/';
// http://0.0.0.0:5001/api/v1/status/
// http://localhost:5001/api/v1/status/
// using this url below is my alx localhost address,use your localhost for it to work.
// http://7c40a4f05206.85438db0.alx-cod.online:5001/api/v1/status/

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
// using this url below is my alx localhost address,use your localhost for it to work.
// http://7c40a4f05206.85438db0.alx-cod.online:5001/api/v1/places_search/

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
    const data = { amenities: Object.keys(amenities) };
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
