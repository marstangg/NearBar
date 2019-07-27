{"changed":true,"filter":false,"title":"app.js","tooltip":"/OnePage/scripts/app.js","value":" let pos;\n let map;\n let bounds;\n let infoWindow;\n let currentInfoWindow;\n let service;\n let infoPane;\n \n     // Initialize map\n     function initMap() {\n     bounds = new google.maps.LatLngBounds();\n     infoWindow = new google.maps.InfoWindow;\n     currentInfoWindow = infoWindow;\n     infoPane = document.getElementById('panel');\n     \n    // Try HTML5 geolocation\n     if (navigator.geolocation) {\n         navigator.geolocation.getCurrentPosition(position => {\n             pos = {\n                 lat: position.coords.latitude,\n                 lng: position.coords.longitude\n             };\n             map = new google.maps.Map(document.getElementById('map'), {\n                 center: pos,\n                 zoom: 15\n             });\n             \n             bounds.extend(pos);\n             infoWindow.setPosition(pos);\n             infoWindow.setContent('You are Here!');\n             infoWindow.open(map);\n             map.setCenter(pos);\n             // Call Places Nearby Search on user's location\n             getNearbyPlaces(pos);\n         }, () => {\n             // Browser supports geolocation, but user has denied permission\n             handleLocationError(true, infoWindow);\n         });\n     }\n     else {\n         // Browser doesn't support geolocation\n         handleLocationError(false, infoWindow);\n     }\n }\n // Handle a geolocation error\n function handleLocationError(browserHasGeolocation, infoWindow) {\n     // Set default location to singapore\n     pos = { lat: 1.35, lng: 103.891 };\n     map = new google.maps.Map(document.getElementById('map'), {\n         center: pos,\n         zoom: 13\n     });\n     // Display an InfoWindow at the map center\n     infoWindow.setPosition(pos);\n     infoWindow.setContent(browserHasGeolocation ?\n         'Geolocation permissions denied. Using default location.' :\n         'Error: Your browser doesn\\'t support geolocation.');\n     infoWindow.open(map);\n     currentInfoWindow = infoWindow;\n// Call Places Nearby Search on the default location\n     getNearbyPlaces(pos);\n }\n // Perform a Places Nearby Search Request\n function getNearbyPlaces(position) {\n     let request = {\n         location: position,\n         rankBy: google.maps.places.RankBy.DISTANCE,\n         keyword: 'bar'\n     };\n     service = new google.maps.places.PlacesService(map);\n     service.nearbySearch(request, nearbyCallback);\n }\n // Handle the results of the Nearby Search\n function nearbyCallback(results, status) {\n     if (status == google.maps.places.PlacesServiceStatus.OK) {\n         createMarkers(results);\n     }\n }\n \n // Set markers at the location of each place result\n function createMarkers(places) {\n     places.forEach(place => {\n         let marker = new google.maps.Marker({\n             position: place.geometry.location,\n             map: map,\n             title: place.name,\n             icon: 'images/pub-icon.png'\n         });\n   \n // Only fetch the details of a place when the user clicks on a marker*/\n         google.maps.event.addListener(marker, 'click', () => {\n             let request = {\n                 placeId: place.place_id,\n                 fields: ['name', 'formatted_address', 'geometry', 'rating',\n                     'website', 'photos'\n                 ]\n             };\n             service.getDetails(request, (placeResult, status) => {\n                 showDetails(placeResult, marker, status)\n             });\n         });\n         // Adjust the map bounds to include the location of this marker\n         bounds.extend(place.geometry.location);\n     });\n    \n      /* show all the markers within the visible area. */\n     map.fitBounds(bounds);\n }\n // InfoWindow to display details above the marker\n function showDetails(placeResult, marker, status) {\n     if (status == google.maps.places.PlacesServiceStatus.OK) {\n         let placeInfowindow = new google.maps.InfoWindow();\n         let rating = \"None\";\n         if (placeResult.rating) rating = placeResult.rating;\n         placeInfowindow.setContent('<div><strong>' + placeResult.name +\n             '</strong><br>' + 'Rating: ' + rating + '</div>');\n         placeInfowindow.open(marker.map, marker);\n         currentInfoWindow.close();\n         currentInfoWindow = placeInfowindow;\n         showPanel(placeResult);\n     }\n     else {\n         console.log('showDetails failed: ' + status);\n     }\n }\n // Displays place details in a sidebar\n function showPanel(placeResult) {\n     // If infoPane is already open, close it\n     if (infoPane.classList.contains(\"open\")) {\n         infoPane.classList.remove(\"open\");\n     }\n     // Clear the previous details\n     while (infoPane.lastChild) {\n         infoPane.removeChild(infoPane.lastChild);\n     }\n     // Add the primary photo, if there is one\n     if (placeResult.photos) {\n         let firstPhoto = placeResult.photos[0];\n         let photo = document.createElement('img');\n         photo.classList.add('pics');\n         photo.src = firstPhoto.getUrl();\n         infoPane.appendChild(photo);\n     }\n     // Add place details with text formatting\n     let name = document.createElement('h1');\n     name.classList.add('place');\n     name.textContent = placeResult.name;\n     infoPane.appendChild(name);\n     if (placeResult.rating) {\n         let rating = document.createElement('p');\n         rating.classList.add('details');\n         rating.textContent = `Rating: ${placeResult.rating} ✮`;\n         infoPane.appendChild(rating);\n     }\n     let address = document.createElement('p');\n     address.classList.add('details');\n     address.textContent = placeResult.formatted_address;\n     infoPane.appendChild(address);\n     if (placeResult.website) {\n         let websitePara = document.createElement('p');\n         let websiteLink = document.createElement('a');\n         let websiteUrl = document.createTextNode(placeResult.website);\n         websiteLink.appendChild(websiteUrl);\n         websiteLink.title = placeResult.website;\n         websiteLink.href = placeResult.website;\n         websitePara.appendChild(websiteLink);\n         infoPane.appendChild(websitePara);\n     }\n     // Open the infoPane\n     infoPane.classList.add(\"open\");\n }","undoManager":{"mark":-2,"position":4,"stack":[[{"start":{"row":88,"column":7},"end":{"row":88,"column":45},"action":"remove","lines":["  // Add click listener to each marker"],"id":34},{"start":{"row":88,"column":6},"end":{"row":88,"column":7},"action":"remove","lines":[" "]},{"start":{"row":88,"column":5},"end":{"row":88,"column":6},"action":"remove","lines":[" "]},{"start":{"row":88,"column":4},"end":{"row":88,"column":5},"action":"remove","lines":[" "]},{"start":{"row":88,"column":3},"end":{"row":88,"column":4},"action":"remove","lines":[" "]},{"start":{"row":88,"column":2},"end":{"row":88,"column":3},"action":"remove","lines":[" "]},{"start":{"row":88,"column":1},"end":{"row":88,"column":2},"action":"remove","lines":[" "]}],[{"start":{"row":88,"column":0},"end":{"row":88,"column":1},"action":"remove","lines":[" "],"id":35},{"start":{"row":87,"column":3},"end":{"row":88,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":88,"column":7},"end":{"row":88,"column":8},"action":"remove","lines":[" "],"id":36},{"start":{"row":88,"column":6},"end":{"row":88,"column":7},"action":"remove","lines":[" "]},{"start":{"row":88,"column":5},"end":{"row":88,"column":6},"action":"remove","lines":[" "]},{"start":{"row":88,"column":4},"end":{"row":88,"column":5},"action":"remove","lines":[" "]},{"start":{"row":88,"column":3},"end":{"row":88,"column":4},"action":"remove","lines":[" "]},{"start":{"row":88,"column":2},"end":{"row":88,"column":3},"action":"remove","lines":[" "]},{"start":{"row":88,"column":1},"end":{"row":88,"column":2},"action":"remove","lines":[" "]},{"start":{"row":88,"column":0},"end":{"row":88,"column":1},"action":"remove","lines":[" "]}],[{"start":{"row":13,"column":49},"end":{"row":14,"column":0},"action":"insert","lines":["",""],"id":37},{"start":{"row":14,"column":0},"end":{"row":14,"column":5},"action":"insert","lines":["     "]},{"start":{"row":14,"column":5},"end":{"row":15,"column":0},"action":"insert","lines":["",""]},{"start":{"row":15,"column":0},"end":{"row":15,"column":5},"action":"insert","lines":["     "]}],[{"start":{"row":16,"column":4},"end":{"row":16,"column":5},"action":"remove","lines":[" "],"id":38},{"start":{"row":16,"column":3},"end":{"row":16,"column":4},"action":"remove","lines":[" "]},{"start":{"row":16,"column":2},"end":{"row":16,"column":3},"action":"remove","lines":[" "]},{"start":{"row":16,"column":1},"end":{"row":16,"column":2},"action":"remove","lines":[" "]},{"start":{"row":16,"column":0},"end":{"row":16,"column":1},"action":"remove","lines":[" "]},{"start":{"row":15,"column":5},"end":{"row":16,"column":0},"action":"remove","lines":["",""]},{"start":{"row":15,"column":4},"end":{"row":15,"column":5},"action":"remove","lines":[" "]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":12,"column":36},"end":{"row":12,"column":36},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":143,"state":"no_regex","mode":"ace/mode/javascript"}},"timestamp":1564127170211}