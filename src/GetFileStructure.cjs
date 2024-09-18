const fs = require('fs');
const path = require('path');

// Helper function to generate the directory tree structure
function generateTree(dirPath, indent = '', isLast = true) {
    let treeStructure = '';
    const files = fs.readdirSync(dirPath);
    const fileCount = files.length;

    files.forEach((file, index) => {
        const fullPath = path.join(dirPath, file);
        const isDirectory = fs.lstatSync(fullPath).isDirectory();
        const isLastFile = index === fileCount - 1;

        // Add proper symbols ├── or └── for last item
        const connector = isLastFile ? '└── ' : '├── ';
        treeStructure += `${indent}${connector}${file}\n`;

        // If it's a directory, recurse into it
        if (isDirectory) {
            const newIndent = indent + (isLastFile ? '    ' : '│   ');
            treeStructure += generateTree(fullPath, newIndent, isLastFile);
        }
    });

    return treeStructure;
}

// Main function to write the directory tree to FileStructure.txt
function writeTreeToFile(rootDir) {
    const tree = generateTree(rootDir);
    fs.writeFileSync('FileStructure.txt', tree, 'utf-8');
    console.log('File structure written to FileStructure.txt');
}

// Set the root directory, '.' is the current directory
const rootDirectory = '.'; // Change this to your target directory if needed

// Generate the directory tree and write it to the file
writeTreeToFile(rootDirectory);
