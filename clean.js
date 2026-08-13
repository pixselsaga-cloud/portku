const { rmSync } = require('fs');
const { execSync } = require('child_process');

console.log('Cleaning node_modules...');
try {
  rmSync('node_modules', { recursive: true, force: true });
} catch (e) {
  console.log('rmSync error:', e.message);
}

console.log('Running clean npm install...');
execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });

console.log('Generating Prisma Client...');
execSync('node node_modules/prisma/build/index.js generate', { stdio: 'inherit' });

console.log('Syncing SQLite Database...');
execSync('node node_modules/prisma/build/index.js db push', { stdio: 'inherit' });

console.log('Seeding Database...');
execSync('node prisma/seed.js', { stdio: 'inherit' });

console.log('SETUP COMPLETED SUCCESSFULLY!');
