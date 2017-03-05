var SpXInfoWindow = (function () {
    function SpXInfoWindow(iwOptions) {
        this.objInfoWindow = new google.maps.InfoWindow(iwOptions);
    }
    return SpXInfoWindow;
}());
var SpXInit = (function () {
    function SpXInit() {
    }
    SpXInit.prototype.initMap = function (mapElement) {
        var map = new SpXMap(mapElement).objMap;
    };
    return SpXInit;
}());
var SpXMap = (function () {
    function SpXMap(mapElement) {
        var _this = this;
        this.objMap = new google.maps.Map(mapElement, {
            center: new google.maps.LatLng(51.509865, -0.118092),
            zoom: 3
        });
        this.getGroundstations(function (data) {
            var groundStations = data['GroundStation'][1];
            $.each(groundStations, function (key, gs) {
                var marker = new SpXMarker({
                    map: _this.objMap,
                    position: new google.maps.LatLng(gs.Location.Latitude, gs.Location.Longitude)
                });
                var infoWindow = new SpXInfoWindow({
                    content: gs.Name
                });
                marker.objMarker.addListener('click', function () {
                    infoWindow.objInfoWindow.open(_this.objMap, marker.objMarker);
                });
            });
        });
    }
    SpXMap.prototype.getGroundstations = function (callback) {
        var url = "http://sscweb.gsfc.nasa.gov/WS/sscr/2/groundStations";
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: callback,
            error: function (err) {
                console.log(err);
            }
        });
    };
    return SpXMap;
}());
var SpXMarker = (function () {
    function SpXMarker(markerOptions) {
        this.objMarker = new google.maps.Marker(markerOptions);
    }
    return SpXMarker;
}());
