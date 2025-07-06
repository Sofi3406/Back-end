const fs = require('fs/promises');
const path = require('path');

const folderPath = __dirname; // Current directory

async function readFiles() {
  try {
    const files = ['a.txt', 'b.txt', 'c.txt'];
    let totalSize = 0;

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const data = await fs.readFile(filePath, 'utf8');
      console.log(`Content of ${file}:`);
      console.log(data);
      totalSize += Buffer.byteLength(data, 'utf8');
    }

    console.log(`Total size of all files: ${totalSize} bytes`);
  } catch (error) {
    console.error('Error reading files:', error);
  }
}

readFiles();