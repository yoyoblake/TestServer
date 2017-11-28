var React = require('react');
var Methods_table = require('./components/Methods_table.jsx');

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

//assign the filter keywords
var keywords = getUrlParameter('keys').split(" ");
var filter_array = {suite:"", pack:"", result:""};
if(keywords != ""){
    filter_array.result=keywords[keywords.length - 1];
    for(var i = 0; i < keywords.length - 1; i++){
        if(i == 0) {filter_array.suite = keywords[i]};
        if(i == 1) {filter_array.pack = keywords[i]};
    }
}

class DetailedList extends React.Component{
    status_filter(status_in, filter_array){
        var status = status_in;
        if(keywords == ""){
            return status;
        }

        for(var suite in status){
            if(filter_array.suite != "" && !filter_array.suite.includes(suite)){
                delete status[suite];
                continue;
            }

            var pack_count = 0;
            for(var pack in status[suite]){
                if(filter_array.pack != "" && !filter_array.pack.includes(pack)){
                    delete status[suite][pack];
                    continue;
                }

                var class_count = 0;
                for(var className in status[suite][pack]){
                    var methods_count = 0;
                    for(var method in status[suite][pack][className]){
                        if(filter_array.result != "Total" && filter_array.result != status[suite][pack][className][method]){
                            delete status[suite][pack][className][method];
                            continue;
                        }
                        methods_count++;
                    }
                    //filter out current class if no method to display
                    if(methods_count == 0){
                        delete status[suite][pack][className];
                        continue;
                    }
                    class_count++;
                }
                //filter out current pack if no class to display
                if(class_count == 0){
                    delete status[suite][pack];
                    continue;
                }
                pack_count++;
            }
            //filter out current suite if no pack to display
            if(pack_count == 0){
                delete status[suite];
                continue;
            }
        }

        return status;
    }

    render(){
        var status = this.status_filter(this.props.status, filter_array);
        var fileServer_URL = this.props.fileServer_URL;
        var indents = [];

        var li_suite = {
            fontSize: "18pt",
            fontWeight: 'bold',
            color: "blue",
        }

        var li_pack = {
            fontSize: "16pt",
            fontWeight: 'bold',
            color: "black",
        }

        var li_class = {
            fontSize: "13pt",
            fontWeight: 'normal',
            color: "black",
        }

        for(var suite in status){
            var pack_list = [];
            for(var pack in status[suite]){
                var class_list = [];
                for(var className in status[suite][pack]){
                    var reprot_path = fileServer_URL +
                        '/Reports/tests.' + suite+'.' + pack + '.' + className +
                        '/' + this.props.timeStamp + '_' + className + '.html';
                    var class_attr = suite + ' ' + pack + ' ' + className;
                    class_list.push(
                        <li key={class_attr} className={class_attr} id={className} style={li_class}>Class : {className}
                            <Methods_table methods={status[suite][pack][className]}
                                report_path={reprot_path}
                                timeStamp={this.props.timeStamp}
                                class_attr={class_attr}
                                filter_array={filter_array}
                            />
                        </li>
                    );
                }

                pack_list.push(
                    <li key={pack} className={suite + ' ' + pack} id="package" style={li_pack}>Package : {pack}
                        <ul id="class_list" key="class_list">{class_list}</ul>
                    </li>
                );

            }

            indents.push(
                <li key={suite} className={suite} id="suite" style={li_suite}>Suite : {suite}
                    <ul id="pack_list" key="pack_list">{pack_list}</ul>
                </li>
            );
        }

        return(
            <div className="center" id="detailedList">
                <div id="filter">
                    <h3>Filter applied : </h3>
                    {filter_array.suite==""? "":<p>Suite -> {filter_array.suite}</p>}
                    {filter_array.pack==""? "":<p>Pack -> {filter_array.pack}</p>}
                    {filter_array.result==""? "":<p>Result -> {filter_array.result}</p>}
                </div>
                {jQuery.isEmptyObject(status)?
                    <div id="">
                        <h2 id="emptyList">No result found according to filter applied</h2>
                    </div>
                     :
                    <ul id="top">{indents}</ul>
                }
            </div>
        );
    }

}

module.exports = DetailedList;
