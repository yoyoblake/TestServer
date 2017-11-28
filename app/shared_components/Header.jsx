var React = require('react');

class Header extends React.Component{
    render(){
        return(
            <header>
                <img src="./public/img/adcolony_logo.png" alt="Icon of Adcolony"></img>
                <h1 id="header">{this.props.header_text}</h1>
            </header>
        );
    }
}

module.exports = Header;
