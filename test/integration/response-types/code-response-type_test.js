
/**
 * Module dependencies.
 */

var CodeResponseType = require('../../../lib/response-types/code-response-type');
var InvalidArgumentError = require('../../../lib/errors/invalid-argument-error');
var should = require('should');
var url = require('url');

/**
 * Test `CodeResponseType`.
 */

describe('CodeResponseType', function() {
  describe('constructor()', function() {
    it('should throw an error if `code` is missing', function() {
      try {
        new CodeResponseType();

        should.fail();
      } catch (e) {
        e.should.be.an.instanceOf(InvalidArgumentError);
        e.message.should.equal('Missing parameter: `code`');
      }
    });

    it('should set the `code`', function() {
      var responseType = new CodeResponseType('foo');

      responseType.code.should.equal('foo');
    });
  });

  describe('getRedirectUri()', function() {
    it('should throw an error if the `redirectUri` is missing', function() {
      var responseType = new CodeResponseType('foo');

      try {
        responseType.getRedirectUri();

        should.fail();
      } catch (e) {
        e.should.be.an.instanceOf(InvalidArgumentError);
        e.message.should.equal('Missing parameter: `redirectUri`');
      }
    });

    it('should return the new redirect uri and set the `code` and `state` in the query', function() {
      var responseType = new CodeResponseType('foo');
      var redirectUri = responseType.getRedirectUri('http://example.com/cb');

      url.format(redirectUri).should.equal('http://example.com/cb?code=foo');
    });

    it('should return the new redirect uri and append the `code` and `state` in the query', function() {
      var responseType = new CodeResponseType('foo');
      var redirectUri = responseType.getRedirectUri('http://example.com/cb?foo=bar');

      url.format(redirectUri).should.equal('http://example.com/cb?foo=bar&code=foo');
    });
  });
});