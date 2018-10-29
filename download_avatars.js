var request = require('request');
var mysecrets = require('./secrets.js')
var fs = require('fs');


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': '67millwood',
      'Authorization': "token " + mysecrets.GITHUB_TOKEN
    }
  };

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

function downloadImageByUrl(url, filePath) {

    for (a = 0; a < url.length; a++) {
    request.get(url[a])
       .on('error', function (err) {
         console.log("this is not working");
         throw err;
       })
       .pipe(fs.createWriteStream('./pictures/' + filePath[a]));
    }
  }

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

// downloadImageByUrl();
// getRepoContributors();