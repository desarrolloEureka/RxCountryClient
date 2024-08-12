const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs-extra');
const { storage } = require('./lib/firebase');

// Carpeta a monitorear
const rootFolder = 'C:/Media';
const uploadedFolder = path.join(rootFolder, 'Eureka');

// Inicializa el watcher
const watcher = chokidar.watch(rootFolder, {
    persistent: true,
    ignoreInitial: true,
    depth: 4,
});

// Evento cuando un archivo es agregado
watcher.on('add', async (filePath) => {
    console.log(`File added: ${filePath}`);
    await uploadFile(filePath);
    await moveFileToUploadedFolder(filePath);
});

// Función para subir archivos a Firebase Storage
const uploadFile = async (filePath) => {
    const relativePath = path.relative(rootFolder, filePath);
    const storagePath = relativePath.replace(/\\/g, '/'); // Reemplazar las barras invertidas por barras normales para Firebase
    const storageRef = storage.ref(storagePath);

    try {
        await storageRef.put(filePath);
        console.log(`File uploaded: ${storagePath}`);
    } catch (error) {
        console.error(`Error uploading file: ${error.message}`);
    }
};

// Función para mover archivos a la carpeta de "elementos ya subidos: Eureka"
const moveFileToUploadedFolder = async (filePath) => {
    const relativePath = path.relative(rootFolder, filePath);
    const destinationPath = path.join(uploadedFolder, relativePath);

    try {
        await fs.ensureDir(path.dirname(destinationPath));
        await fs.move(filePath, destinationPath, { overwrite: true });
        console.log(`File moved to: ${destinationPath}`);
    } catch (error) {
        console.error(`Error moving file: ${error.message}`);
    }
};

console.log(`Watching folder: ${rootFolder}`);
