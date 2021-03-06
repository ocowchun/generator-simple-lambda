'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the groovy ' + chalk.red('generator-simple-lambda') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'What\'s your project name?',
      default: this.appname
    }, {
      type: 'input',
      name: 'description',
      message: 'What\'s your project description?',
      default: 'do some amazing things!'
    }, {
      type: 'input',
      name: 'functionName',
      message: 'What\'s your function name?',
      default: this.appname
    }, {
      type: 'input',
      name: 'userName',
      store: true,
      message: 'What\'s your GitHub username?',
      default: this.appname
    }, {
      type: 'input',
      name: 'email',
      store: true,
      message: 'What\'s your email?',
      default: this.appname
    }, {
      type: 'input',
      name: 'iamRole',
      store: true,
      message: 'What\'s your AWS IAM Role name?'
    }];

    this.prompt(prompts, function(props) {
      this.props = props;
      // To access props later use this.props.someOption;
      done();
    }.bind(this));
  },

  writing: function() {
    var copyTpl = function(file, props) {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file), props
      );
    }.bind(this);

    var copy = function(file) {
      this.fs.copy(
        this.templatePath(file),
        this.destinationPath(file)
      );
    }.bind(this);


    copyTpl('README.md', {
      title: this.props.projectName
    });

    copyTpl('package.json', {
      title: this.props.projectName,
      userName: this.props.userName,
      email: this.props.email,
      description: this.props.description
    });


    copyTpl('config.js', {
      functionName: this.props.functionName,
      iamRole: this.props.iamRole,
      description: this.props.description
    })

    this.fs.copy(
      this.templatePath('_.gitignore'),
      this.destinationPath('.gitignore')
    );

    ['src/index.js', 'index.js', 'aws.js', 'gulpfile.js', '.babelrc'].forEach(function(file) {
      copy(file);
    });

  },

  install: function() {
    this.npmInstall()
      // this.installDependencies();
  }
});