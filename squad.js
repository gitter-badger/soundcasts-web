const exec = require('child_process').exec;

function ifNotDirty(cb) {
  exec('git status --porcelain', function (error, stdout, stderr) {
    error || stdout.length || stderr.length ?
      console.log('dirty') : cb();
  });
}

ifNotDirty(function() {
  console.log('we are not dirty');
});
