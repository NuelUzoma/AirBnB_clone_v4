<<<<<<< HEAD
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
=======
#!/usr/bin/node

$(document).ready(function() {
    let selAmenities = {};

    $('.amenity-checkbox').change(function() {
        const amenityId = $(this).data('amenity_id');
        if ($(this).is(':checked')) {
            selAmenities.push(amenityId);
        } else {
            selAmenities = selAmenities.filter(id => id !== amenityId);
        }
        updateAmenity();
    });

    function updateAmenity() {
        const amenityText = selAmenities.join(', ');
        $('div.amenities h4').text(Object.values(amenityText));
    };
});
>>>>>>> master
