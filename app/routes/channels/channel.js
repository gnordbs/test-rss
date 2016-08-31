import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		selectPost(post) {
			console.log(this.controller.get('selectedPost'));
			this.controller.set('selectedPost', post);
		}
	},
	model(params) {
		var self = this;
		/*
		return new Ember.RSVP.Promise(function (resolve, reject) {

			 self.get('store').findRecord('channel', params.channel_id).then((resp) => {
			 	console.log(resp.get('name'));
				 self.getNewsList(resp.get('name'))
					.then((value) => { 
						console.log(value);
						resolve(value);
					});	
					},
					function(err){
						console.log(err);
						 reject(error);
					});
		});	 */

		return this.getNewsForChannel(params.channel_id);
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
	getNewsForChannel(channel_id) {
		var self = this;
		return new Ember.RSVP.Promise(function (resolve, reject) {

			 self.get('store').findRecord('channel', channel_id).then((resp) => {
				
			 	var FEED_URL = resp.get('url');
			 	$.ajax({
				  type: 'GET',
				  dataType : 'json',
				  url:  document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(FEED_URL),
				  success: function (data) {
				    resolve(data.responseData.feed.entries);
				  },
				  error: function (request, textStatus, error) {
				    reject(error);
				  }
				});
			});
		});	
	}
});





/*

import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		var data = [];
		  this.get('store').findRecord('channel', params.channel_id).then((resp) => {
			 this.getNewsList(resp.get('name'))
				.then((value) => { 
					//this.NewsList = value;
					console.log(value);
					data = value;
					console.log(data);
				});	
		},
		function(err){
			console.log(err);
		});
		
		//return data;

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


*/