var Controller = require('controllers/base/controller');
var HomePageView = require('views/home/home-page-view');

module.exports = Controller.extend({
  beforeAction: function() {
    this.constructor.__super__.beforeAction.apply(this, arguments);
  },

  index: function() {
    this.view = new HomePageView({region: 'main'});
  }
});
