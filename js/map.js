function initMap() {
    var ams = {lat: 52.3667, lng: 4.9000};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: ams
    });
}

function renderMap(markers) {
    var ams = {lat: 52.3667, lng: 4.9000};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: ams
    });

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
