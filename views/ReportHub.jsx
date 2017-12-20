var React = require('react');

class Report extends React.Component{
    render(){
        var path = this.props.dirPath + '/';
        console.log(path);
        var fileUrl = this.props.fileUrl + '/';

        return(
            <html>
                <head>
                    <title>Report</title>
                </head>
                <body>
                    <h1> Report History</h1>
                    <div>
                        <a href='/'>Home Page</a>
                        <h2>List</h2>
                        <div>
                        </div>
                        <div id="content">
                            {this.props.data.map(function(item){
                                return <a key={item} href={'/report_' + item}>{item}<br /></a>;
                            })}
                        </div>
                    </div>
                </body>


            </html>
        );
    }

}

module.exports = Report;
