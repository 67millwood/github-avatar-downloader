// request and fs are dependencies; mysecrets allows for GitHub authorization but remain secure
var request = require('request');
var mysecrets = require('./secrets.js')
var fs = require('fs');

// argv allows for two pieces of user input:  name and repo name
var myArg = process.argv.slice(2);

// kick user out if 2 arguments are not provided
if(myArg.length !== 2) {
  return process.exit();
}

// pulls in two arguments to add to a URL which provides a specifc users repo
// arg0 is the user name; agr1 is the repo name
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url : "https://api.github.com/repos/" + myArg[0] + "/" + myArg[1] + "/contributors",
    headers: {
      'User-Agent': '67millwood',
      'Authorization': "token " + mysecrets.GITHUB_TOKEN
    }
  };
// request function gets the body content from GitHub and uses JSON.parse to make it maleable
//  two arrays are createed to store urls and filenames to be used by the downloadImageByUrl function
  request(options, function(err, res, body) {
    var jsbody = JSON.parse(body);
    var emptyArr = [];
    var fileNames = [];
    for (i = 0; i < jsbody.length; i++) {
      emptyArr.push(jsbody[i].avatar_url);
      fileNames.push(jsbody[i].login + '.jpg')
    }
    downloadImageByUrl(emptyArr, fileNames)
    cb(err, emptyArr)
  });
}

// takes two arrays to scroll through to identify proper URL paths to the images of the users
// filePath then stores the images with a unique filename
// this final version only stores the 'argv' version in the pictures/last dir
function downloadImageByUrl(url, filePath) {

    for (a = 0; a < url.length; a++) {
    request.get(url[a])
       .on('error', function (err) {
         console.log("this is not working");
         throw err;
       })
       .pipe(fs.createWriteStream('./pictures/last/' + filePath[a]));
    }
}

getRepoContributors("jquery", "jquery", function(err, result) {
  // previously used printing from exercises
  // console.log("Errors:", err);
  // console.log("Result:", result);
});

