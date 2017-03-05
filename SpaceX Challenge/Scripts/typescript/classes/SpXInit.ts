///<reference path="../../typings/jquery/jquery.d.ts" />
///<reference path="../../typings/googlemaps/index.d.ts" />

class SpXInit {
    public objMap: SpXMap;

    public initMap(mapElement: Element) {
        let map = new SpXMap(mapElement).objMap;
    }
}