import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
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
		}
	},
	model() {
		return this.get('store').findAll('channel');
	},
	getNewsList(rssUrl) {
		var FEED_URL = rssUrl;
		return new Ember.RSVP.Promise(function (resolve, reject) {
			Ember.$.ajax({
			  type: 'GET',
			  dataType : 'json',
			  url:  document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(FEED_URL),
			  success: function (data) {
			    resolve(data);
			  },
			  error: function (request, textStatus, error) {
			    reject(error);
			  }
			});
		});
	}
});