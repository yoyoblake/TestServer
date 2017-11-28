var React = require('react');
var HOST_URL = process.env.HOST_URL;

class Td_Link extends React.Component{
    render(){
        /** Style Block **/
        var td_pass_style = {
            textAlign:'center',
            backgroundColor: '#baffbe'
        };
        var td_fail_style = {
            textAlign:'center',
            backgroundColor: '#ffbaba'
        };

        var td_skip_style = {
            textAlign:'center',
            backgroundColor: '#fff5ba'
        };
        var a_pass_style = {color:'green'};
        var a_fail_style = {color:'red'};
        var a_skip_style = {color:'#c6c301'};
        var td_pack_pass_color = '#e9f9db';
        var td_pack_fail_color = '#f9dbdb';
        var td_pack_skip_color = '#fcfbdb';
        /** Style Block end **/

        if(!HOST_URL){
            HOST_URL = this.props.page_info.HOST_URL;
        }
        var timeStamp = this.props.page_info.timeStamp;
        var class_attr = this.props.class_attr;
        var current_url = HOST_URL + '/report_' + timeStamp + '.json';
        var attr_array = class_attr.split(' ');
        var td_result = attr_array[attr_array.length - 1];
        var td_style = {textAlign:'center', backgroundColor: '#c0d6db'};
        var a_style = {color:'blue', fontWeight: 'bold'};
        switch(td_result){
            case 'Pass':
                if(attr_array.length == 3) td_pass_style.backgroundColor = td_pack_pass_color;
                td_style = td_pass_style;
                a_style = a_pass_style;
                break;
            case 'Fail':
                if(attr_array.length == 3) td_fail_style.backgroundColor = td_pack_fail_color;
                td_style = td_fail_style;
                a_style = a_fail_style;
                break;
            case 'Skip':
                if(attr_array.length == 3) td_skip_style.backgroundColor = td_pack_skip_color;
                td_style = td_skip_style;
                a_style = a_skip_style;
                break;
            default:
                if(attr_array.length == 3) td_style.backgroundColor = '#edf5f7';
                break;
        }

        return(
            <td className={class_attr} style={td_style}>
                <a style={a_style} href={current_url + '?keys=' + class_attr}>
                    {this.props.content}
                </a>

            </td>
        );
    }
}

module.exports = Td_Link;
