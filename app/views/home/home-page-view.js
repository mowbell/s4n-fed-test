var View = require('views/base/view');
var RegisterView = require('views/home/register-view');
var UserRepositoriesView = require('views/home/user-repositories-view');
var HomeHeaderView = require('views/home/home-header-view');

module.exports = View.extend({
    autoRender: true,
    className: 'home-page',
    template: require('./templates/home'),
    regions: {
        'header': '.main-header'
    },
    headerView: null,
    initialize: function() {
        View.prototype.initialize.apply(this, arguments);
        this.subscribeEvent('user-registered', this.onUserRegistered);
        this.subscribeEvent('user-unregistered', this.onUserUnegistered);

    },
    afterRender: function() {
        this.headerView = new HomeHeaderView({
            region: 'header',
            model:this.model
        });
        if (this.model && this.model.get('userName')) {
            this.showUserReposView();
            return
        }
        
        this.showRegisterView();
    },
    showRegisterView: function() {
        var registerView = new RegisterView({
            container: this.$('.main-content'),
            model:this.model
        });
        this.subview('main-content', registerView);
    },
    showUserReposView: function() {
        var userReposView = new UserRepositoriesView({
            container: this.$('.main-content'),
            model:this.model
        });
        this.subview('main-content', userReposView);
    },
    onUserRegistered: function() {
        this.showUserReposView();
    },
    onUserUnegistered: function() {
        this.showRegisterView();
    },
    dispose: function() {
        View.prototype.dispose.apply(this, arguments);
    }
});
