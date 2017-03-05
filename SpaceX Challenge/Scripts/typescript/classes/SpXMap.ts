class SpXMap {
    public objMap: google.maps.Map;

    constructor(mapElement: Element) {
        this.objMap = new google.maps.Map(mapElement, {
            center: new google.maps.LatLng(51.509865, -0.118092),
            zoom: 3
        });

        this.getGroundstations((data) => {
            let groundStations: any = data['GroundStation'][1];

            $.each(groundStations, (key, gs) => {
                let marker = new SpXMarker({
                    map: this.objMap,
                    position: new google.maps.LatLng(gs.Location.Latitude, gs.Location.Longitude)
                });

                let infoWindow = new SpXInfoWindow({
                    content: gs.Name
                });

                marker.objMarker.addListener('click', () => {
                    infoWindow.objInfoWindow.open(this.objMap, marker.objMarker);
                });
            });
        });        
    }

    protected getGroundstations(callback: (data: any) => (any)) {
        let url: string = "http://sscweb.gsfc.nasa.gov/WS/sscr/2/groundStations";

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: callback,
            error: (err) => {
                console.log(err);
            }
        });
    }
}