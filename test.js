var map;
var markers = [];
function addMarkerWithTimeout(position, timeout, name) {
  window.setTimeout(function () {
    markers.push(new google.maps.Marker({
      position: position,
      map: map,
      title: "Click Me",
      animation: google.maps.Animation.DROP
    }));
  }, timeout); 
    var myOptions = {
        zoom: 7,
        center: position,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    var marker = new google.maps.Marker
    (
        {
            position: new google.maps.LatLng(-34.397, 150.644),
            map: map,
            title: 'Click me'
        }
    );
    var infowindow = new google.maps.InfoWindow({
        content: name,
        LatLng: position,
    });
    google.maps.event.addListener(marker, 'click', function () {
        // Calling the open method of the infoWindow 
        infowindow.open(map, marker);
    });
}





/***************     Markers  ***************************/
var markers = [];
function addMarkerWithTimeout(name, position, timeout) {
  window.setTimeout(function () {
   
    infowindow = google.maps.InfoWindow({
      content: toString(name),
    })

    markers.push(new google.maps.Marker({
      position: position,
      map: map,
      title: "Click Me",
      animation: google.maps.Animation.DROP
    }));
    google.maps.event.addListener(markers, "click", function(){
      infowindow.open(map, markers);
    })  
  }, timeout);
}