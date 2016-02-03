var Controller = require('controllers/base/controller');
var UserModel = require('models/user-model');
var HomePageView = require('views/home/home-page-view');

module.exports = Controller.extend({
  beforeAction: function() {
    this.constructor.__super__.beforeAction.apply(this, arguments);
  },

  index: function() {
  	var cookieValues=$.cookie('github-vacante');
  	var userModel=new UserModel();
    if(cookieValues!=null){
      userModel=new UserModel(JSON.parse(cookieValues));
    }
    this.view = new HomePageView({model:userModel, region: 'main'});
  }
});
