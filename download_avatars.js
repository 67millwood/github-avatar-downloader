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
    for (i = 0; i < jsbody.length; i++) {
      emptyArr.push(jsbody[i].avatar_url);
    }
    cb(err, emptyArr)
    });
  }

function downloadImageByUrl() {

    request.get('https://avatars2.githubusercontent.com/u/2741?v=3&s=466/avatars/kvirani.jpg')
       .on('error', function (err) {
         console.log("this is not working");
         throw err;
       })
       .pipe(fs.createWriteStream('./thispic.jpg'));

  }

// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });

downloadImageByUrl();
// getRepoContributors();