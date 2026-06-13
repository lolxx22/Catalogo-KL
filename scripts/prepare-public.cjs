const fs = require('fs');
const path = require('path');

const root = process.cwd();
const source = path.join(root, 'frontend');
const target = path.join(root, 'public');

fs.rmSync(target, { recursive: true, force: true });
fs.mkdirSync(target, { recursive: true });
fs.cpSync(source, target, { recursive: true });
