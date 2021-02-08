var map = L.map('map').setView([37.76,-122.45], 12)

L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map);


$.getJSON("https://raw.githubusercontent.com/gbrunner/adv-python-for-gis-and-rs/master/Week%201/sf_crime.geojson",function(data){
  var robberIcon = L.icon({
      iconUrl: 'thief.png',
      iconSize: [60,50]
    });
    var robbers = L.geoJson(data,{
      pointToLayer: function(feature,latlng){
        var marker = L.marker(latlng,{icon: robberIcon});
        marker.bindPopup(feature.properties.Location + '<br/>' + feature.properties.OPEN_DT);
        return marker;
      }
    });
    var clusters = L.markerClusterGroup({
	    iconCreateFunction: function (cluster) {
		 var childCount = cluster.getChildCount();
		 var c = ' marker-cluster-';
		 if (childCount < 50) {
		   c += 'small';
		 } 
		 else if (childCount < 500) {
		   c += 'medium';
		 } 
		 else {
		   c += 'large';
		 }

		 return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', 
		  className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
	}
    });
    clusters.addLayer(robbers);
    map.addLayer(clusters);
});

