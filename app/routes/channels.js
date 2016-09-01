import Ember from 'ember';

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
		addChannel(){
			var newUrl = this.controller.get('newChannelUrl');
			var newName = this.controller.get('newChannelName');

			if(newUrl && newName) {
				this.getNewsList(newUrl).then(
				(resp) => {
					if(!resp.responseData) {
						alert(resp.responseDetails);
					} else {
						var newChannel = this.store.createRecord('channel', {url:newUrl, name: newName});
						newChannel.save();

						this.controller.set('newChannelUrl', "");
						this.controller.set('newChannelName', "");
					}
				}, 
				(error) => {
					alert(error);
				}); 
			}

/*

			var newChannel = this.store.createRecord('channel', {url:newUrl, name: newName});
			newChannel.save();

			var newUrl = this.controller.set('newChannelUrl', "");
			var newName = this.controller.get('newChannelName', "");*/
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
			    resolve(data);
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
				  url:  document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=200&callback=?&q=' + encodeURIComponent(FEED_URL),
				  success: function (data) {
				  	//
				  	data.responseData.feed.channel_id = channel_id;
				    resolve(data.responseData.feed);
				  },
				  error: function (request, textStatus, error) {
				    reject(error);
				  }
				});
			});
		});	
	},
});