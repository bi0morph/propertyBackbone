app.views.SearchForm = Backbone.View.extend({
	template: app.templates.searchForm,
	initialize: function() {
		this.listenTo(this.model, 'change:errorMessage', this.render);
		this.listenTo(this.model, 'change:locations', this.render);
	},
	events: {
		'click #faves': 'showFaves',
		'click #go': 'changeQuery',
		'keypress #query': 'changeQueryOnEnter',
		'click #my-location': 'getCurrentPosition',
	},
	render: function() {
		console.log(this.model.attributes);
		this.$el.html( this.template( this.model.attributes ) );
		this.$input = this.$('#query');
		this.$input.focus();
		return this;
	},
	close: function() {
	    this.stopListening();
	},
	showFaves: function() {
		console.log('showFaves');
	},
	changeQuery: function() {
		var query = this.$input.val().trim();
		
		if (query) {
			this.model.set('searchQuery', query);
			app.PropertySearchRouter.navigate('#/query/' + encodeURI(query), {trigger: true});
		}
	},
	changeQueryOnEnter: function(e) {
		if ( e.which == ENTER_KEY ) {
			this.changeQuery();
		};
	},
	getCurrentPosition: function() {
		var that = this;
    	function onSuccess(argument) {
    		//that.changeLocation(argument.coords);
    		that.changeLocationTest(argument.coords);
    	}
    	function onError() {
    		that.model.setError("Unable to detect current location. Please ensure location is turned on in your phone settings and try again.");
    	}

		if (navigator.geolocation) {
        	navigator.geolocation.getCurrentPosition(onSuccess, onError);
	    } else {
	    	this.model.setError("The use of location is currently disabled.");	
	    }
	},
	changeLocation: function(coords) {
		this.model.set({
			latitude: coords.latitude,
			longitude: coords.longitude,
		});
		var url = '#/location/';
		url += encodeURI(coords.latitude) +'/';
		url += encodeURI(coords.longitude);
		app.PropertySearchRouter.navigate(url, {trigger: true});
	},
	changeLocationTest: function() {
		this.changeLocation({
			latitude: 51.449486,
			longitude: 0.013363
		});
	}
});