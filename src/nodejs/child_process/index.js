const cp = require('child_process');

// exec
cp.exec('echo hello world', (error, stdout) => {
  console.log('[exec] ' + stdout);
});

// execFile
cp.execFile('echo', ['hi', 'world'], (error, stdout) => {
  console.log('[execFile] ' + stdout);
});

// spawn
cp.spawn('npm', ['--help'], { stdio: 'inherit' });

// spawn
const echo = cp.spawn('echo', ['hello world']);
const wc = cp.spawn('wc', ['-w']);
echo.stdout.pipe(wc.stdin);
wc.stdout.pipe(process.stdout);
