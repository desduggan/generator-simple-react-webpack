'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var extend = require('deep-extend');
var _ = require('lodash');


module.exports = yeoman.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('rvdf simple app') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'authorName',
      message: 'What is your name?',
      //Defaults to the project's folder name if the input is skipped
      default: ''
    },{
      type: 'input',
      name: 'authorEmail',
      message: 'What is your email?',
      default: ''
    },{
      type: 'input',
      name: 'appName',
      message: 'What would you like to name this app? Input as kebab case: my-app',
      default: 'my-app',
      filter: function(name) {
        name = _.kebabCase(name);
        return name;
      }
    },{
      type: 'input',
      name: 'useCssFramework',
      message: 'Would you like to use a CSS Framework? Choices are: None || Bootstrap || SemanticUI',
      default: 'None',
      filter: function(name) {
        var options = ['none', 'bootstrap', 'semanticui']
        name = name.toLowerCase();
        if (options.indexOf(name.toLowerCase()) != -1 ) {
          return name;
        } else {
          return 'none';
        }
      }
    }];
    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));    
  },

  writing: {
    packageJSON: function() {
      var pkg = this.fs.readJSON(this.templatePath('_package.json'), {});
      extend(pkg, {
        author: {
          name: this.props.authorName,
          email: this.props.authorEmail
        },
        name: this.props.appName
      });
      if (this.props.useCssFramework === 'bootstrap') {
        extend(pkg, {
          dependencies: {
            'bootstrap': '^3.3.6'
          }
        });
      }
      else if (this.props.useCssFramework === 'semanticui') {
        extend(pkg, {
          dependencies: {
            'semantic-ui-css': '^2.1.8',
          }
        });
      }
      this.fs.writeJSON(this.destinationPath(this.props.appName + '/package.json'), pkg);
    },
    project: function() {
      this.fs.copyTpl(
          this.templatePath('src/app.jsx'),
          this.destinationPath(this.props.appName + '/src/app.jsx'),{
            useCssFramework: this.props.useCssFramework
          }
      );
      this.fs.copyTpl(
          this.templatePath('src/index.jsx'),
          this.destinationPath(this.props.appName + '/src/index.jsx'),{}
      );
      this.fs.copyTpl(
          this.templatePath('dist/**'),
          this.destinationPath(this.props.appName + '/dist'), {}
      );
      this.fs.copyTpl(
          this.templatePath('tools/**'),
          this.destinationPath(this.props.appName + '/tools'), {}
      );
      this.fs.copyTpl(
          this.templatePath('_babelrc'),
          this.destinationPath(this.props.appName + '/.babelrc'), {}
      );
      this.fs.copyTpl(
          this.templatePath('_gitignore'),
          this.destinationPath(this.props.appName + '/.gitignore'), {}
      );
      this.fs.copyTpl(
          this.templatePath('README.md'),
          this.destinationPath(this.props.appName + '/README.md'), {}
      );
    }
  },

  install: function () {
    // this.installDependencies({bower: false});
  }
});
