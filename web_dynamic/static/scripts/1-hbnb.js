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