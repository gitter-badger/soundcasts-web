const exec = require('child_process').exec;

// checkIfClean(function() {
//   console.log('we are clean');
// }, function() {
//   console.log('we are dirty');
// });



/**
 * Helpers
 */

function deploy(directory, branch) {

  function pushCmd() {
    return push(directory, branch);
  }

  checkIfClean()
    .then(pushCmd, uncleanError);
}

function push(directory, branch, message) {
  var cmd = [
    'npm run ' + directory,
    'git --work-tree ' + directory + ' checkout --orphan ' + branch,
    'git --work-tree ' + directory + ' add --all',
    'git --work-tree ' + directory + ' commit -m "some commit message"',
    'git push origin ' + branch + ' --force',
    'git checkout -',
    'git branch -D ' + branch
  ].join(' && ');

  return new Promise(function(resolve, reject) {
    exec(cmd, function(error, stdout, stderr) {
      if (error || stderr) {
        console.log('err', stderr, error);
        reject();
      } else {
        console.log('ah', stdout);
        resolve();
      }
    });
  });
}

function checkIfClean() {
  return new Promise(function(resolve, reject) {
    exec('git status --porcelain', function (error, stdout, stderr) {
      var gitClean = !(error || stdout.length || stderr.length);

      gitClean ? resolve('q') : reject('q');
    });
  });
}

function uncleanError() {
  console.error('git unclean');
}

deploy('build', 'squad');
