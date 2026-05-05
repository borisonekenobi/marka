import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { app, BrowserWindow, Menu, type MenuItemConstructorOptions } from 'electron';
import squirrelStartup from 'electron-squirrel-startup';

import {
	about,
	close,
	newFile,
	newProject,
	open,
	openProjectFolder,
	openRecent,
	rename,
	save,
	saveAs,
} from './commands.js';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (squirrelStartup) {
	app.quit();
}

function createWindow(): void {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		icon: path.join(__dirname, 'favicon.png'),
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			contextIsolation: true,
			nodeIntegration: false,
		},
	});

	// and load the index.html of the app.
	mainWindow.loadFile(path.join(__dirname, 'index.html'));

	// Open the DevTools.
	mainWindow.webContents.openDevTools();
}

function createMenu(): void {
	const recents: MenuItemConstructorOptions[] = [];
	for (const item of recents) {
		item.click = openRecent;
	}

	const template: MenuItemConstructorOptions[] = [
		{
			label: 'File',
			submenu: [
				{ label: 'New File...', accelerator: 'CmdOrCtrl+N', click: newFile },
				{ label: 'New Project...', accelerator: 'CmdOrCtrl+Shift+N', click: newProject },
				{ label: 'Open...', accelerator: 'CmdOrCtrl+O', click: open },
				{ label: 'Open Folder as Project...', click: openProjectFolder },
				{ label: 'Save', accelerator: 'CmdOrCtrl+S', click: save },
				{ label: 'Save As...', accelerator: 'CmdOrCtrl+Alt+S', click: saveAs },
				{ label: 'Rename...', click: rename },
				{ label: 'Close', accelerator: 'CmdOrCtrl+W', click: close },
				{ type: 'separator' },
				{ label: 'Open Recent', submenu: recents },
				{ type: 'separator' },
				{ role: 'quit', accelerator: 'Alt+F4' },
			],
		},
		{
			label: 'Edit',
			submenu: [
				{ role: 'undo' },
				{ role: 'redo' },
				{ type: 'separator' },
				{ role: 'cut' },
				{ role: 'copy' },
				{ role: 'paste' },
				{ role: 'delete' },
				{ role: 'selectAll' },
			],
		},
		{
			label: 'View',
			submenu: [{ role: 'togglefullscreen' }, { role: 'toggleDevTools' }],
		},
		{
			label: 'Window',
			submenu: [{ role: 'minimize' }, { role: 'zoom' }],
		},
		{
			label: 'Help',
			submenu: [{ label: 'About marka', accelerator: 'F1', click: about }],
		},
	];

	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then((): void => {
	createWindow();
	createMenu();

	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	app.on('activate', (): void => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', (): void => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
