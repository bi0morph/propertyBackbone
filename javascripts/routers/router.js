var Workspace = Backbone.Router.extend({
	
	routes: {
		'location/:latitude/:longitude': 'searchPropertyByLocation',
		'query/:query': 'searchProperty',
		'*default': 'showSearchForm',
	},

	showSearchForm: function() {
		app.searchFormModel.setRecentSearches();
		app.appView.trigger('currentView', 'SearchForm');
	},
	searchProperty: function(query) {
		var queryValue = decodeURI(query);
		
		app.searchService = new app.SearchService({locationName: queryValue});
		app.searchFormModel.updateQuery(queryValue);

		app.searchService.nextPage(this.searchSuccess, this.searchError);
	},
	searchPropertyByLocation: function(latitude, longitude) {
		var searchService = new app.SearchService({
			latitude: decodeURI(latitude),
			longitude: decodeURI(longitude)
		});
		app.searchService.nextPage(this.searchSuccess, this.searchError);
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
				
				app.listRecentSearches.addSearch(result.request.location, result.response.total_results);

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
			app.appView.trigger('currentVie', 'SearchForm');
		};
	},
	searchError: function(jqXHR, textError, errorType) {
		app.searchFormModel.setError('An error occurred while searching. Please check your network connection and try again.');
	}
});
