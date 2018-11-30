// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
//   <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC8NiCJndcIn85_FDZyrsNSCwKpXYEddCY &libraries=places">

// API Call to the Json file and grabs all data and will then filter through and grab only cinemas

$( document ).ready(function() {
  console.log( "ready!" );

});

API_CIN = 'https://api.internationalshowtimes.com/v4/cinemas/?apikey=mlukUiYuqOlANdaKFUOx9awxarYqAtfZ';
var lat, lng;
// Create an AJAX call to retrieve data Log the data in console
$.ajax({ url: API_CIN, method: "GET" })
  .then(function (response) {
    console.log("cinemas: " + response);
    for (var i = 0; i < response.cinemas.length; i++) {
      //search through the file and grab any location that is a cinema
      if (response.cinemas[i].location.address.city === "Seattle") {

        // get longitude and latitude from the json file
        lat = response.cinemas[i].location.lat;
        lng = response.cinemas[i].location.lon;
        // append each theatre to the list
        $("#placesArea").append('<li><a href="#" onclick="NewMap(' + lat + ',' + lng + ');return false;">' + response.cinemas[i].name + '</a></li>');
      }

    }


  });

function initMap() {

  var Location1 = $("#pac-input").val();
  console.log(Location1);
  // The location of Seattle on the map
  var Seattle = { lng: -122.3321, lat: 47.6062 };
  // The map, centered at Uluru
  var map = new google.maps.Map(
    document.getElementById('map'), { zoom: 12, center: Seattle });
  // The marker, positioned at Uluru

}

// creates new map when theatre is clicked
function NewMap(lat, lng) {
  // The location of Theatre
  var TheatreLocation = { lng: lng, lat: lat };
  // The map, centered at the Theatre
  var map = new google.maps.Map(
    document.getElementById('map'), { zoom: 15, center: TheatreLocation });
  // The marker, positioned at the Theatre
  var marker = new google.maps.Marker({ position: TheatreLocation, map: map });

//clear out dining div
$("#diningArea").empty();

  var queryURL = 'https://api.foursquare.com/v2/venues/explore?ll='+ lat + ',' + lng +'&client_id=FVJAEV5FM0DQNJ53YDGKFMX2NNLPSLJBU125EUQG2UQPKUMA&v=20181127&client_secret=AKL35YSPSETLZTA3IW1IVQF4ASMPN0PYOPWQXF2JZIDP3KH2&limit=10';
  $.ajax({
    url: queryURL,
    method: "GET",
  })
    .then(function (response) {
      var results = response.response.groups[0].items;

      for (var i = 0; i < results.length; i++) {
        var newPlace = $("<div class='p-2 bd-highlight'>");
        var nameOfPlace = results[i].venue.name;

        var p = $("<p>").text(nameOfPlace);
        var typeOfPlace = results[i].venue.categories[0].name;

        var t = $("<p>").text(typeOfPlace);
        var address = results[i].venue.location.formattedAddress;

        var a = $("<p>").text(address);
        newPlace.append(p);
        newPlace.append(t);
        newPlace.append(a);
        $("#diningArea").append(newPlace);

      }
    });
  }
  