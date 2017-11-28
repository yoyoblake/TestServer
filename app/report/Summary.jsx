

var React = require('react');
require('babel-register');
var Td_Link = require('./components/Td_Link.jsx');


class Summary extends React.Component{
    render(){
        /** Style Block **/
                var th_pass_style = {color: '#80f720'};
                var th_fail_style = {color: 'red'};
                var th_skip_style = {color: 'yellow'};
                var tr_head_style = {backgroundColor: '#9cadba'}
                var td_suite_style = {backgroundColor: '#c0d6db', fontWeight: 'bold'};
                var td_pack_style = {backgroundColor: '#edf5f7'};
        /** Style Block end **/

      var page_info = {timeStamp: this.props.timeStamp, HOST_URL: this.props.HOST_URL};
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
                  pack_list.push(<Td_Link key={result}
                      class_attr={suite + ' ' + pack + ' ' + result}
                      page_info={page_info} content={current_result} />);
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
              pack_list.unshift(<td style={td_pack_style} key="pack_name" name={pack}> ---{pack}</td>);
              pack_list.push(<Td_Link key="total" class_attr={suite + ' ' + pack + ' Total'}
                  page_info={page_info} content={count_td}/>);
              suite_list.push(<tr key={pack} className={pack}>{pack_list}</tr>);

          }
          var suite_total = pack_result_count.pass + pack_result_count.fail + pack_result_count.skip;

          indents.push(<tr key={suite} className={suite}>
                          <td style={td_suite_style}>{suite}</td>
                          <Td_Link key={suite+' Pass'} class_attr={suite+' Pass'} page_info={page_info} content={pack_result_count.pass} />
                          <Td_Link key={suite+' Fail'} class_attr={suite+' Fail'} page_info={page_info} content={pack_result_count.fail} />
                          <Td_Link key={suite+' Skip'} class_attr={suite+' Skip'} page_info={page_info} content={pack_result_count.skip} />
                          <Td_Link key={suite+' Total'} class_attr={suite+' Total'} page_info={page_info} content={suite_total} />
                      </tr>);
          indents.push(suite_list);
          overall_result_count.pass += pack_result_count.pass;
          overall_result_count.fail += pack_result_count.fail;
          overall_result_count.skip += pack_result_count.skip;
      }
      //Summary row at the bottom of the table
      overall_result_count.total = overall_result_count.pass + overall_result_count.fail + overall_result_count.skip;
      indents.push(<tr key="Summary" className="Summary">
                      <td style={td_suite_style}>Summary</td>
                      <Td_Link key='Pass' class_attr='Pass' page_info={page_info} content={overall_result_count.pass} />
                      <Td_Link key='Fail' class_attr='Fail' page_info={page_info} content={overall_result_count.fail} />
                      <Td_Link key='Skip' class_attr='Skip' page_info={page_info} content={overall_result_count.skip} />
                      <Td_Link key='Total' class_attr='Total' page_info={page_info} content={overall_result_count.total} />
                  </tr>);

      return(
              <table width='90%' className="center" id="summaryTable">
                  <tbody>
                      <tr style={tr_head_style} className="head_row">
                          <th id="th_head"></th>
                          <th style={th_pass_style} id="th_pass">Pass</th>
                          <th style={th_fail_style} id="th_fail">Fail</th>
                          <th style={th_skip_style} id="th_skip">Skip</th>
                          <th id="th_total">Total</th>
                      </tr>
                      {indents}
                  </tbody>
              </table>
      );
    }
}

module.exports = Summary;
