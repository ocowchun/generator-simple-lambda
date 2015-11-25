'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-simple-lambda:app', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({
        someOption: true
      })
      .withPrompts({
        projectName: 'appname',
        functionName: 'yoyo',
        userName: 'ocowchun',
        email: 'ocowchun@gmail.com',
        iamRole: 'aws123'
      })
      .on('end', done);
  });

  it('creates files', function() {
    assert.file([
      'README.md'
    ]);
  });
});