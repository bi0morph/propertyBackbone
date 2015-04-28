var Workspace = Backbone.Router.extend({
	
	routes: {
		'location/:latitude/:longitude(/)': 'searchPropertyByLocation',
		'properties/:index(/)': 'showPropertyDetail',
		'query/:query(/)': 'searchProperty',
		'*default': 'showSearchForm',
	},
	showPropertyDetail: function(index) {
		var property = app.propertiesListModel.getProperty(index);
		console.log(property);
		app.propertyDetail = new app.Models.PropertyDetail({
			price: property.price_formatted,
			title: property.title,
			image: {
				src: property.img_url,
				width: property.img_width,
				height: property.img_height
			},
			bedrooms: property.bedroom_number,
			bathrooms: property.bathroom_number,
			summary: property.summary,
			guid: property.guid
		});
		app.trigger('currentView', 'PropertyDetail');
	},
	showSearchForm: function() {
		app.searchFormModel.setRecentSearches();
		app.trigger('currentView', 'SearchForm');
	},
	searchProperty: function(query) {
		var queryValue = decodeURIComponent(query);
		
		app.searchService = new app.SearchService({locationName: queryValue});
		app.searchFormModel.updateQuery(queryValue);

		app.searchService.nextPage(this.searchSuccess, this.searchError);
	},
	searchPropertyByLocation: function(latitude, longitude) {
		var searchService = new app.SearchService({
			latitude: decodeURIComponent(latitude),
			longitude: decodeURIComponent(longitude)
		});
		app.searchService.nextPage(this.searchSuccess, this.searchError);
	},
	searchSuccess: function(result) {
		console.log('searchSuccess');
		
		console.log(result.request);
		console.log(result.response);

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

				app.trigger('currentView', 'PropertiesList');
			}else{
				app.searchFormModel.setError('There were no properties found for the given location.');
			};
		} else if (responseCode === "200" || responseCode === "202") {
			app.searchFormModel.setLocations(result.response.locations);
		} else {
			app.searchFormModel.setError('The location given was not recognised.');
		}

		if (!app.currentView) {
			app.trigger('currentView', 'SearchForm');
		};
	},
	searchError: function(jqXHR, textError, errorType) {
		app.searchFormModel.setError('An error occurred while searching. Please check your network connection and try again.');
	}
});
