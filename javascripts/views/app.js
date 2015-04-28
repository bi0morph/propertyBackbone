var app = new (Backbone.View.extend({
	
	Views: {},
	Models: {},
	Collections: {},
	
	router: null,
	currentView: null,

	listRecentSearches: null,
	listFavotites: null,
	searchFormModel: null,
	propertiesListModel: null,

	templates: {
		searchForm: _.template( $('#search-form-template').html() ),
		propertiesList: _.template( $('#properties-list-template').html() ),
		propertyDetail: _.template( $('#property-detail-template').html() )
	},
	
	initialize: function() {
		this.on('currentView', this.updateCurrentView);
	},
	start: function() {

		this.listRecentSearches = new this.Collections.ListRecentSearches();
		this.listFavotites = new this.Collections.ListFavotites;
		this.searchFormModel = new this.Models.SearchForm();
		this.propertiesListModel = new this.Models.PropertiesList();

		this.router = new Workspace();
		Backbone.history.start();
	},
	createCurrentView: function(viewName) {
		switch (viewName) {
			case 'SearchForm':
				this.currentView = new this.Views.SearchForm({
					el: this.el,
					model: this.searchFormModel
				});
			break;
			case 'PropertiesList': 
				this.currentView = new this.Views.PropertiesList({
					el: this.el,
					model: this.propertiesListModel
				});
			break;
			case 'PropertyDetail': 
				this.currentView = new this.Views.PropertyDetail({
					el: this.el,
					model: this.propertyDetail
				});
			break;
		}
	},
	updateCurrentView: function(viewName) {
		if (this.currentView) {
			this.currentView.close();
		};
		this.createCurrentView(viewName);
		
		this.currentView.render();
	}
}))({el: '#search-app'});