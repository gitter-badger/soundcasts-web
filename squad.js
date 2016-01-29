// var spawn = require('child_process').spawn;

// var ls = spawn('git', ['status', '--porcelain']);

// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// ls.stderr.on('data', (data) => {
//   console.log(`stderr: ${data}`);
// });

// ls.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });

const exec = require('child_process').exec;

const child = exec('git status --porcelain',
  (error, stdout, stderr) => {



    console.log(stdout.length);
    console.log(`stderr: ${stderr}`);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
});
