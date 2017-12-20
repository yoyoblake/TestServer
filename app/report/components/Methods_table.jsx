var React = require('react');

class Table_Methods extends React.Component{

    render(){
        var indents = [];
        var methods = this.props.methods;
        var class_attr = this.props.class_attr;

/** Style Block **/
        var tr_head_style = {
            padding: 10,
            margin: 10,
            backgroundColor: "#a4d9f2",
            textAlign: "center"
        }
        var td_center_style = {
            textAlign: "center"
        }

        var td_pass_style = {
            textAlign:'center',
            backgroundColor: '#e9f9db',
            color:'green'
        };
        var td_fail_style = {
            textAlign:'center',
            backgroundColor: '#f9dbdb',
            color:'red'
        };
        var td_skip_style = {
            textAlign:'center',
            backgroundColor: '#fcfbdb',
            color:'#c6c301'
        };
        var td_method_style = {backgroundColor:'#dce9ed'}
        var a_pass_style = {color:'green'};
        var a_fail_style = {color:'red'};
        var a_skip_style = {color:'#c6c301'};
/** Style Block end **/

        for(var method in methods){
            var reportPath = this.props.reportPath;
            //determine style of td
            var td_style = {textAlign:'center'};
            var a_style = {color:'blue'};
            switch(methods[method]){
                case 'Pass': td_style = td_pass_style; a_style = a_pass_style; break;
                case 'Fail': td_style = td_fail_style; a_style = a_fail_style; break;
                case 'Skip': td_style = td_skip_style; a_style = a_skip_style; break;
                default: break;
            }

            indents.push(
                <tr className={class_attr + ' ' + methods[method]} key={method} id="method">
                    <td style={td_method_style}>{method}</td>
                    <td style={td_style}>
                        {(methods[method]=='Skip')?
                            (<a>{methods[method]}</a>):
                            (<a href={reportPath} target="_blank">{methods[method]}</a>)
                        }
                    </td>
                </tr>
            );
        }

        return(
            <table>
                <tbody>
                    <tr style={tr_head_style}>
                        <th width="80%" id="method">Method</th>
                        <th width="20%" id="result">Result</th>
                    </tr>
                    {indents}
                </tbody>
            </table>
        );
    }

}

module.exports = Table_Methods;
