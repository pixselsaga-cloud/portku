const { spawnSync } = require('child_process');
const fs = require('fs');

console.log('Starting npm install with spawnSync...');

const out = fs.openSync('./install_log.txt', 'a');
const err = fs.openSync('./install_log.txt', 'a');

const proc = spawnSync('npm.cmd', ['install', '--no-audit', '--no-fund', '--force'], {
  shell: true,
  stdio: ['ignore', out, err]
});

console.log('npm install completed with code:', proc.status);

const pGen = spawnSync('npx.cmd', ['prisma', 'generate'], {
  shell: true,
  stdio: ['ignore', out, err]
});
console.log('prisma generate completed with code:', pGen.status);

const pPush = spawnSync('npx.cmd', ['prisma', 'db', 'push'], {
  shell: true,
  stdio: ['ignore', out, err]
});
console.log('prisma db push completed with code:', pPush.status);

const seed = spawnSync('node', ['prisma/seed.js'], {
  shell: true,
  stdio: ['ignore', out, err]
});
console.log('seed completed with code:', seed.status);
