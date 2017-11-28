var React = require('react');
var Table_Methods = require('./components/Table_Methods.jsx');
class DetailedList extends React.Component{
    render(){
        var status = this.props.status;

        var indents = [];
        for(var suite in status){
            var pack_list = [];
            for(var pack in status[suite]){
                var class_list = [];
                for(var className in status[suite][pack]){
                    class_list.push(
                        <li id={className} key={className}>{className}
                            <Table_Methods methods={status[suite][pack][className]} />
                        </li>
                    );
                }

                pack_list.push(
                    <li id={pack} key={pack}>Package : {pack}
                        <ul id="class_list" key="class_list">{class_list}</ul>
                    </li>
                );
            }

            indents.push(
                <li id={suite} key={suite}>Suite : {suite}
                    <ul id="pack_list" key="pack_list">{pack_list}</ul>
                </li>

            );
        }

        return(
            <ul id="top">
                {indents}
            </ul>
        );
    }

}

module.exports = DetailedList;
