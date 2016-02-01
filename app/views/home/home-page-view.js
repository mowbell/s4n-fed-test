var View = require('views/base/view');

module.exports = View.extend({
  autoRender: true,
  className: 'home-page',
  template: require('./templates/home'),
  initialize:function(){
  	View.prototype.initialize.apply(this,arguments);
  	//this.testGitHubGetUser();
  	//this.testGitHubGetUserRepositories();
  	this.on('addedToDOM', function(){
  		debugger
  		$('table').tablesort();
  	});
  },
  testGitHubGetUser:function(){
  	$.get(
  		'https://api.github.com/users/addyosmani', function(data){
  			debugger
  			console.log(data);
  		}
  	);
  },
  testGitHubGetUserRepositories:function(){
  	$.get(
  		'https://api.github.com/search/repositories', 
  		{
  			"q":'a11'+' in:name user:addyosmani',
  			"per_page":5
  		},
  		function(data){
  			debugger
  			console.log(data);
  		}
  	);
  }
});
