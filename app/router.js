import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('channels', function() {
    this.route('channel',{ path: '/:channel_id' });
  });
});

export default Router;
