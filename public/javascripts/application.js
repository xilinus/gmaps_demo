Application = new Class.create({
  initialize: function(map, users) {
    this.element = $(map);
    this.users   = users.evalJSON();
    document.observe("dom:loaded", this.init.bind(this));
  },
  
  init: function() {
    if (GBrowserIsCompatible()) {
      // Create a google map
      this.map = new GMap2(this.element);
      
      // Center on France
      this.map.setCenter(new GLatLng(46.227638, 2.213749), 6);
      
      // Add controls
      this.map.addControl(new GLargeMapControl());
      this.map.addControl(new GMapTypeControl());
      
      // Add Markers
      if (this.users) {
        this.users.each(function(user) {
          var marker = new GMarker(new GLatLng(user.lat, user.lng));
          
          GEvent.addListener(marker, "click", function() {
            marker.openInfoWindowHtml(user.login);
          });
          
          this.map.addOverlay(marker);
        }.bind(this))
      }
    }
  }
});

