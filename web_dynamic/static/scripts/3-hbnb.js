const w = window.$;

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

// http://0.0.0.0:5001/api/v1/status/
// http://localhost:5001/api/v1/status/

const url = 'http://localhost:5001/api/v1/status/';

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
const placesSearchUrl = 'http://localhost:5001/api/v1/places_search/';
w.ajax({
  type: 'POST',
  url: placesSearchUrl,
  data: '{}',
  contentType: 'application/json',
  success: (result) => {
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
        <div class="user">
              <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
            </div>
            <div class="description">
          ${place.description}
            </div>
      </article>`
      );
    });
  }
});
