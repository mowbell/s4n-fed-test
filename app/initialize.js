var Application = require('application');
var routes = require('routes');

$(function() {
  return new Application({
    title: 'GitHub Vacantes',
    controllerSuffix: '-controller',
    routes: routes
  });
});
