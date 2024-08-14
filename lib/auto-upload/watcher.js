import { watch } from 'chokidar';
import { join, relative, dirname } from 'path';
import { ensureDir, move } from 'fs-extra';
import { storage } from '../../shared/firebase/firebase';
// const Swal = require('sweetalert2');

// Carpeta a monitorear
const rootFolder = 'C:/ImagesToUpload';
const uploadedFolder = join(rootFolder, 'Eureka');

// Inicializa el watcher
const watcher = watch(rootFolder, {
    persistent: true,
    ignoreInitial: true,
    depth: 5,
});

// Evento cuando un archivo es agregado
watcher.on('add', async (filePath) => {
    console.log(`File added: ${filePath}`);
    await uploadFile(filePath);
    await moveFileToUploadedFolder(filePath);
});

// Función para subir archivos a Firebase Storage
const uploadFile = async (filePath) => {
    // console.log("filePath:", filePath);
    const relativePath = relative(rootFolder, filePath);
    // console.log("relativePath:", relativePath);
    // Reemplazar las barras invertidas por barras normales para Firebase
    const storagePath = relativePath.replace(/\\/g, '/');
    // console.log("storagePath:", storagePath);
    const storageRef = storage.ref(storagePath);
    // console.log("storageRef:", storageRef);

    try {
        await storageRef.put(filePath);
        console.log(`File uploaded: ${storagePath}`);
    } catch (error) {
        console.error(`Error uploading file: ${error.message}`);
    }
};

// Función para mover archivos a la carpeta de "elementos ya subidos: Eureka"
const moveFileToUploadedFolder = async (filePath) => {
    const relativePath = relative(rootFolder, filePath);
    const destinationPath = join(uploadedFolder, relativePath);

    try {
        await ensureDir(dirname(destinationPath));
        await move(filePath, destinationPath, { overwrite: true });
        console.log(`File moved to: ${destinationPath}`);
    } catch (error) {
        console.error(`Error moving file: ${error.message}`);
    }
};

// watcher.on('ready', () => {
//     Swal.fire({
//         title: 'Cargue Automático Activado',
//         text: 'El monitoreo de la carpeta ha comenzado.',
//         icon: 'info'
//     });
// });

// watcher.on('error', error => {
//     console.error(`Watcher error: ${error}`);
//     Swal.fire({
//         title: 'Error',
//         text: 'Ha ocurrido un error en el monitoreo de la carpeta.',
//         icon: 'error'
//     });
// });

console.log(`Watching folder: ${rootFolder}`);
