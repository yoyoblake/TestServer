var React = require('react');

class Configure extends React.Component{
    render(){
        return(
            <html>
                <body>
                    <form ref='uploadForm_Adcolony.xml'
                        id='uploadForm_Adcolony'
                        action='/upload_Adcolony.xml'
                        method='post'
                        encType="multipart/form-data">
                            <input type="file" name="sampleFile" />
                            <input type='submit' value='Upload Adcolony.xml' />
                    </form>

                    <select required>
                        <option value="prod">prod</option>
                        <option value="staging">staging</option>
                    </select>

                    <form>
                        <label for="build_version">Build Version</label>
                        <input type="text" id="build_version"></input><br />
                        <button type="button" id="save" >Save</button>
                        <button type="button" id="run" >Save & Run</button>
                    </form>


                </body>
            </html>
        );
    }
}

module.exports = Configure;
