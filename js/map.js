function initMap() {
    // Initialize map (straight from Google with Amsterdam coordinates).
    var ams = {lat: 52.3667, lng: 4.9000};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: ams
    });
}

function renderMap(markers) {
    // Reinitialize map.
    var ams = {lat: 52.3667, lng: 4.9000};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: ams
    });

    // Position and set markers on the map.
    $.each(markers, function(i, v) {
        var latlng = {lat: parseFloat(v[1]), lng: parseFloat(v[2])};
        console.log(latlng);
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: v[0]
        });
        marker.setMap(map);
    });
}
