import fs from 'fs';
import path from 'path';

const ROOT_DIR = '.';
const OUTPUT_FILE = 'projectFiles.txt';
const IGNORE_DIRS = ['node_modules', 'dist'];
const IGNORE_FILES = ['package-lock.json'];

function listFilesAndContents(dir: string): string[] {
  const results: string[] = [];

  function readDir(dir: string) {
    fs.readdirSync(dir).forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory() && !IGNORE_DIRS.includes(file)) {
        readDir(filePath);
      } else if (stat.isFile() && !IGNORE_FILES.includes(file)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        results.push(`// ${filePath}\n${fileContent}\n`);
      }
    });
  }

  readDir(dir);
  return results;
}

const output = listFilesAndContents(ROOT_DIR).join('\n');
fs.writeFileSync(OUTPUT_FILE, output);

console.log(`File list and contents written to ${OUTPUT_FILE}`);
