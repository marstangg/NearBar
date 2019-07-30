 let pos;
 let map;
 let bounds;
 let infoWindow;
 let currentInfoWindow;
 let service;
 let infoPane;
 var filterfive = document.getElementById("filterfive");
     // Initialize map
     function initMap() {
     bounds = new google.maps.LatLngBounds();
     infoWindow = new google.maps.InfoWindow;
     currentInfoWindow = infoWindow;
     infoPane = document.getElementById('panel');

    // Try HTML5 geolocation
     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(position => {
             pos = {
                 lat: position.coords.latitude,
                 lng: position.coords.longitude
             };
             map = new google.maps.Map(document.getElementById('map'), {
                 center: pos,
                 zoom: 15
             });

             bounds.extend(pos);
             infoWindow.setPosition(pos);
             infoWindow.setContent('You are Here!');
             infoWindow.open(map);
             map.setCenter(pos);
             var marker = new google.maps.Marker({
             position: pos,
             icon: 'images/youarehere.png',
             map: map
          });
             // Call Places Nearby Search on user's location
             getNearbyPlaces(pos);
         }, () => {
             // Browser supports geolocation, but user has denied permission
             handleLocationError(true, infoWindow);
         });
     }
     else {
         // Browser doesn't support geolocation
         handleLocationError(false, infoWindow);
     }
 }
 // Handle a geolocation error
 function handleLocationError(browserHasGeolocation, infoWindow) {
     // Set default location to singapore
     pos = { lat: 1.35, lng: 103.891 };
     map = new google.maps.Map(document.getElementById('map'), {
         center: pos,
         zoom: 13
     });
     // Display an InfoWindow at the map center
     infoWindow.setPosition(pos);
     infoWindow.setContent(browserHasGeolocation ?
         'Geolocation permissions denied. Using default location.' :
         'Error: Your browser doesn\'t support geolocation.');
     infoWindow.open(map);
     currentInfoWindow = infoWindow;
// Call Places Nearby Search on the default location
     getNearbyPlaces(pos);
 }
 // Perform a Places Nearby Search Request
     function getNearbyPlaces(position) {
     let request = {
         location: position,
         rankBy: google.maps.places.RankBy.DISTANCE,
         keyword: 'bar'

  };
     service = new google.maps.places.PlacesService(map);
     service.nearbySearch(request, nearbyCallback);
}
    
    
    function getNearbyPlaces2(position) {
     let request = {
         location: position,
         radius: 5000,
         keyword: 'bar'

  };
     service = new google.maps.places.PlacesService(map);
     service.nearbySearch(request, nearbyCallback);
} 
    
    
    
    
 // Handle the results of the Nearby Search
 function nearbyCallback(results, status) {
     if (status == google.maps.places.PlacesServiceStatus.OK) {
         createMarkers(results);
     }
   }

 // Set markers at the location of each place result
      function createMarkers(places) {
      places.forEach(place => {
         let marker = new google.maps.Marker({
             position: place.geometry.location,
             map: map,
             title: place.name,
             icon: 'images/pub-icon.png'
         });
         
       let marker2 = new google.maps.Marker({
             position: place.geometry.location,
             radius:5000,
             map: map,
             title: place.name,
             icon: 'images/pub-icon.png'
         });
 // Only fetch the details of a place when the user clicks on a marker*/
         google.maps.event.addListener(marker, 'click', () => {
             let request = {
                 placeId: place.place_id,
                 fields: ['name', 'formatted_address', 'geometry', 'rating',
                     'website', 'photos'
                 ]
             };
             service.getDetails(request, (placeResult, status) => {
                 showDetails(placeResult, marker, status)
             });
         });
         // Adjust the map bounds to include the location of this marker
         bounds.extend(place.geometry.location);
     });

      /* show all the markers within the visible area. */
     map.fitBounds(bounds);
 }
 // InfoWindow to display details above the marker
 function showDetails(placeResult, marker, status) {
     if (status == google.maps.places.PlacesServiceStatus.OK) {
         let placeInfowindow = new google.maps.InfoWindow();
         let rating = "None";
         if (placeResult.rating) rating = placeResult.rating;
         placeInfowindow.setContent('<div><strong>' + placeResult.name +
             '</strong><br>' + 'Rating: ' + rating + '</div>');
         placeInfowindow.open(marker.map, marker);
         currentInfoWindow.close();
         currentInfoWindow = placeInfowindow;
         showPanel(placeResult);
     }
     else {
         console.log('showDetails failed: ' + status);
     }
 }
 // Displays place details in a sidebar
 function showPanel(placeResult) {
     // If infoPane is already open, close it
     if (infoPane.classList.contains("open")) {
         infoPane.classList.remove("open");
     }
     // Clear the previous details
     while (infoPane.lastChild) {
         infoPane.removeChild(infoPane.lastChild);
     }
     // Add the primary photo, if there is one
     if (placeResult.photos) {
         let firstPhoto = placeResult.photos[0];
         let photo = document.createElement('img');
         photo.classList.add('pics');
         photo.src = firstPhoto.getUrl();
         infoPane.appendChild(photo);
     }
     // Add place details with text formatting
     let name = document.createElement('h1');
     name.classList.add('place');
     name.textContent = placeResult.name;
     infoPane.appendChild(name);
     if (placeResult.rating) {
         let rating = document.createElement('p');
         rating.classList.add('details');
         rating.textContent = `Rating: ${placeResult.rating} ✮`;
         infoPane.appendChild(rating);
     }
     let address = document.createElement('p');
     address.classList.add('details');
     address.textContent = placeResult.formatted_address;
     infoPane.appendChild(address);
     if (placeResult.website) {
         let websitePara = document.createElement('p');
         let websiteLink = document.createElement('a');
         let websiteUrl = document.createTextNode(placeResult.website);
         websiteLink.appendChild(websiteUrl);
         websiteLink.title = placeResult.website;
         websiteLink.href = placeResult.website;
         websitePara.appendChild(websiteLink);
         infoPane.appendChild(websitePara);
     }
     // Open the infoPane
     infoPane.classList.add("open");
 }