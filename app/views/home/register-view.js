var View = require('views/base/view');

module.exports = View.extend({
    autoRender: true,
    className: 'register',
    template: require('./templates/register'),
    /*events:{
      'click .button':'onRegisterValidated'
    },*/
    initialize: function() {
        View.prototype.initialize.apply(this, arguments);
        _.bindAll(this, 'onRegisterValidated','onGithubUserVerified','onGithubUserInvalid');
    },
    afterRender: function() {
        this.configValidation();
    },
    configValidation: function() {
        this.$('.ui.form')
            .form({
                onSuccess:this.onRegisterValidated,
                fields: {
                    name: {
                        rules: [{
                            type: 'empty',
                            prompt: 'Por favor escriba su nombre'
                        }]
                    },
                    lastName: {
                        rules: [{
                            type: 'empty',
                            prompt: 'Por favor escriba su apellido'
                        }]
                    },
                    document: {
                        rules: [{
                                type: 'empty',
                                prompt: 'Por favor escriba el número de su documento'
                            }, {
                                type: 'maxLength[10]',
                                prompt: 'El número de su documento no debe exceder 10 caracteres'
                            }

                        ]
                    },
                    birthDate: {
                        rules: [{
                            type: 'empty',
                            prompt: 'Por favor escriba su fecha de nacimiento'
                        }]
                    },
                    email: {
                        rules: [{
                            type: 'empty',
                            prompt: 'Por favor escriba su correo electrónico'
                        }, {
                            type: 'email',
                            prompt: 'Por favor escriba un correo electrónico válido'
                        }]
                    },
                    userName: {
                        rules: [{
                            type: 'empty',
                            prompt: 'Por favor escriba el nombre de usuario de Github'
                        }]
                    }
                }
            });
    },
    onRegisterValidated:function(event){
      event.preventDefault();
      var username=this.$('[name=userName]').val();
      this.$('.ui.form').addClass('loading');
      $.get('https://api.github.com/users/'+username)
      .fail(this.onGithubUserInvalid)
      .done(this.onGithubUserVerified);
    },
    onGithubUserVerified:function(data){
      this.$('.ui.form').removeClass('loading');
      var userFields=this.$('.ui.form').form('get values')
      $.cookie('github-vacante', JSON.stringify(userFields));
      this.model.set(userFields);
      this.publishEvent('user-registered');
    },
    onGithubUserInvalid:function(){
      this.$('.ui.form').removeClass('loading');
      this.$('.ui.form').form('add errors',['El usuario de github es inválido'])
    },
});
