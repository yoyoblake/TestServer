var React = require('react');

class Nav extends React.Component{
    render(){
        return(
            <nav className="left" id="left-asdie">
                <ul>
                    <li>
                        <a href="/">Index</a>
                    </li>
                    <li>
                        <a href="/config_and_run" >Configure and Run</a>
                    </li>
                    <li>
                        <a target="_blank" href="/jenkins">Jenkins</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

module.exports = Nav;
