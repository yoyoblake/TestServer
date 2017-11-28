var React = require('react');
class Summary extends React.Component{
    render(){

      var status = this.props.count;
      var indents = [];
      var overall_result_count = {pass:0, fail:0, skip:0};
      for(var suite in status){
          var suite_list = [];
          //variable to count total pass, fail, skip for each test suite
          var pack_result_count = {pass:0, fail:0, skip:0, total:0};
          for(var pack in status[suite]){
              var pack_list = [];
              var count_td = 0;
              for(var result in status[suite][pack]){
                  var current_result = status[suite][pack][result];
                  //add td with result of pass, fail, skip
                  pack_list.push(<td key={result} className={result}>{current_result}</td>);
                  //count number of test cases for current package
                  count_td = count_td + current_result;
                  //count pass, fail, skip seperately
                  switch (result) {
                      case "Pass":pack_result_count.pass += current_result;break;
                      case "Fail":pack_result_count.fail += current_result;break;
                      case "Skip":pack_result_count.skip += current_result;break;
                      default: break;

                  }

              }
              //pack_list[Fail, Pass, Skip] -> Array[Pass, Fail, Skip]
              var temp = pack_list.pop();
              pack_list.reverse();
              pack_list.push(temp);
              //insert td of title as well as count
              pack_list.unshift(<td key="pack_name" name={pack}> ->{pack}</td>);
              pack_list.push(<td key="package_total">{count_td}</td>);

              suite_list.push(<tr key={pack} className={pack}>{pack_list}</tr>);

          }
          var suite_total = pack_result_count.pass + pack_result_count.fail + pack_result_count.skip;

          indents.push(<tr key={suite} className={suite}>
                          <td>{suite}</td>
                          <td>{pack_result_count.pass}</td>
                          <td>{pack_result_count.fail}</td>
                          <td>{pack_result_count.skip}</td>
                          <td>{suite_total}</td>
                      </tr>);
          indents.push(suite_list);

          overall_result_count.pass += pack_result_count.pass;
          overall_result_count.fail += pack_result_count.fail;
          overall_result_count.skip += pack_result_count.skip;
      }
      //Summary row at the bottom of the table
      overall_result_count.total = overall_result_count.pass + overall_result_count.fail + overall_result_count.skip;
      indents.push(<tr key="Summary" className="Summary">
                      <td>Summary</td>
                      <td>{overall_result_count.pass}</td>
                      <td>{overall_result_count.fail}</td>
                      <td>{overall_result_count.skip}</td>
                      <td>{overall_result_count.total}</td>
                  </tr>);

      return(
          <div>
              <table className="center">
                  <tbody>
                      <tr className="head_row">
                          <th></th>
                          <th>Pass</th>
                          <th>Fail</th>
                          <th>Skip</th>
                          <th>Total</th>
                      </tr>
                      {indents}
                  </tbody>
              </table>

          </div>
      );
    }
}

module.exports = Summary;
