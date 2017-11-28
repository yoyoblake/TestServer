var React = require('react');

class Table_Methods extends React.Component{
    render(){
        var indents = [];
        var methods = this.props.methods;

        for(var method in methods){
            indents.push(
                    <tr className={methods[method]} key={method}>
                        <td>{method}</td>
                        <td>{methods[method]}

                        </td>
                    </tr>
            );
        }
        return(
            <table>
                <tbody>
                    <tr>
                        <th>Method</th>
                        <th>Result</th>
                    </tr>
                    {indents}
                </tbody>
            </table>
        );
    }

}

module.exports = Table_Methods;
