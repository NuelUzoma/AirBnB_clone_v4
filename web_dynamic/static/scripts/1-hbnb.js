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
