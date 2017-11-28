var React = require('react');
var ReactDOM = require('react-dom');
var HOST_URL = process.env.HOST_URL;
var FILE_SERVER_URL = process.env.FILE_SERVER_URL;
var Nav = require(__dirname + "/../shared_components/Nav.jsx");
var Header = require(__dirname + '/../shared_components/Header.jsx');
var Footer = require(__dirname + '/../shared_components/Footer.jsx');
var Headline = require(__dirname + '/../shared_components/Headline.jsx');
require(__dirname + '/../shared_components/CSS/common.css');
require('./CSS/report.css');
var Summary = require('./Summary.jsx');
var DetailedList = require('./DetailedList.jsx');
var TestInfo = require('./TestInfo.jsx');

var Content = React.createClass({
    getInitialState: function(){
        return {
            test_record : "Init"
        }
    },

    setData: function(result){
        this.setState({
            test_record: result
        })
    },

    getData: function(){
        $.ajax({
            type: "Get",
            dataType : "json",
            url: HOST_URL + '/test_record',
            success: function(response){
                this.setData(response);
            }.bind(this)
        });

    },
    componentWillMount: function(){
        this.getData();
    },

    render: function() {
        return (
            <div>
                <Header header_text="Adcolony WebPortal Test Server" />
                <Headline headline_text="Execution Details"/>
                <Nav />
                <section className="left_middle">
                    <TestInfo testinfo={{timeStamp: this.state.test_record.timeStamp,
                                        env: this.state.test_record.env,
                                        build_version: this.state.test_record.build_version}}
                    />
                    <Summary count={this.state.test_record.result_count}
                        timeStamp={this.state.test_record.timeStamp}
                        HOST_URL={HOST_URL}
                    />
                    <DetailedList status={this.state.test_record.test}
                        timeStamp={this.state.test_record.timeStamp}
                        fileServer_URL={FILE_SERVER_URL}
                    />
                </section>
                <section className='left_side'/>
                <Footer />
            </div>
        );
    }
});

ReactDOM.render(<Content />, document.getElementById('content'));
//ReactDOM.render(<Header header_text={"Test"}/>, document.getElementById('header'));
//ReactDOM.render(<Footer />, document.getElementById('footer'));
