import Ember from 'ember';

export default Ember.Controller.extend({
	selectedPost: [],
	channelId: null,
	selectedPostStats: Ember.computed('selectedPost', function() {
		var str = Ember.$('#detail_post').text();
		if(str){
			var frequences = this.countInString(str.toLowerCase(), {}, 0);
			return this.getLettersRelativeRate(frequences);
		} else {
			return [];
		}
	}),
	pieOptions : {
  	  animation : false,  
	},
	statsNumOfPosts:  Ember.computed('model', function() {
		var post = this.get('model');
		if(post.entries){
			return post.entries.length;
		} else {
			return 0;
		} 
		
	}),
	statsNumOfAuthors:Ember.computed('model', function() {
		var post = this.get('model');
		if(post.entries){
			var authors = [];
			post.entries.forEach(function(item){
				authors.push(item.author);
			});

			var getUnique = function(inputArray) {
			    var outputArray = [];
			    
			    for (var i = 0; i < inputArray.length; i++)
			    {
			        if ((Ember.$.inArray(inputArray[i], outputArray)) === -1)
			        {
			            outputArray.push(inputArray[i]);
			        }
			    }
			   
			    return outputArray;
			};

			return getUnique(authors).length;
		} else {
			return 0;
		} 
		
	}),
	countInString(str, out, i){ 
		if(i >= str.length){
			return out;
		}
		if(!out[str.charAt(i)]){
			out[str.charAt(i)] = 1;
		}
		else{
			out[str.charAt(i)] += 1;
		}
		return this.countInString(str, out, i+1);
	},
	getLettersRelativeRate(freq){ 
		var dataArray = [];
		var totalAmmount = 0;
		Ember.$.each(freq, function(index, value) {
			if(/[a-z]+/.test(index)){
				dataArray.push({
					value: value,
					label: index,
					color:"#F7464A",
					highlight: "#FF5A5E",
				});
			} else {
				totalAmmount+= value;
			}
		}); 
		var sortedArray = dataArray.sort(function(a, b) {
			  return b.value - a.value;
			});
		if(totalAmmount){
			dataArray.push({
						value: totalAmmount,
						label: "other symbols",
						color: "#46BFBD",
						highlight: "#5AD3D1",
					});
		}
		
		return sortedArray;
	}

});
