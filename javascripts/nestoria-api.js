var app = app || {};

/* global $, app*/
app.NestoriaApi = (function () {
	// http://www.nestoria.co.uk/help/api-search-listings
	var api = {};
	var data = {
		country: 'uk',
		pretty: 1,
		action: 'search_listings',
		encoding: 'json',
		listing_type: 'buy',
		page: 1,
		number_of_results: 6
	};
	function $jsonp(data, successCallback, errorCallback) {
		$.ajax({
		    url: 'http://api.nestoria.co.uk/api',
		    data: data,
		    method: 'GET',
		    timeout: 5000,
		    dataType: "jsonp",
		    success: successCallback,
		    error: errorCallback
		});
	}
	function makeData(params) {
		
		if ( params.place_name ) {
			data.place_name = params.place_name;
		} else {
			
		}
		return data;
	}
	api.findProperty = function(place_name, page, successCallback, errorCallback) {
		var params = data;
		params.place_name = place_name;
		params.page = page || params.page;
		$jsonp(params, successCallback, errorCallback);
	};
 
	api.findPropertyByLocation = function(latitude, longitude, page, successCallback, errorCallback) {
		var params = data;
		params.centre_point = latitude + ',' + longitude;
		params.page = page || params.page;
		$jsonp(params, successCallback, errorCallback);
	};
	return api;
})();