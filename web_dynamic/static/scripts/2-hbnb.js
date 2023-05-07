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

$(document).ready(function() {
    const url = 'http://0.0.0.0:5001/api/v1/status/';

    const respStatus = (data) => {
        if (data.status === 'OK') {
            $('DIV#api_status').addClass('available');
        } else {
            $('DIV#api_status').removeClass('available');
        }
        console.log(data.status);
    });

    $.get(url, respStatus);
