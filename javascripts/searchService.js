var app = app || {};

app.SearchService = function SearchService (option) {
	var searchService = {
		page: 0,
		nextPage: null
	};
	if (option.locationName) {
		searchService.queryValue = option.locationName;
		searchService.nextPage = function(searchSuccess, searchError) {
			app.NestoriaApi.findProperty(this.queryValue, ++this.page, searchSuccess, searchError);
		};
	} else if (option.latitude && option.longitude) {
		searchService.latitude = option.latitude;
		searchService.longitude = option.longitude;
		searchService.nextPage = function(searchSuccess, searchError) {
			app.NestoriaApi.findPropertyByLocation(this.latitude, this.longitude, ++this.page, searchSuccess, searchError);	
		};
	};
	return searchService;
};