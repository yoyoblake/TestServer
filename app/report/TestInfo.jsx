var React = require('react');

class TestInfo extends React.Component{
    render(){
        return(
            <div className="center">
                <h4>Execution Time : {this.props.testinfo.timeStamp}</h4>
                <h4>Environment : {this.props.testinfo.env}</h4>
                <h4>Build Version : {this.props.testinfo.build_version}</h4>
            </div>
        );
    }
}

module.exports = TestInfo;
