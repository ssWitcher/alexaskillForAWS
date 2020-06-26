const AWS = require('aws-sdk');
const codebuild = new AWS.CodeBuild({apiVersion: '2016-10-06', region: 'ap-south-1'});

const invokeCodeBuild = async () => {
    console.log("Inside invoke CodeBuld Function");
    codebuild.startBuild({projectName:'apollo-dev'}, function(err, data) {
        if (err) {
            console.log("There was error");
            console.log(err, err.stack);
        } else     {
            console.log("Success");
            console.log(data); 
        }
      })
}


module.exports = invokeCodeBuild;