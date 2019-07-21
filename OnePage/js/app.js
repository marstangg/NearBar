var map;
var infowindow;

function initialize() {
  var latlon = new google.maps.LatLng(1.35, 103.891);
  mapCanvas = document.getElementById('map');
  mapCanvas.style.height = '500px';
  mapCanvas.style.width =  '500px';


  map = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: latlon,
    zoom: 15
  });

  var currentMarker = new google.maps.Marker({
    map: map,
    position: latlon,
    title: 'Current Location',
    icon: {
      url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
      size: new google.maps.Size(7, 7),
      anchor: new google.maps.Point(3.5, 3.5)
    }
  });
   
  var request = {
    location: latlon,
    radius: 5000,
    types: ['bar']
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    document.getElementById('status').innerHTML = results.length + " places found";
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  } else
    alert("Status not OK");
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

google.maps.event.addDomListener(window, 'load', initialize);

// var map, infoWindow;

// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: { lat: 1.35, lng: 103.891 },
//     zoom: 15
//   });
  
//   var request = {
//     location: pyrmont,
//     radius: '5000',
//     types: ['restaurant']
//     };

//     infowindow = new google.maps.InfoWindow();

//     var service = new google.maps.places.PlacesService(map);
//     service.nearbySearch(request, callback);

 
  
//   // Try HTML5 geolocation.
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };
  
//       infoWindow.setPosition(pos);
//       infoWindow.setContent('Location found.');
//       infoWindow.open(map);
//       map.setCenter(pos);
//     }, function() {
//       handleLocationError(true, infoWindow, map.getCenter());
//     });
  
//     infowindow = new google.maps.InfoWindow();
//     var service = new google.maps.places.PlacesService(map);
  
//         // bars
//         var req_bar = { location: location, radius: 5000, types: ['bar'] };
//         service.search(req_bank, function (results, status) {
//         locations(results, status, "bar");
//       });
//   }
    
//   else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//   }
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(browserHasGeolocation ?
//     'Error: The Geolocation service failed.' :
//     'Error: Your browser doesn\'t support geolocation.');
//   infoWindow.open(map);
// }




// function callback(results, status)
// {

//     if (status == google.maps.places.PlacesServiceStatus.OK)
//     {
//         for (var i = 0; i < results.length; i++)
//         {
//             createMarker(results[i]);
//         }
//     }
// }

// function createMarker(place)
// {
//     var placeLoc = place.geometry.location;
//     var marker = new google.maps.Marker({
//                                         map: map,
//                                         position: place.geometry.location
//                                         });

//     google.maps.event.addListener(marker, 'click', function() {
//                                   infowindow.setContent(place.name);
//                                   infowindow.open(map, this);
//                                   });
// }

//   map = new google.maps.Map(document.getElementById('map'), {
//     center: { lat: 1.35, lng: 103.891 },
//     zoom: 13
//   });
    
//     var request = {
//     location: map.getCenter(),
//     radius: '5000',
//     types: ['bar']
//     };

//     infowindow = new google.maps.InfoWindow();

//     var service = new google.maps.places.PlacesService(map);
//     service.nearbySearch(request, callback);

// }



// function initMap() {
//   // Create the map.
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 1.35, lng: 103.891},
//     zoom: 12
//   });
// infoWindow = new google.maps.InfoWindow; 
 
//   // Create the places service.
//   var service = new google.maps.places.PlacesService('map');
//   var getNextPage = null;
//   var moreButton = document.getElementById('more');
//   moreButton.onclick = function() { 
//     moreButton.disabled = true;
//     if (getNextPage) getNextPage();
//   };
// if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(function(position) {
//             var pos = {
//               lat: position.coords.latitude,
//               lng: position.coords.longitude
//             };

//             infoWindow.setPosition(pos);
//             infoWindow.setContent('Location found.');
//             infoWindow.open(map);
//             map.setCenter(pos);
//           }, function() {
//             handleLocationError(true, infoWindow, map.getCenter());
//           });
//         } else {
//           // Browser doesn't support Geolocation
//           handleLocationError(false, infoWindow, map.getCenter());
//         }
//       }

//       function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//         infoWindow.setPosition(pos);
//         infoWindow.setContent(browserHasGeolocation ?
//                               'Error: The Geolocation service failed.' :
//                               'Error: Your browser doesn\'t support geolocation.');
                              
//         infoWindow.open(map);


//   // Perform a nearby search.
//   service.nearbySearch(
//       {location: center, radius: 5000, type: ['bar']},
//       function(results, status, pagination) {
//         if (status !== 'OK') return;

//         createMarkers(results);
//         moreButton.disabled = !pagination.hasNextPage;
//         getNextPage = pagination.hasNextPage && function() {
//           pagination.nextPage();
//         };
//       });
// }

// function createMarkers(places) {
//   var bounds = new google.maps.LatLngBounds();
//   var placesList = document.getElementById('places');

//   for (var i = 0, place; place = places[i]; i++) {
//     var image = {
//       url: place.icon,
//       size: new google.maps.Size(71, 71),
//       origin: new google.maps.Point(0, 0),
//       anchor: new google.maps.Point(17, 34),
//       scaledSize: new google.maps.Size(25, 25)
//     };

//     var marker = new google.maps.Marker({
//       map: map,
//       icon: image,
//       title: place.name,
//       position: place.geometry.location
//     });

//     var li = document.createElement('li');
//     li.textContent = place.name;
//     placesList.appendChild(li);

//     bounds.extend(place.geometry.location);
//   }
//   map.fitBounds(bounds);
// }