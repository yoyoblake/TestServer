var fs = require('fs');
var path = require('path');
var Promise = require('Promise');
module.exports = {

    fileSearching: function(folder_path, fileType){
            return new Promise(function(resolve, reject){
                var dirData = {}; //JSON object to be sent
                var files = {};
                var lastFile;
                fs.readdir(folder_path, function(err,list){
                    if(err){
                        reject(err);
                    }else{
                        for(var i=0, j = 0; i<list.length; i++){
                            if(path.extname(list[i])===fileType){
                                //Read json file to get test stat
                                var obj = JSON.parse(fs.readFileSync(folder_path + '/' + list[i], 'utf8'));
                                //store the file name into the array files
                                var file_info = {};
                                file_info['build_version'] = obj.build_version;
                                file_info['env'] = obj.env;
                                file_info['testOverallStat'] = obj.testOverallStat;
                                files[list[i]] = file_info;
                                //assign the last file
                                lastFile = list[i];
                                j++;
                            }
                        }
                        //console.log(files);
                        console.log("Last file -> " + lastFile);
                        dirData['lastFile'] = lastFile;
                        dirData['files'] = files;
                        resolve(dirData);
                    }
                });

            });
    }
}
