var View = require('views/base/view');

module.exports = View.extend({
  container: 'body',
  id: 'site-container',
  regions: {
    main: '#page-container'
  },
  template: require('./templates/site')
});
