var View = require('views/base/view');
module.exports = View.extend({
  autoRender: true,
  template: require('./templates/header'),
  initialize:function(){
  	View.prototype.initialize.apply(this,arguments);
    this.model.on('change', this.render);
  },
  afterRender:function(){
  	
  }
});
