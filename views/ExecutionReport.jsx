var React = require('react');
var Summary = require('./report/Summary');
var DetailedList = require('./report/DetailedList');

class ExecutionReport extends React.Component{

    render(){
        return(
            <html>
                <head>
                    <title>Execution Report</title>
                </head>
                <body>
                    <h1>Execution Report</h1>
                    <h2>Execution Time {this.props.test_record.timeStamp}</h2>
                    <div>
                        <Summary count={this.props.test_record.result_count}/>
                        <DetailedList status={this.props.test_record.test}/>
                    </div>
                </body>


            </html>
        );
    }

}

module.exports = ExecutionReport;
