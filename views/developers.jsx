var React = require('react');
var Developer = require('./developer.jsx');

var Developers = React.createClass({
  render: function() {
    return (
      <div className="dev_points__app">
        <div className="developers">
        {
          this.props.developers.map(function(developer, index){
            return <Developer index={index} developer={developer} />;
          })
        }
        </div>
      </div>
    )
  }
});

module.exports = Developers;
