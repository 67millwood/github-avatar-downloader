var request = require('request');
var mysecrets = require('./secrets.js')


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

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});


// getRepoContributors();