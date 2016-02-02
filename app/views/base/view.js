require('lib/view-helper');

module.exports = Chaplin.View.extend({
  // Allow passing `template` to View constructor so it will be saved
  // as a property on an instance.
  optionNames: Chaplin.View.prototype.optionNames.concat(['template']),
  user:null,
  initialize:function(){
    Chaplin.View.prototype.initialize.apply(this, arguments);
    var cookieValues=$.cookie('github-vacante');
    if(cookieValues!=null){
      this.user=JSON.parse(cookieValues);
    }
  },
  getTemplateFunction: function(){
    return this.template;
  },
  render:function(){
  	Chaplin.View.prototype.render.apply(this, arguments);
  	this.afterRender();
  },
  afterRender:function(){
  }

});
