var React = require('react');

class ReportList extends React.Component{

    render(){
        /******* Style Block *********/
        var td_pass_style = {backgroundColor: '#e9f9db'};
        var td_fail_style = {backgroundColor: '#f9dbdb'};
        var td_skip_style = {backgroundColor: '#fcfbdb'};
        var tr_head_style = {backgroundColor: '#a4d9f2', textAlign:'center'};
        var tr_center_style = {textAlign:'center'}
        var table_style = {backgroundColor:'#dce9ed'}
        var a_pass_style = {color:'green'};
        var a_fail_style = {color:'red'};
        var a_skip_style = {color:'#c6c301'};
        /****** Style Block Ends *****/

        var files_array = this.props.files_array;
        var indents = [];
        for(var file in files_array){
            indents.push(
                <tr style={tr_center_style} key={file}>
                    <td><a href={'/report_' + file}>{file.split('.')[0]}<br/></a></td>
                    <td><a href={file.split('.')[0].replace(':', '-').replace(':', '-') + '/CodeCoverage/index.html'}>Code Coverage<br/></a></td>
                    <td><a href={file.split('.')[0].replace(':', '-').replace(':', '-') + '/UnitTests/mochawesome.html'}>Unit Tests<br/></a></td>
                    <td>{files_array[file].env}</td>
                    <td>{files_array[file].build_version}</td>
                    <td style={td_pass_style}>
                        <a style={a_pass_style} href={'/report_'+file+'?keys=Pass'}>
                            {files_array[file].testOverallStat.Pass}
                        </a>
                    </td>
                    <td style={td_fail_style}>
                        <a style={a_fail_style} href={'/report_'+file+'?keys=Fail'}>
                            {files_array[file].testOverallStat.Fail}
                        </a>
                    </td>
                    <td style={td_skip_style}>
                        <a style={a_skip_style} href={'/report_'+file+'?keys=Skip'}>
                            {files_array[file].testOverallStat.Skip}
                        </a>
                    </td>
                </tr>

            );
        }

        return(
            <table style={table_style} id='ReportList'>
                <tbody>
                    <tr style={tr_head_style}>
                        <td>Execution Time</td>
                        <td>Code Coverage</td>
                        <td>Unit Tests</td>
                        <td>Environment</td>
                        <td>BuildVersion</td>
                        <td>Pass</td>
                        <td>Fail</td>
                        <td>Skip</td>
                    </tr>
                    {indents}
                </tbody>
            </table>
        );
    }
}

module.exports = ReportList;
