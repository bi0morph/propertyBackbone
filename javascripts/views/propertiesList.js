app.Views.PropertiesList = Backbone.View.extend({
	template: app.templates.propertiesList,
	events: {
		'click #load-more': 'loadMoreProperties'
	},
	render: function() {
		this.$el.html( this.template( this.model.attributes ) );
		this.$loadMore = this.$('#load-more');
		return this;
	},
	toggleLoading: (function() {
		var isLoading = false,
			toggleLoading = function toggleLoading() { 
				if ( isLoading ) {
					this.$loadMore.removeClass('loading').text('Load more');
				} else {
					this.$loadMore.addClass('loading').text('Loading...');
				}
				isLoading = !isLoading;
			};
		return toggleLoading; 
	} )(),
	close: function() {
	    this.stopListening();
	},
	loadMoreProperties: function() {
		this.toggleLoading();
		var success = _.bind(this.loadSuccess, this),
			error = _.bind(this.loadError, this);
		app.searchService.nextPage(success, error);

	},
	loadSuccess: function(result) {
		var responseCode = result.response.application_response_code;

		if (result.response.listings.length 
			&& (responseCode === "100" || responseCode === "101"
			|| responseCode === "110")) {

			/*app.propertiesListModel.set({
					page: result.response.page,
					properties: result.response.listings,
					total_results: result.response.total_results
				});*/
			console.log( result.response.listings );
		}
		this.toggleLoading();
	},
	loadError: function() {
		console.log('An error occurred while searching. Please check your network connection and try again.');
		this.toggleLoading();
		// app.searchFormModel.setError('An error occurred while searching. Please check your network connection and try again.');
	},
});