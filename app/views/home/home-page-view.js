var View = require('views/base/view');
var RegisterView = require('views/home/register-view');
var UserRepositoriesView = require('views/home/user-repositories-view');

module.exports = View.extend({
  autoRender: true,
  className: 'home-page',
  template: require('./templates/home'),
  initialize:function(){
  	View.prototype.initialize.apply(this,arguments);
  	//this.testGitHubGetUser();
  	//this.testGitHubGetUserRepositories();
  	/*this.on('addedToDOM', function(){
  		debugger
  		$('table').tablesort();
  	});*/
	this.subscribeEvent('user-registered', this.onUserRegistered);
  },
  afterRender:function(){
  	var cookieValues=$.cookie('github-vacante');
  	if(cookieValues!=null){
  		var user=JSON.parse(cookieValues);
  		if(user.userName){
  			this.showUserReposView();			
  			return
  		}
  	}
  	this.showRegisterView();
  },
  showRegisterView:function(){
  	var registerView=new RegisterView({container:this.$('.main-content')});
  	this.subview('main-content', registerView);
  },
  showUserReposView:function(){
  	var userReposView=new UserRepositoriesView({container:this.$('.main-content')});
  	this.subview('main-content', userReposView);
  },
  onUserRegistered:function(){
  	this.showUserReposView();
  },
  dispose:function(){
  	View.prototype.dispose.apply(this,arguments);
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
