import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
	host: 'http://localhost:1337',
});
/*

export default DS.JSONAPIAdapter .extend(DataAdapterMixin,{	
	namespace: 'api',
	//host: 'http://localhost:4500',
	host: 'http://54.187.251.191:1337',
	authorizer: 'authorizer:application'
});*/