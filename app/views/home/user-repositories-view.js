var View = require('views/base/view');

module.exports = View.extend({
  autoRender: true,
  className: 'register',
  template: require('./templates/user-repositories'),
});
