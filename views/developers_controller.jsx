var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var Developers = require('./developers.jsx');

/** Controller View */

var DeveloperController = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {developers: []};
  },

  componentWillMount: function() {
    this.bindAsArray(
      new Firebase("https://sweltering-fire-9313.firebaseio.com/developers/"),
      "developers"
    );
  },

  render: function() {
    return <Developers developers={this.state.developers} />;
  }
});

module.exports = DeveloperController;
