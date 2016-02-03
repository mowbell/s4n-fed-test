!function(){"use strict";var e="undefined"==typeof window?global:window;if("function"!=typeof e.require){var t={},r={},i={},n={}.hasOwnProperty,s="components/",a=function(e,t){var r=0;t&&(0===t.indexOf(s)&&(r=s.length),t.indexOf("/",r)>0&&(t=t.substring(r,t.indexOf("/",r))));var n=i[e+"/index.js"]||i[t+"/deps/"+e+"/index.js"];return n?s+n.substring(0,n.length-".js".length):e},o=/^\.\.?(\/|$)/,l=function(e,t){for(var r,i=[],n=(o.test(t)?e+"/"+t:t).split("/"),s=0,a=n.length;a>s;s++)r=n[s],".."===r?i.pop():"."!==r&&""!==r&&i.push(r);return i.join("/")},u=function(e){return e.split("/").slice(0,-1).join("/")},c=function(t){return function(r){var i=l(u(t),r);return e.require(i,t)}},d=function(e,t){var i={id:e,exports:{}};return r[e]=i,t(i.exports,c(e),i),i.exports},p=function(e,i){var s=l(e,".");if(null==i&&(i="/"),s=a(e,i),n.call(r,s))return r[s].exports;if(n.call(t,s))return d(s,t[s]);var o=l(s,"./index");if(n.call(r,o))return r[o].exports;if(n.call(t,o))return d(o,t[o]);throw new Error('Cannot find module "'+e+'" from "'+i+'"')};p.alias=function(e,t){i[t]=e},p.register=p.define=function(e,r){if("object"==typeof e)for(var i in e)n.call(e,i)&&(t[i]=e[i]);else t[e]=r},p.list=function(){var e=[];for(var r in t)n.call(t,r)&&e.push(r);return e},p.brunch=!0,p._cache=r,e.require=p}}(),require.register("application",function(e,t,r){r.exports=Application=Chaplin.Application.extend({})}),require.register("controllers/base/controller",function(e,t,r){var i=t("views/site-view");r.exports=Chaplin.Controller.extend({beforeAction:function(){return this.reuse("site",i)}})}),require.register("controllers/home-controller",function(e,t,r){var i=t("controllers/base/controller"),n=t("models/user-model"),s=t("views/home/home-page-view");r.exports=i.extend({beforeAction:function(){this.constructor.__super__.beforeAction.apply(this,arguments)},index:function(){var e=$.cookie("github-vacante"),t=new n;null!=e&&(t=new n(JSON.parse(e))),this.view=new s({model:t,region:"main"})}})}),require.register("initialize",function(e,t,r){var i=t("application"),n=t("routes");$(function(){return new i({title:"GitHub Vacantes",controllerSuffix:"-controller",routes:n})})}),require.register("lib/utils",function(e,t,r){var i=Chaplin.utils.beget(Chaplin.utils);"function"==typeof Object.seal&&Object.seal(i),r.exports=i}),require.register("lib/view-helper",function(e,t,r){var i=t("./utils"),n=function(e,t){return Handlebars.registerHelper(e,t)};n("with",function(e,t){return!e||Handlebars.Utils.isEmpty(e)?t.inverse(this):t.fn(e)}),n("without",function(e,t){var r=t.inverse;return t.inverse=t.fn,t.fn=r,Handlebars.helpers["with"].call(this,e,t)}),n("url",function(e){var t=[].slice.call(arguments,1);t.pop();return i.reverse(e,t)})}),require.register("mediator",function(e,t,r){r.exports=Chaplin.mediator}),require.register("models/base/collection",function(e,t,r){var i=t("./model");r.exports=Chaplin.Collection.extend({model:i})}),require.register("models/base/model",function(e,t,r){r.exports=Chaplin.Model.extend({})}),require.register("models/user-model",function(e,t,r){r.exports=Chaplin.Model.extend({defaults:{name:"",lastName:"",document:"",birthDate:"",email:"",userName:""}})}),require.register("routes",function(e,t,r){r.exports=function(e){return e("","home#index")}}),require.register("views/base/collection-view",function(e,t,r){var i=t("./view");r.exports=Chaplin.CollectionView.extend({getTemplateFunction:i.prototype.getTemplateFunction})}),require.register("views/base/view",function(e,t,r){t("lib/view-helper"),r.exports=Chaplin.View.extend({optionNames:Chaplin.View.prototype.optionNames.concat(["template"]),initialize:function(){Chaplin.View.prototype.initialize.apply(this,arguments)},getTemplateFunction:function(){return this.template},render:function(){Chaplin.View.prototype.render.apply(this,arguments),this.afterRender()},afterRender:function(){}})}),require.register("views/home/home-header-view",function(e,t,r){var i=t("views/base/view");r.exports=i.extend({autoRender:!0,template:t("./templates/header"),initialize:function(){i.prototype.initialize.apply(this,arguments),this.model.on("change",this.render)},afterRender:function(){}})}),require.register("views/home/home-page-view",function(e,t,r){var i=t("views/base/view"),n=t("views/home/register-view"),s=t("views/home/user-repositories-view"),a=t("views/home/home-header-view");r.exports=i.extend({autoRender:!0,className:"home-page",template:t("./templates/home"),regions:{header:".main-header"},headerView:null,initialize:function(){i.prototype.initialize.apply(this,arguments),this.subscribeEvent("user-registered",this.onUserRegistered),this.subscribeEvent("user-unregistered",this.onUserUnegistered)},afterRender:function(){return this.headerView=new a({region:"header",model:this.model}),this.model&&this.model.get("userName")?void this.showUserReposView():void this.showRegisterView()},showRegisterView:function(){var e=new n({container:this.$(".main-content"),model:this.model});this.subview("main-content",e)},showUserReposView:function(){var e=new s({container:this.$(".main-content"),model:this.model});this.subview("main-content",e)},onUserRegistered:function(){this.showUserReposView()},onUserUnegistered:function(){this.showRegisterView()},dispose:function(){i.prototype.dispose.apply(this,arguments)}})}),require.register("views/home/register-view",function(e,t,r){var i=t("views/base/view");r.exports=i.extend({autoRender:!0,className:"register",template:t("./templates/register"),initialize:function(){i.prototype.initialize.apply(this,arguments),_.bindAll(this,"onRegisterValidated","onGithubUserVerified","onGithubUserInvalid")},afterRender:function(){this.configValidation()},configValidation:function(){this.$(".ui.form").form({onSuccess:this.onRegisterValidated,fields:{name:{rules:[{type:"empty",prompt:"Por favor escriba su nombre"}]},lastName:{rules:[{type:"empty",prompt:"Por favor escriba su apellido"}]},document:{rules:[{type:"empty",prompt:"Por favor escriba el número de su documento"},{type:"maxLength[10]",prompt:"El número de su documento no debe exceder 10 caracteres"}]},birthDate:{rules:[{type:"empty",prompt:"Por favor escriba su fecha de nacimiento"}]},email:{rules:[{type:"empty",prompt:"Por favor escriba su correo electrónico"},{type:"email",prompt:"Por favor escriba un correo electrónico válido"}]},userName:{rules:[{type:"empty",prompt:"Por favor escriba el nombre de usuario de Github"}]}}})},onRegisterValidated:function(e){e.preventDefault();var t=this.$("[name=userName]").val();this.$(".ui.form").addClass("loading"),$.get("https://api.github.com/users/"+t).fail(this.onGithubUserInvalid).done(this.onGithubUserVerified)},onGithubUserVerified:function(e){this.$(".ui.form").removeClass("loading");var t=this.$(".ui.form").form("get values");$.cookie("github-vacante",JSON.stringify(t)),this.model.set(t),this.publishEvent("user-registered")},onGithubUserInvalid:function(){this.$(".ui.form").removeClass("loading"),this.$(".ui.form").form("add errors",["El usuario de github es inválido"])}})}),require.register("views/home/templates/header",function(e,t,r){var i=Handlebars.template(function(e,t,r,i,n){function s(e,t){var i,n,s="";return s+='\r\n	<div class="sub header">\r\n		<strong>Candidato:</strong> ',(n=r.name)?i=n.call(e,{hash:{},data:t}):(n=e&&e.name,i=typeof n===l?n.call(e,{hash:{},data:t}):n),s+=u(i)+" ",(n=r.lastName)?i=n.call(e,{hash:{},data:t}):(n=e&&e.lastName,i=typeof n===l?n.call(e,{hash:{},data:t}):n),s+=u(i)+"\r\n		<strong>Correo electrónico:</strong> ",(n=r.email)?i=n.call(e,{hash:{},data:t}):(n=e&&e.email,i=typeof n===l?n.call(e,{hash:{},data:t}):n),s+=u(i)+'\r\n		<strong>Usuario Github:</strong> <div class="ui label"><i class="github icon"></i>',(n=r.userName)?i=n.call(e,{hash:{},data:t}):(n=e&&e.userName,i=typeof n===l?n.call(e,{hash:{},data:t}):n),s+=u(i)+"</div>\r\n	</div>\r\n	"}this.compilerInfo=[4,">= 1.0.0"],r=this.merge(r,e.helpers),n=n||{};var a,o="",l="function",u=this.escapeExpression,c=this;return o+='<h1 class="ui header">\r\n<i class="github huge icon"></i>\r\n<div class="content">\r\n	Github Vacantes\r\n	',a=r["if"].call(t,t&&t.email,{hash:{},inverse:c.noop,fn:c.program(1,s,n),data:n}),(a||0===a)&&(o+=a),o+='\r\n</div>\r\n</h1>\r\n<div class="ui divider"></div>'});"function"==typeof define&&define.amd?define([],function(){return i}):"object"==typeof r&&r&&r.exports&&(r.exports=i)}),require.register("views/home/templates/home",function(e,t,r){var i=Handlebars.template(function(e,t,r,i,n){return this.compilerInfo=[4,">= 1.0.0"],r=this.merge(r,e.helpers),n=n||{},'<div class="ui container">\r\n	<div class="main-header">\r\n	    \r\n    </div>\r\n    <div class="main-content">\r\n    </div>\r\n</div>'});"function"==typeof define&&define.amd?define([],function(){return i}):"object"==typeof r&&r&&r.exports&&(r.exports=i)}),require.register("views/home/templates/register",function(e,t,r){var i=Handlebars.template(function(e,t,r,i,n){return this.compilerInfo=[4,">= 1.0.0"],r=this.merge(r,e.helpers),n=n||{},'<div class="ui segment">\r\n    <h2>Registrar Vacante</h2>\r\n    <form class="ui form">\r\n        <div class="ui error message"></div>\r\n        <div class="two fields">\r\n            <div class="field">\r\n                <input type="text" name="name" placeholder="Nombres" value="">\r\n            </div>\r\n            <div class="field">\r\n                <input type="text" name="lastName" placeholder="Apellidos" value="">\r\n            </div>\r\n        </div>\r\n        <div class="two fields">\r\n            <div class="field">\r\n                <input type="text" name="document" placeholder="Documento de identidad" value="">\r\n            </div>\r\n            <div class="field">\r\n                <input type="date" name="birthDate" placeholder="Fecha de nacimiento" value="">\r\n            </div>\r\n        </div>\r\n        <div class="two fields">\r\n            <div class="field">\r\n                <input type="email" name="email" placeholder="Correo eléctronico" value="">\r\n            </div>\r\n            <div class="field">\r\n                <input type="text" name="userName" placeholder="Usuario Github" value="">\r\n            </div>\r\n        </div>\r\n        <div class="ui submit button primary" tabindex="0">Registrar</div>\r\n    </form>\r\n</div>'});"function"==typeof define&&define.amd?define([],function(){return i}):"object"==typeof r&&r&&r.exports&&(r.exports=i)}),require.register("views/home/templates/user-repositories-pag-links",function(e,t,r){var i=Handlebars.template(function(e,t,r,i,n){function s(e,t){return"disabled"}this.compilerInfo=[4,">= 1.0.0"],r=this.merge(r,e.helpers),n=n||{};var a,o="",l=this,u="function",c=this.escapeExpression;return o+='<div class="ui icon buttons right floated">\r\n    \r\n    <button class="ui button ',a=r.unless.call(t,t&&t.first,{hash:{},inverse:l.noop,fn:l.program(1,s,n),data:n}),(a||0===a)&&(o+=a),o+='" \r\n        data-content="Ir al primero"\r\n        data-link="'+c((a=t&&t.first,typeof a===u?a.apply(t):a))+'">\r\n        <i class="angle double left icon"></i>\r\n    </button>\r\n    <button class="ui button ',a=r.unless.call(t,t&&t.prev,{hash:{},inverse:l.noop,fn:l.program(1,s,n),data:n}),(a||0===a)&&(o+=a),o+='" \r\n        data-content="Ir al anterior"\r\n        data-link="'+c((a=t&&t.prev,typeof a===u?a.apply(t):a))+'">\r\n        <i class="angle left icon"></i>\r\n    </button>\r\n    <button class="ui button ',a=r.unless.call(t,t&&t.next,{hash:{},inverse:l.noop,fn:l.program(1,s,n),data:n}),(a||0===a)&&(o+=a),o+='" \r\n        data-content="Ir al siguiente"\r\n        data-link="'+c((a=t&&t.next,typeof a===u?a.apply(t):a))+'">\r\n        <i class="angle right icon"></i>\r\n    </button>\r\n    <button class="ui button ',a=r.unless.call(t,t&&t.last,{hash:{},inverse:l.noop,fn:l.program(1,s,n),data:n}),(a||0===a)&&(o+=a),o+='" \r\n        data-content="Ir al ultimo"\r\n        data-link="'+c((a=t&&t.last,typeof a===u?a.apply(t):a))+'">\r\n        <i class="angle double right icon"></i>\r\n    </button>\r\n    \r\n</div>'});"function"==typeof define&&define.amd?define([],function(){return i}):"object"==typeof r&&r&&r.exports&&(r.exports=i)}),require.register("views/home/templates/user-repositories-table",function(e,t,r){var i=Handlebars.template(function(e,t,r,i,n){function s(e,t){var i,n,s="";return s+="\r\n        <tr>\r\n            <td >",(n=r.name)?i=n.call(e,{hash:{},data:t}):(n=e&&e.name,i=typeof n===l?n.call(e,{hash:{},data:t}):n),s+=u(i)+"</td>\r\n            <td >",(n=r.description)?i=n.call(e,{hash:{},data:t}):(n=e&&e.description,i=typeof n===l?n.call(e,{hash:{},data:t}):n),s+=u(i)+"</td>\r\n            <td >",(n=r.language)?i=n.call(e,{hash:{},data:t}):(n=e&&e.language,i=typeof n===l?n.call(e,{hash:{},data:t}):n),s+=u(i)+"</td>\r\n            <td >",(n=r.default_branch)?i=n.call(e,{hash:{},data:t}):(n=e&&e.default_branch,i=typeof n===l?n.call(e,{hash:{},data:t}):n),s+=u(i)+'</td>\r\n            <td ><a href="',(n=r.git_url)?i=n.call(e,{hash:{},data:t}):(n=e&&e.git_url,i=typeof n===l?n.call(e,{hash:{},data:t}):n),s+=u(i)+'" target="_blank">',(n=r.git_url)?i=n.call(e,{hash:{},data:t}):(n=e&&e.git_url,i=typeof n===l?n.call(e,{hash:{},data:t}):n),s+=u(i)+"</a></td>\r\n        </tr>\r\n        "}this.compilerInfo=[4,">= 1.0.0"],r=this.merge(r,e.helpers),n=n||{};var a,o="",l="function",u=this.escapeExpression,c=this;return o+='<table class="ui sortable celled table">\r\n    <thead>\r\n        <tr>\r\n            <th class="">Nombre</th>\r\n            <th class="">Descripción</th>\r\n            <th class="">Lenguaje</th>\r\n            <th class="">Branch por defecto</th>\r\n            <th class="sorted descending">URL git</th>\r\n            \r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ',a=r.each.call(t,t&&t.items,{hash:{},inverse:c.noop,fn:c.program(1,s,n),data:n}),(a||0===a)&&(o+=a),o+="\r\n    </tbody>\r\n</table>"});"function"==typeof define&&define.amd?define([],function(){return i}):"object"==typeof r&&r&&r.exports&&(r.exports=i)}),require.register("views/home/templates/user-repositories",function(e,t,r){var i=Handlebars.template(function(e,t,r,i,n){return this.compilerInfo=[4,">= 1.0.0"],r=this.merge(r,e.helpers),n=n||{},'<div class="ui clearing segment">\r\n    <h2>Consultar Repositorios</h2>\r\n    <div class="ui two column grid">\r\n        <div class=" column">\r\n            <div class="ui right icon input fluid">\r\n                <input type="text" class="repo-search-txt" placeholder="Buscar..">\r\n                <i class="search icon"></i>\r\n            </div>\r\n        </div>\r\n        <div class="column pagination-links">\r\n            \r\n        </div>\r\n    </div>\r\n    \r\n    <table class="ui sortable celled table">\r\n        <thead>\r\n            <tr>\r\n                <th class="">Nombre</th>\r\n                <th class="">Descripcion</th>\r\n                <th class="">Lenguaje</th>\r\n                <th class="">Branch por defecto</th>\r\n                <th class="sorted descending">URL git</th>\r\n                \r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            \r\n        </tbody>\r\n    </table>\r\n    \r\n    <div id="register-another-user-btn" class="ui right floated red button" tabindex="0">Registrar otro candidato</div>\r\n</div>'});"function"==typeof define&&define.amd?define([],function(){return i}):"object"==typeof r&&r&&r.exports&&(r.exports=i)}),require.register("views/home/user-repositories-view",function(e,t,r){var i=t("views/base/view");r.exports=i.extend({autoRender:!0,className:"register",template:t("./templates/user-repositories"),events:{"click #register-another-user-btn":"onRegisterAnotherUser","click .pagination-links button":"onPaginationLinkClick"},initialize:function(){i.prototype.initialize.apply(this,arguments)},afterRender:function(){this.loadRepositories(),this.$("table").tablesort();var e=this,t=_.debounce(function(){e.makeAPIRequest(url).always(function(){e.$(".repo-search-txt").parent().removeClass("loading")})},300);this.$(".repo-search-txt").keyup(function(){var r=e.$(".repo-search-txt").val();if(!(r.length>=1&&r.length<3)){e.$(".repo-search-txt").parent().addClass("loading");var i=(r?r:"")+" in:name user:"+e.model.get("userName");url="https://api.github.com/search/repositories?q="+i+"&per_page=5",t()}})},onRegisterAnotherUser:function(){$.removeCookie("github-vacante"),this.model.clear(),this.publishEvent("user-unregistered")},loadRepositories:function(){var e=this,t=this.$(".repo-search-txt").val(),r=(t?t:"")+" in:name user:"+e.model.get("userName"),i="https://api.github.com/search/repositories?q="+r+"&per_page=5";this.makeAPIRequest(i)},makeAPIRequest:function(e){var t=this;return $.get(e).done(function(e,r,i){t.displayRepositories(e,r,i)}).fail(function(e,t,r){console.log(e)})},displayRepositories:function(e,r,i){var n=i.getResponseHeader("Link"),s={first:null,next:null,prev:null,last:null};n&&_.each(n.split(","),function(e){var t=e.split(";"),r=t[1].slice(6,-1);s[r]=t[0].trim().slice(1,-1)});var a=t("./templates/user-repositories-table"),o=a(e),l=this.$("table").data("tablesort"),u=this.$("table th.sorted").index(),c=l.direction;l.destroy(),this.$("table").replaceWith(o),this.$("table").tablesort(),l=this.$("table").data("tablesort"),l.sort(this.$("table th:eq("+u+")"),c);var d=t("./templates/user-repositories-pag-links"),p=d(s);$(".pagination-links button").popup("destroy"),this.$(".pagination-links").html(p),$(".pagination-links button").popup()},onPaginationLinkClick:function(e){var t=e.currentTarget;e.preventDefault();var r=$(t).data("link");this.makeAPIRequest(r)}})}),require.register("views/site-view",function(e,t,r){var i=t("views/base/view");r.exports=i.extend({container:"body",id:"site-container",regions:{main:"#page-container"},template:t("./templates/site")})}),require.register("views/templates/site",function(e,t,r){var i=Handlebars.template(function(e,t,r,i,n){return this.compilerInfo=[4,">= 1.0.0"],r=this.merge(r,e.helpers),n=n||{},'<div class="page-container" id="page-container">\r\n</div>\r\n'});"function"==typeof define&&define.amd?define([],function(){return i}):"object"==typeof r&&r&&r.exports&&(r.exports=i)});