import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import * as iconv from 'iconv-lite';
import type { VFile } from 'vfile';

import {
	app,
	BrowserWindow,
	dialog,
	ipcMain,
	type IpcMainInvokeEvent,
	Menu,
	type MenuItemConstructorOptions,
} from 'electron';
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
	requestCloseWindow,
	save,
	saveAs,
	selectFont,
	selectTheme,
	setFont,
	setTheme,
} from './commands.js';
import { loadSettings, saveSettings, settings } from './models/settings.js';
import { getCurrentFile } from './models/current-file.js';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (squirrelStartup) {
	app.quit();
}

function createWindow(): void {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		show: false,
		width: settings.window.size.width,
		height: settings.window.size.height,
		icon: path.join(__dirname, settings.r2d2 ? 'r2d2.png' : 'favicon.png'),
		webPreferences: {
			devTools: settings.dev,
			preload: path.join(__dirname, 'preload.js'),
			contextIsolation: true,
			nodeIntegration: false,
		},
	});

	mainWindow.on('maximize', () => (settings.window.maximize = true));
	mainWindow.on('unmaximize', () => (settings.window.maximize = false));
	mainWindow.on('resized', () => {
		const [width, height] = mainWindow.getSize();
		if (width !== undefined && height !== undefined) {
			settings.window.size = { width, height };
		}
	});
	mainWindow.on('ready-to-show', async () => {
		await setTheme(mainWindow, settings.theme);
		await setFont(mainWindow, settings.font);
		mainWindow.show();
	});
	mainWindow.on('close', async (event) => {
		event.preventDefault();
		if (await requestCloseWindow(mainWindow)) mainWindow.destroy();
	});

	if (settings.window.maximize) mainWindow.maximize();

	// and load the index.html of the app.
	mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

function createMenu(): void {
	const recents: MenuItemConstructorOptions[] = [];
	for (const item of recents) {
		item.click = openRecent;
	}

	const themes = [
		{ id: 'theme-default-light', label: 'Light' },
		{ id: 'theme-default-dark', label: 'Dark' },
		{ id: 'theme-google-docs-light', label: 'Google Docs Light' },
		// { id: 'theme-google-docs-dark', label: 'Google Docs Dark' },
		// { id: 'theme-ms-word-light', label: 'Microsoft Word Light' },
		// { id: 'theme-ms-word-dark', label: 'Microsoft Word Dark' },
		{ id: 'theme-github-light', label: 'GitHub Light' },
		{ id: 'theme-github-dark', label: 'GitHub Dark' },
		{ id: 'theme-jetbrains-light', label: 'JetBrains Light' },
		{ id: 'theme-jetbrains-dark', label: 'JetBrains Dark' },
	];
	const themeSubmenu: MenuItemConstructorOptions[] = themes.map((theme) => ({
		id: theme.id,
		label: theme.label,
		type: 'radio',
		checked: settings.theme === theme.id,
		click: selectTheme,
	}));

	const fonts = [
		{
			id: 'sans-serif',
			label: 'Arial (sans-serif)',
		},
		{
			id: 'serif',
			label: 'Times New Roman (serif)',
		},
		{
			id: 'monospace',
			label: 'Courier New (monospace)',
		},
	];
	const fontSubmenu: MenuItemConstructorOptions[] = fonts.map((font) => ({
		id: font.id,
		label: font.label,
		type: 'radio',
		checked: settings.font === font.id,
		click: selectFont,
	}));

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
			submenu: [
				{ role: 'togglefullscreen' },
				{ role: 'toggleDevTools', visible: settings.dev },
				{ type: 'separator' },
				{ label: 'Theme', submenu: themeSubmenu },
				{ label: 'Font', submenu: fontSubmenu },
			],
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
app.whenReady().then(async (): Promise<void> => {
	loadSettings();

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
	saveSettings();
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.handle('save-file', saveFile);
ipcMain.handle('save-as-file', saveAsFile);
ipcMain.handle('confirm', confirmUnsavedChanges);

ipcMain.handle('choose-link', chooseLink);
ipcMain.handle('choose-img', chooseImg);

async function saveFile(event: IpcMainInvokeEvent, markdown: VFile): Promise<boolean> {
	const targetWindow = BrowserWindow.fromWebContents(event.sender);
	if (!targetWindow) return false;

	let currentFile = getCurrentFile(targetWindow.id);
	if (!currentFile) return await saveAsFile(event, markdown);

	fs.writeFileSync(
		currentFile.filePath,
		iconv.encode(markdown.value as string, currentFile.encoding),
	);
	return true;
}

async function saveAsFile(event: IpcMainInvokeEvent, markdown: VFile): Promise<boolean> {
	const targetWindow = BrowserWindow.fromWebContents(event.sender);
	if (!targetWindow) return false;

	const result = dialog.showSaveDialogSync(targetWindow, {
		properties: ['showOverwriteConfirmation'],
		filters: [
			{ name: 'Markdown Files', extensions: ['md'] },
			{ name: 'All Files', extensions: ['*'] },
		],
	});
	if (!result) return false;

	fs.writeFileSync(result, iconv.encode(markdown.value as string, 'utf8'));
	return true;
}

async function confirmUnsavedChanges(event: IpcMainInvokeEvent, markdown: VFile): Promise<boolean> {
	const targetWindow = BrowserWindow.fromWebContents(event.sender);
	if (!targetWindow) return false;

	const result = dialog.showMessageBoxSync(targetWindow, {
		type: 'warning',
		title: 'Unsaved Changes',
		message: 'Close without saving?',
		detail: 'The file has unsaved changes. Are you sure you want to close?',
		buttons: ['Save and Close', 'Discard and Close', 'Cancel'],
		defaultId: 0,
		cancelId: 2,
		noLink: true,
	});

	if (result === 0) {
		return await saveFile(event, markdown);
	} else {
		return result === 1;
	}
}

async function chooseLink(event: IpcMainInvokeEvent): Promise<string | undefined> {
	const targetWindow = BrowserWindow.fromWebContents(event.sender);
	if (!targetWindow) return '';

	const dialogWindow = new BrowserWindow({
		parent: targetWindow,
		modal: true,
		show: false,
		width: 520,
		height: 180,
		resizable: false,
		minimizable: false,
		maximizable: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	const submitChannel = `choose-link-submit-${dialogWindow.id}-${Date.now()}`;
	const cancelChannel = `choose-link-cancel-${dialogWindow.id}-${Date.now()}`;

	// TODO: extract
	const html = `<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<title>Insert Link</title>
	<style>
		:root { color-scheme: light dark; }
		body { margin: 0; padding: 16px; font-family: Arial, sans-serif; }
		h3 { margin: 0 0 10px; font-size: 16px; }
		input { width: 100%; box-sizing: border-box; padding: 8px; margin-bottom: 12px; }
		.actions { display: flex; justify-content: flex-end; gap: 8px; }
		button { padding: 6px 12px; }
	</style>
</head>
<body>
<h3>Insert link</h3>
<input id="link" type="url" placeholder="https://example.com" autofocus />
<div class="actions">
	<button id="cancel">Cancel</button>
	<button id="submit">Insert</button>
</div>
<script>
	const { ipcRenderer } = require('electron');
	const input = document.getElementById('link');
	const submit = () => ipcRenderer.send('${submitChannel}', (input.value || '').trim());
	document.getElementById('submit').addEventListener('click', submit);
	document.getElementById('cancel').addEventListener('click', () => ipcRenderer.send('${cancelChannel}'));
	input.addEventListener('keydown', (ev) => {
		if (ev.key === 'Enter') submit();
		if (ev.key === 'Escape') ipcRenderer.send('${cancelChannel}');
	});
</script>
</body>
</html>`;

	dialogWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);

	return await new Promise<string | undefined>((resolve) => {
		const cleanup = (): void => {
			ipcMain.removeAllListeners(submitChannel);
			ipcMain.removeAllListeners(cancelChannel);
		};

		ipcMain.once(submitChannel, (_evt, link: string) => {
			cleanup();
			if (!dialogWindow.isDestroyed()) dialogWindow.close();
			resolve(link);
		});

		ipcMain.once(cancelChannel, () => {
			cleanup();
			if (!dialogWindow.isDestroyed()) dialogWindow.close();
			resolve(undefined);
		});

		dialogWindow.once('ready-to-show', () => dialogWindow.show());
		dialogWindow.once('closed', () => {
			cleanup();
			resolve(undefined);
		});
	});
}

async function chooseImg(event: IpcMainInvokeEvent): Promise<string | undefined> {
	const targetWindow = BrowserWindow.fromWebContents(event.sender);
	if (!targetWindow) return '';

	const dialogWindow = new BrowserWindow({
		parent: targetWindow,
		modal: true,
		show: false,
		width: 560,
		height: 220,
		resizable: false,
		minimizable: false,
		maximizable: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	const submitChannel = `choose-img-submit-${dialogWindow.id}-${Date.now()}`;
	const cancelChannel = `choose-img-cancel-${dialogWindow.id}-${Date.now()}`;
	const browseChannel = `choose-img-browse-${dialogWindow.id}-${Date.now()}`;

	// TODO: extract
	const html = `<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<title>Insert Image</title>
	<style>
		:root { color-scheme: light dark; }
		body { margin: 0; padding: 16px; font-family: Arial, sans-serif; }
		h3 { margin: 0 0 10px; font-size: 16px; }
		.row { display: flex; gap: 8px; margin-bottom: 12px; }
		input { flex: 1; box-sizing: border-box; padding: 8px; }
		.actions { display: flex; justify-content: flex-end; gap: 8px; }
		button { padding: 6px 12px; }
	</style>
</head>
<body>
<h3>Insert image</h3>
<div class="row">
	<input id="img" type="text" placeholder="https://example.com/image.png or local path" autofocus />
	<button id="browse">Upload...</button>
</div>
<div class="actions">
	<button id="cancel">Cancel</button>
	<button id="submit">Insert</button>
</div>
<script>
	const { ipcRenderer } = require('electron');
	const input = document.getElementById('img');
	const submit = () => ipcRenderer.send('${submitChannel}', (input.value || '').trim());
	document.getElementById('submit').addEventListener('click', submit);
	document.getElementById('cancel').addEventListener('click', () => ipcRenderer.send('${cancelChannel}'));
	document.getElementById('browse').addEventListener('click', async () => {
		const selected = await ipcRenderer.invoke('${browseChannel}');
		if (selected) input.value = selected;
	});
	input.addEventListener('keydown', (ev) => {
		if (ev.key === 'Enter') submit();
		if (ev.key === 'Escape') ipcRenderer.send('${cancelChannel}');
	});
</script>
</body>
</html>`;

	ipcMain.handle(browseChannel, () => {
		const result = dialog.showOpenDialogSync(dialogWindow, {
			properties: ['openFile'],
			filters: [
				{
					name: 'Image Files',
					extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp'],
				},
				{ name: 'All Files', extensions: ['*'] },
			],
		});

		return result && result[0] ? result[0] : '';
	});

	dialogWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);

	return await new Promise<string | undefined>((resolve) => {
		const cleanup = (): void => {
			ipcMain.removeAllListeners(submitChannel);
			ipcMain.removeAllListeners(cancelChannel);
			ipcMain.removeHandler(browseChannel);
		};

		ipcMain.once(submitChannel, (_evt, value: string) => {
			cleanup();
			if (!dialogWindow.isDestroyed()) dialogWindow.close();
			resolve(value);
		});

		ipcMain.once(cancelChannel, () => {
			cleanup();
			if (!dialogWindow.isDestroyed()) dialogWindow.close();
			resolve(undefined);
		});

		dialogWindow.once('ready-to-show', () => dialogWindow.show());
		dialogWindow.once('closed', () => {
			cleanup();
			resolve(undefined);
		});
	});
}
