Application = new Class.create({
  initialize: function(markers) {
    this.markers = markers.evalJSON();
    document.observe("dom:loaded", this.init.bind(this));
  },
  
  init: function() {
    if (GBrowserIsCompatible()) {
      // Create a google map
      this.map = new GMap2($("map"));
      // Center on France
      this.map.setCenter(new GLatLng(46.227638, 2.213749), 6);
      
      if (this.markers) {
        this.markers.each(function(marker) {
          this.map.addOverlay(new GMarker(new GLatLng(marker.lat, marker.lng)));
        }.bind(this))
      }
    }
  }
});

