var React = require('react');

class Home extends React.Component{
    render(){
        var letterStyle = {
        padding: 10,
        margin: 10,
        color: "#333",
        display: "inline-block",
        fontFamily: "monospace",
        textAlign: "center"
      };


        return(
            <html>
                <head>
                    <title>Adolony Test Server</title>
                </head>
                <body style={letterStyle}>
                    <div>
                        <h1>Adcolony Test Server Web Portal<br /></h1>
                        <a href='/reportHub'>Report</a>
                        <p></p>
                        <a href='/jenkins'>Jenkins</a>
                        <p></p>
                        <a href='/configure'>Configure</a>
                        <p></p>
                        <form method="get" action="/shell">
                            <button>Run Test</button>
                        </form>
                    </div>

                </body>

            </html>


        );
    }

}

module.exports = Home;
