import Ember from 'ember';
/*
export default Ember.Route.extend({
	model() {
		var FEED_URL = "https://habrahabr.ru/rss/hub/programming/";

		return	$.ajax({
		  url      : document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(FEED_URL),
		  dataType : 'json',
		  success  : function (data) {
			if (data.responseData.feed && data.responseData.feed.entries) {
			  $.each(data.responseData.feed.entries, function (i, e) {
				console.log("------------------------");
				console.log("title      : " + e.title);
				console.log("author     : " + e.author);
				console.log("description: " + e.description);
			  });
			}
		  }
		});
	}
});*/


var channels = [
	{url:"https://habrahabr.ru/rss/hub/programming/", name: "habr"},
	{url:"https://lenta.ru/rss/news ", name: "lenta"}
	
];

/*
export default Ember.Route.extend({
	actions: {
		selectChannel(){

		}
	},
	model() {
		return channels;
	},

});*/


export default Ember.Route.extend({
	actions: {
		selectChannel(channel) {
			console.log("sss");
			this.getNewsList(channel.url)
				.then((value) => { 
					//this.NewsList = value;
					this.controller.set('NewsList', value);	

				}, function(reason) {
					// on rejection
				});
		},
		testFunc(){
			this.store.createRecord('channel', {url:"https://habrahabr.ru/rss/hub/programming/", name: "habr"});
		},
		
		addChannel(){
			var newUrl = this.controller.get('newChannelUrl');
			var newName = this.controller.get('newChannelName');
			var newChannel = this.store.createRecord('channel', {url:newUrl, name: newName});

			newChannel.save();

		}
	},
	model() {
		return this.get('store').findAll('channel');
	},
	getNewsList(rssUrl) {
		var result = [];
		var FEED_URL = rssUrl;
		return new Ember.RSVP.Promise(function (resolve, reject) {
		$.ajax({
		  type: 'GET',
		  dataType : 'json',
		  url:  document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(FEED_URL),
		  success: function (data) {
		  	console.log(data);
		    resolve(data.responseData.feed.entries);
		  },
		  error: function (request, textStatus, error) {
		    console.log(error);
		    reject(error);
		  }
		});
		});
	},
});