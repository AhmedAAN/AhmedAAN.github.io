import { readdir } from 'fs/promises';
import { join } from 'path';

const buildPath = join(new URL('.', import.meta.url).pathname, '../build');

try {
  const files = await readdir(buildPath);
  files.forEach((file) => {
    console.log(file);
  });
} catch (err) {
  console.log('Unable to scan directory: ' + err);
}
