app.Views.PropertiesList = Backbone.View.extend({
	template: app.templates.propertiesList,
	events: {
		'click #load-more': 'loadMoreProperties'
	},
	render: function() {
		var variables = this.model.attributes;
		this.$el.html( this.template( variables ) );
		
		this.renderProperties( variables.properties );
		
		this.$loadMore = this.$('#load-more');
		return this;
	},
	renderProperties: function(properties) {
		var htmlFragment = document.createDocumentFragment(),
			that = this;

		_.each( properties, function(property, index) {
			var itemView = new app.Views.PropertyItem({
				model: that.createItemModel(property),
				index: index
			});
			itemView.render().$el.appendTo(htmlFragment);
		});	

		this.$el.find('.list').append(htmlFragment);
	},
	createItemModel: function(propertyObj){
		return new app.Models.PropertyDetail({
			price: propertyObj.price_formatted,
			title: propertyObj.title,
			image: {
				src: propertyObj.thumb_url,
				width: propertyObj.thumb_width,
				height: propertyObj.thumb_height
			},
			bedrooms: propertyObj.bedroom_number,
			bathrooms: propertyObj.bathroom_number,
			summary: propertyObj.summary,
			isFavorite: false,
			guid: propertyObj.guid
		});
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

		if (result.response.listings
			&& result.response.listings.length 
			&& (responseCode === "100" || responseCode === "101"
			|| responseCode === "110")) {

			var propertiesListObj = app.propertiesListModel.attributes;

			propertiesListObj.page = result.response.page;
				
			_.each(result.response.listings, function(property){
				propertiesListObj.properties.push(property);
			});
			
			app.propertiesListModel.set(propertiesListObj);
			
			this.renderProperties(result.response.listings);

			if(propertiesListObj.total_results === propertiesListObj.properties.length) {
				this.$el.find('section').addClass('hidden');
			}
		}
		this.toggleLoading();
	},
	loadError: function() {
		console.log('An error occurred while searching. Please check your network connection and try again.');
		this.toggleLoading();
		// app.searchFormModel.setError('An error occurred while searching. Please check your network connection and try again.');
	},
});