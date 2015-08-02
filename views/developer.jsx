var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var Developer = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    return(
      {
        'developer':
        {
          'username': this.props.developer.username,
          'numberOfPoints': this.props.developer.numberOfPoints
        }
      }
    );
  },
  componentWillMount: function() {
    this.bindAsObject(
      new Firebase("https://sweltering-fire-9313.firebaseio.com/developers/" +
        this.state.developer.username + '/'),
      "developer"
    );
  },

  addPoints: function(username, numberOfPointsAdded){
    var numberOfPoints = this.state.developer.numberOfPoints + numberOfPointsAdded;

    this.firebaseRefs["developer"].update({
      'numberOfPoints': numberOfPoints
    });
  },

  removePoints: function(username, numberOfPointsSubtracted){
    var numberOfPoints = this.state.developer.numberOfPoints - numberOfPointsSubtracted;

    this.firebaseRefs["developer"].update({
      'numberOfPoints': numberOfPoints
    });
  },

  render: function(){
    return(
      <div className='developer' key={this.props.index}>
        <div className='name'>
          {this.state.developer.username}
        </div>
        <div className='points'>
          {this.state.developer.numberOfPoints}
        </div>

        <div className='button-group'>

          <h3>Gain Points</h3>

          <button onClick={this.addPoints.bind(this, this.state.developer.username, 10)} >
            <i className="fa fa-life-ring"></i>&nbsp;Fix
          </button>
          <button onClick={this.addPoints.bind(this, this.state.developer.username, 30)} >
            <i className="fa fa-wrench"></i>&nbsp;Change
          </button>
          <button onClick={this.addPoints.bind(this, this.state.developer.username, 50)} >
            <i className="fa fa-star"></i>&nbsp;Feature
          </button>

          <h3>Lose Points</h3>

          <button onClick={this.removePoints.bind(this, this.state.developer.username, 5) }>
            <i className="fa fa-taxi"></i>&nbsp;Rubocop
          </button>
          <button onClick={this.removePoints.bind(this, this.state.developer.username, 5) }>
            <i className="fa fa-bug"></i>&nbsp;Spec
          </button>
          <button onClick={this.removePoints.bind(this, this.state.developer.username, 5) }>
            <i className="fa fa-gavel"></i>&nbsp;QA Bug
          </button>
        </div>
      </div>
    );
  }
});

module.exports = Developer;
