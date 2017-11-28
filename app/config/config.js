var React = require('react');
var ReactDOM = require('react-dom');
var HOST_URL = process.env.HOST_URL;
var FILE_SERVER_URL = process.env.FILE_SERVER_URL;
require(__dirname + '/../shared_components/CSS/common.css');
require('./CSS/config.css');
var Nav = require(__dirname + "/../shared_components/Nav.jsx");
var Header = require(__dirname + '/../shared_components/Header.jsx');
var Footer = require(__dirname + '/../shared_components/Footer.jsx');

var Config = require('./Config.jsx');

var Content = React.createClass({

    render: function() {
      return (
        <div>
            <Header header_text="Adcolony WebPortal Test Server" />
            <h2 className="center">Config & Run</h2>
            <Nav className="nav" />
            <section className="left_middle">
                <Config />
            </section>
            <section className="left_side" />
            <Footer />
        </div>
      );
    }
});

ReactDOM.render(<Content />, document.getElementById('content'));
