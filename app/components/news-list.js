import Ember from 'ember';

export default Ember.Component.extend({
	currentPost: {},
	actions:{
		chosePost(chosenPost) {
			//Ember.set("currentPost",chosenPost)
			Ember.set(this.currentPost, chosenPost, true);	
			//this.currentPost = chosenPost;
		}
	}
});
