 var map, infowindow;

 function initMap() {
   // Try HTML5 geolocation.
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position) {
       var myLoc = {
         lat: position.coords.latitude,
         lng: position.coords.longitude
       };
       map = new google.maps.Map(document.getElementById('map'), {
         center: myLoc,
         zoom: 13
       });
       infowindow = new google.maps.InfoWindow();
       var service = new google.maps.places.PlacesService(map);
       service.nearbySearch({
         location: myLoc,
         radius: 15000,
         type: ['bar']
       }, callback);
     });
   } else {
     // Browser doesn't support Geolocation
     handleLocationError(false, infoWindow, map.getCenter());
   }
 }

 function handleLocationError(browserHasGeolocation, infoWindow, pos) {
   infoWindow.setPosition(pos);
   infoWindow.setContent(browserHasGeolocation ?
     'Error: The Geolocation service failed.' :
     'Error: Your browser doesn\'t support geolocation.');
   infoWindow.open(map);
 }
 
 function callback(results, status) {
   if (status === google.maps.places.PlacesServiceStatus.OK) {
     for (var i = 0; i < results.length; i++) {
       createMarker(results[i]);
     }
   }
 }

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}



//  function createMarkers(places) {
//         var bounds = new google.maps.LatLngBounds();
//         var placesList = document.getElementById('places');

//          var marker = new google.maps.Marker({
//             map: map,
//             icon: image,
//             title: place.name,
//             position: place.geometry.location
//           });

//           var li = document.createElement('li');
//           li.textContent = place.name;
//           placesList.appendChild(li);

//           bounds.extend(place.geometry.location);
//         }
//         map.fitBounds(bounds);
//       }

