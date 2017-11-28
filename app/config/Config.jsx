var React = require('react');
var axios = require('axios');
var HOST_URL = process.env.HOST_URL;

class Config extends React.Component{

    render(){
        function send(){
            var env_droplist = document.getElementById('env');
            var browser_tier = document.getElementById('browser_tier');
            var browser_list = document.getElementById('browser_list');
            var tier_list = document.getElementById('tier_list');
            axios.post('/api/config_save', {
                build_version: document.getElementById('build_version').value ,
                env: env_droplist.options[env_droplist.selectedIndex].text,
                browser_tier: browser_tier.options[browser_tier.selectedIndex].text,
                browser_list: browser_list.options[browser_list.selectedIndex].text,
                tier_list: tier_list.options[tier_list.selectedIndex].text
            }).then(function (response){

            }).catch(function (err){
                console.log("err " + err);
            });

            console.log("Data Sent");
        }

        function send_and_run(){
            send();

            axios.get('/api/shell').then(function (response){

            }).catch(function (err){
                console.log("err " + err) ;
            });
            //* ToDo: disable the Button until the current execution is done
        }

        var browser_list = <select required id='browser_list'>
                                <option value="chrome">chrome</option>
                                <option value="firefox">firefox</option>
                            </select>;

        var tier_list = <select required id='tier_list'>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>;

        return(
            <div className="center">
                <section className="config_section">
                    <h3>Test Suite</h3>
                    <form ref='uploadForm_Adcolony'
                        id='uploadForm_Adcolony'
                        action='/api/uploadSuiteXML?suite=Adcolony'
                        method='post'
                        encType="multipart/form-data">
                            <label>Upload Adcolony.xml</label>
                            <input type="file" name="sampleFile" />
                            <input type='submit' value='Upload' />
                    </form>
                    <p>*Note: Please Click the Upload Button to actualy save the files</p>
                </section>

                <section className="config_section">
                    <h3>Execution Environment</h3>
                    <label>Choose Environment To Execute</label>
                    <select required id='env'>
                        <option value="prod">staging</option>
                        <option value="staging">prod</option>
                    </select>
                </section>

                <section className="config_section">
                    <h3>Build Version</h3>
                    <form>
                        <label htmlFor="build_version">Set Build Version</label>
                        <input type="text" id="build_version" defaultValue='1.00'></input><br />
                    </form>
                </section>

                <section className="config_section">
                    <h3>Running Options</h3>
                    <span>Running on a Browser/a Tier of browsers </span>
                    <select required id='browser_tier'>
                        <option value="browser">browser</option>
                        <option value="tier">tier</option>
                    </select>
                    <span><br /><br />Select Browser </span>
                    {browser_list}
                    <span><br /><br />Select Tier </span>
                    {tier_list}
                </section>

                <section className="run_section">
                    <button type="button" onClick={send}>Save</button>
                    <button type="button" onClick={send_and_run}>Save & Run</button>
                </section>

            </div>
        );
    }
}

module.exports = Config;
