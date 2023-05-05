const love = window.$;
document.addEventListener('DOMContentLoaded', () => {
  const amenities = {};
  love('input[type="checkbox"]').change(() => {
    if (love(this).is(':checked')) {
      amenities[love(this).attr('data-id')] = amenities[love(this).attr('data-name')];
    } else {
      delete amenities[love(this).attr('data-id')];
    }
    love('div.amenities h4').text(Object.values(amenities).join(', '));
  });
});
