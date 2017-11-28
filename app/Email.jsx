var React = require('react');
var TestInfo = require('./report/TestInfo.jsx');
var Summary = require('./report/Summary.jsx');

class Email extends React.Component{
    render(){
        return(
            <div>
                <TestInfo
                    testinfo={{timeStamp: this.props.timeStamp,
                        env: this.props.env,
                        build_version: this.props.build_version}}
                />
                <Summary
                    timeStamp={this.props.timeStamp}
                    HOST_URL={this.props.HOST_URL}
                    count={this.props.count}
                />
            </div>
        );
    }
}

module.exports = Email;
