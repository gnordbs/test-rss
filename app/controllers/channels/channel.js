import Ember from 'ember';

export default Ember.Controller.extend({
	selectedPost: [],
	channelId: null,
	selectedPostStats: Ember.computed('selectedPost', function() {
		function count(str, out, i){ 
			if(i >= str.length)
				return out;
			if(!out[str.charAt(i)])
				out[str.charAt(i)] = 1;
			else
				out[str.charAt(i)] += 1;
			return count(str, out, i+1);
		}

		function getRelativeRate(freq){ 
			var dataArray = [];
			var totalAmmount = 0;
			$.each(freq, function(index, value) {
				if(/[a-z]+/.test(index)){
					dataArray.push({
						value: value,
						label: index,
						color:"#F7464A",
						highlight: "#FF5A5E",
					});
					console.log(index, value);
				} else {
					totalAmmount+= value;
				}
			}); 
			dataArray.push({
						value: totalAmmount,
						label: "остальные символы",
						color: "#46BFBD",
						highlight: "#5AD3D1",
					});
			var sortedArray = dataArray.sort(function(a, b) {
				  return b.value - a.value;
				});
			return sortedArray
		}

		var str = $('#detail_post').text();
		if(str){
			//console.log("string = ",str);
			var frequences = count(str.toLowerCase(), {}, 0);
			//console.log("frequences", frequences);
			return getRelativeRate(frequences);
		} else return [];
	}),
	pieOptions : {
  	  animation : false,  // Edit: correction typo: from 'animated' to 'animation'
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

			function GetUnique(inputArray) {
			    var outputArray = [];
			    
			    for (var i = 0; i < inputArray.length; i++)
			    {
			        if (($.inArray(inputArray[i], outputArray)) == -1)
			        {
			            outputArray.push(inputArray[i]);
			        }
			    }
			   
			    return outputArray;
			}

			return GetUnique(authors).length;
		} else {
			return 0;
		} 
		
	}),
});