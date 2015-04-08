var Workspace = Backbone.Router.extend({
	
	routes: {
		'location/:latitude/:longitude': 'searchPropertyByLocation',
		'query/:query': 'searchProperty',
		'query/:query/:page': 'searchProperty',
		'*default': 'showSearchForm',
	},

	showSearchForm: function() {
		app.searchFormModel.setRecentSearches();
		app.appView.trigger('currentView', 'SearchForm');
	},
	searchProperty: function(query, page) {
		var queryValue = decodeURI(query),
			page_number = page || 1;
		app.searchFormModel.updateQuery(queryValue);
		
		app.NestoriaApi.findProperty(queryValue, page_number, this.searchSuccess, this.searchError);
	},
	searchPropertyByLocation: function(latitude, longitude, page) {
		var page_number = page || 1;

		app.NestoriaApi.findPropertyByLocation(decodeURI(latitude), decodeURI(longitude), page_number, this.searchSuccess, this.searchError);	
	},
	searchSuccess: function(result) {
		console.log(result.response);
		console.log(result.request);
		var responseCode = result.response.application_response_code;
		
		if (responseCode === "100" || responseCode === "101"
			|| responseCode === "110") {

			if (result.response.listings.length) {
				app.propertiesListModel.set({
					page: result.response.page,
					properties: result.response.listings,
					total_results: result.response.total_results
				});
				app.appView.trigger('currentView', 'PropertiesList');
			}else{
				app.searchFormModel.setError('There were no properties found for the given location.');
			};
		} else if (responseCode === "200" || responseCode === "202") {
			app.searchFormModel.setLocations(result.response.locations);
		} else {
			app.searchFormModel.setError('The location given was not recognised.');
		}

		if (!app.currentView) {
			app.appView.trigger('currentView:SearchForm');
		};
	},
	searchError: function(jqXHR, textError, errorType) {
		app.searchFormModel.setError('An error occurred while searching. Please check your network connection and try again.');
	}
});
