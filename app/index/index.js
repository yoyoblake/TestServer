var React = require('react');
var ReactDOM = require('react-dom');
require('./CSS/index.css');
require(__dirname + '/../shared_components/CSS/common.css');
var HOST_URL = process.env.HOST_URL;
var Nav = require(__dirname + "/../shared_components/Nav.jsx");
var Header = require(__dirname + '/../shared_components/Header.jsx');
var Footer = require(__dirname + '/../shared_components/Footer.jsx');
var ReportList = require('./ReportList.jsx');

var Content = React.createClass({
    getInitialState: function(){
        return {
            data : "Initial"
        }
    },

    setData: function(result){
        this.setState({
            data: result
        })
    },

    getData: function(){
        $.ajax({
            type: "Get",
            dataType : "json",
            url: HOST_URL + '/reportHub',
            success: function(response){
                this.setData(response);
            }.bind(this)
        });

    },
    componentWillMount: function(){
        this.getData();
    },

    render: function() {
        var div;
        if(this.state.data != "Initial"){
            try{
                var files_array = this.state.data.files;
                div = <ReportList files_array = {this.state.data.files}/>

            }catch(err){
                console.log("Error Message" + err);
            }
        }

        return (
            <div>
                <Header header_text="Adcolony WebPortal Test Server"/>
                <h2 className="center">Report History</h2>
                <Nav />
                <section className="left_middle">
                    <div id="report_list">
                        {div}
                    </div>
                </section>
                <section className="left_side" />
                <Footer />
            </div>
        );
      }
});

ReactDOM.render(<Content />, document.getElementById('content'));
