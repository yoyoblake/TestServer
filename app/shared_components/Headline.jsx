var React = require('react');

class Headline extends React.Component{
    render(){
        return(
            <h2 id="headline">{this.props.headline_text}</h2>
        );
    }
}

module.exports = Headline;
