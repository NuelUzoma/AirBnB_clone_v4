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
