var View = require('views/base/view');

module.exports = View.extend({
  autoRender: true,
  className: 'register',
  template: require('./templates/user-repositories'),
  events:{
    'click #register-another-user-btn':'onRegisterAnotherUser',
  	'click .pagination-links button':'onPaginationLinkClick'
  },
  initialize:function(){
    View.prototype.initialize.apply(this,arguments);
  },
  afterRender:function(){
    this.loadRepositories();
    this.$('table').tablesort();
    var that=this;
    var debounced = _.debounce(function(){
      that.makeAPIRequest(url).always(function(){
        that.$('.repo-search-txt').parent().removeClass('loading');  
      })
    }, 300);
    
    this.$('.repo-search-txt').keyup(function(){
      var searchText=that.$('.repo-search-txt').val();
      if(searchText.length>=1 && searchText.length<3) return;
      that.$('.repo-search-txt').parent().addClass('loading');
      var query=(searchText?searchText:'')+' in:name user:'+that.model.get('userName');
      url='https://api.github.com/search/repositories?q='+query+'&per_page=5';
        debounced();
    });
  },
  onRegisterAnotherUser:function(){
  	$.removeCookie('github-vacante');
    this.model.clear();
  	this.publishEvent('user-unregistered')
  },
  loadRepositories:function(){
    var that=this;
    var searchText=this.$('.repo-search-txt').val();
    var query=(searchText?searchText:'')+' in:name user:'+that.model.get('userName');
    var url='https://api.github.com/search/repositories?q='+query+'&per_page=5';
    this.makeAPIRequest(url);
  },
  makeAPIRequest:function(url){
    var that=this;
    return $.get(url)
    .done(function(data,textStatus, request){
      that.displayRepositories(data,textStatus, request);
    })
    .fail(function(request, textStatus, errorThrown){
        console.log(request);
    });
  },
  displayRepositories:function(data,textStatus, request){
    var linksHeader=request.getResponseHeader('Link');
      var links={first:null, next:null, prev:null, last:null};
      if(linksHeader)
      _.each(linksHeader.split(','), function(link){
        var linkData=link.split(';');
        var key=linkData[1].slice(6,-1);
        links[key]=linkData[0].trim().slice(1,-1);;
        ;
      });

    var tableTemplate= require('./templates/user-repositories-table');
    var tableHTML=tableTemplate(data);
    var tablesort = this.$('table').data('tablesort');
    var thIndex=this.$('table th.sorted').index();
    var sortDirection=tablesort.direction;
    tablesort.destroy();
    this.$('table').replaceWith(tableHTML);
    this.$('table').tablesort();
    tablesort = this.$('table').data('tablesort');
    tablesort.sort(this.$('table th:eq('+thIndex+')'), sortDirection);

    var paginationTemplate= require('./templates/user-repositories-pag-links');
    var linksHTML=paginationTemplate(links);
    $('.pagination-links button')
    .popup('destroy')
    this.$('.pagination-links').html(linksHTML);
    $('.pagination-links button')
    .popup();
  },
  onPaginationLinkClick:function(e){
    var button=e.currentTarget;
    e.preventDefault();
    var linkURL=$(button).data('link')
    this.makeAPIRequest(linkURL);
  }
});
