const fs = require('fs');
const path = require('path');

// Output file for the file structure
const outputFilePath = path.join(__dirname, 'filestructure.txt');

// Function to traverse directories and build the file tree structure
function traverseDirectory(dir, depth = 0) {
    let structure = '';

    // Read all files and folders in the current directory
    const items = fs.readdirSync(dir).filter(item => {
        // Ignore .files, .folders, and node_modules folder
        return !item.startsWith('.') && item !== 'node_modules';
    });

    items.forEach((item, index) => {
        const itemPath = path.join(dir, item);
        const isDirectory = fs.statSync(itemPath).isDirectory();

        const prefix = index === items.length - 1 ? '└── ' : '├── ';
        const padding = '│   '.repeat(depth);

        structure += `${padding}${prefix}${item}`;

        if (isDirectory) {
            // If it's a directory, recursively traverse the directory
            structure += '/\n' + traverseDirectory(itemPath, depth + 1);
        } else {
            // If it's a file, add it to the structure with a new line
            structure += `\n`;
        }
    });

    return structure;
}

// Starting directory (modify this to the root of your project)
const startDir = path.join(__dirname);

// Generate file structure
const fileStructure = `project/\n${traverseDirectory(startDir)}`;

// Write the file structure to filestructure.txt
fs.writeFileSync(outputFilePath, fileStructure, 'utf8');

console.log('File structure has been written to filestructure.txt');
