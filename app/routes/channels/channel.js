import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		selectPost(post) {
			this.controller.set('selectedPost', post);
		},
		removeChannel(channel_id){
			var channelToDelete = this.store.peekRecord('channel', channel_id);
			channelToDelete.destroyRecord().then(
				() => {
					this.transitionTo('channels');
				}, 
				function(error){
					alert(error);
			}); 
		}
	},
	model(params) {
		return this.getNewsForChannel(params.channel_id);
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

