
$(document).ready(function () {
  /***************Table************************** */


  $.getJSON("./files/data.json", function (data) {

    $.each(data, function (index, item) {
      var tableRow = document.createElement('tr');
      var tableDataName = document.createElement('td');
      var tableDataIndex = document.createElement("td");
      var tableDataDesc = document.createElement('td');
      var tableDataLink = document.createElement('td');
      var tableDataDistance = document.createElement('td');
      var locationButton = document.createElement('button');

      tableRow.appendChild(tableDataName);
      tableRow.appendChild(tableDataIndex);
      tableRow.appendChild(tableDataDesc);
      tableRow.appendChild(tableDataLink);
      tableDataLink.appendChild(locationButton);
      tableRow.appendChild(tableDataDistance);

      tableRow.style = "border: solid; border-color: grey; text-align: center; vertical-align: middle; border-radius: 8px; line-height: 1em;"

      tableDataIndex.innerText = index + 1;
      tableDataIndex.className = "index";
      tableDataIndex.style = "border: solid; border-color: grey; text-align: center; vertical-align: middle;"
      tableDataDistance.id = "distance" + (index + 1);
      tableDataDistance.className = "distance";

      tableDataName.innerText = item.name;
      tableDataName.className = "name";

      var desc = tableDataDesc.innerText = item.description;
      desc = desc + "";
      tableDataDesc.className = "description";

      
      locationButton.innerText = 'Go to location in Maps';
      var locDesc = locationButton.name = item.name;
      locationButton.className = 'btn btn-primary btn-block goToMaps';
      locationButton.type = "button";
      locationButton.id = "back2top";

      locDesc = "<font size=3><b>" + locDesc + "</b></font>";
      locDesc = locDesc + "<p>" + desc + "</p>";

      tableDataLink.style = "border: solid; border-color: grey; text-align: center; vertical-align: middle;"
      var latlngStr = item.location;
      var specLoc = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
      locationButton.value = latlngStr;
      
      locationButton.onclick = function(){
        var infoWindow = new google.maps.InfoWindow();
        var goTo = new google.maps.LatLng(specLoc);
        map.panTo(goTo);
        map.setZoom(14);
        var marker = new google.maps.Marker({
          position: specLoc,
          map: map,
        }).addListener("click", function bounce1() {
          infoWindow.setContent(locDesc);
          infoWindow.setPosition(specLoc);
          map.setCenter(specLoc);
          infoWindow.open(map);
          marker.setAnimation(google.maps.Animation.BOUNCE);
        })
      }
      $("#table").append(tableRow);
    });
  
    $(document).on("click", ".goToMaps", function(){
      $("html, body").animate({scrollTop: 0},600);
    });

  });

  initMap();
 
  });

  
  var map;
  function initMap() {
    setTimeout(function() {
    /*************************** Markers *************************/
    var sanDiego = {
      zoom: 13,
      center: { lat: 32.7157, lng: -117.1611 }
    };

    map = new google.maps.Map(document.getElementById('map'), sanDiego);


    /*************************** Markers *************************/
    var btnVal = document.getElementsByClassName("btn");
    //console.log(btnVal);
    var listPosition, listPos, listName, listIndex, ListMarker;
    for (var i = 0; i < btnVal.length; i++) {

      listPos = btnVal[i].value
      listLoc = listPos + "";
      listPosition = listLoc.split(",", 2);
      listMarker = { lat: parseFloat(listPosition[0]), lng: parseFloat(listPosition[1]) };

      locIndex = i + 1;
      listIndex = locIndex + "";
      
      listName = btnVal[i].name;
      listName = "<b>" + listName + "<b>";
      
      //console.log(listMarker);
      addMarkerWithTimeout(listMarker, listIndex, listName, 10);
      getDistance(listMarker, locIndex);
    };

    var markers = [];
    var infoWindow = new google.maps.InfoWindow();

    function addMarkerWithTimeout(position, label, name, timeout) {
      console.log("positions: ", )
      window.setTimeout(function () {
        markers.push(new google.maps.Marker({
          position: position,
          label: label,
          map: map,
          title: name,
          animation: google.maps.Animation.DROP
        }).addListener("click", function () {
          infoWindow.setContent(name);
          infoWindow.setPosition(position);
          map.setCenter(position);
          map.setZoom(16);
          infoWindow.open(map);

        }), timeout);
      })
    }
    /*************************** Get Distance************************/
    function getDistance(nextLoc, index) {
      navigator.geolocation.getCurrentPosition(function (position) {
        currentPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        var currentLoc = new google.maps.LatLng(currentPos);
        var locations = new google.maps.LatLng(nextLoc);
        var distance = google.maps.geometry.spherical.computeDistanceBetween(currentLoc, locations);
        //console.log(currentPos, otherLocations);
        distance = distance / 1609.344
        distance = distance.toFixed(2);
        //console.log(distance);
        var dist = document.getElementById("distance" + index).innerText = distance + " mi.";
        sortTable();
      })

    }

    /*************************** Current Pos*************************/
    var currentPos;
    infoWindow = new google.maps.InfoWindow;

    navigator.geolocation.getCurrentPosition(function (position) {
      currentPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var goldStar = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: 'red',
        fillOpacity: 0.8,
        scale: .1,
        strokeColor: 'black',
        strokeWeight: 2
      };

      infoWindow.setPosition(currentPos);
      map.setCenter(currentPos);
      markers.push(new google.maps.Marker({
        position: currentPos,
        map: map,
        icon: goldStar,
      }));
    });
    /*************************** Table Sort *************************/
    function sortTable() {
      var table, rows, switching, i, x, y, shouldSwitch;
      table = document.getElementById("table");
      switching = true;
      while (switching) {

        switching = false;
        rows = table.getElementsByTagName("tr");
        for (i = 1; i < (rows.length - 1); i++) {

          shouldSwitch = false;


          x = rows[i].getElementsByTagName("td")[4];
          y = rows[i + 1].getElementsByTagName("td")[4];

          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
      }
    }
  }, 250);
  } /***** End Of InitFunc *************/





